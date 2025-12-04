const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const uuid = require('uuid');
const { MongoClient } = require('mongodb');
const { WebSocketServer } = require('ws');
const config = require('./dbConfig.json');

const app = express();
const authCookieName = 'token';

// MongoDB setup
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('qwixx');
const usersCollection = db.collection('users');
const scoresCollection = db.collection('scores');

// Connect to MongoDB
(async function connectDB() {
  try {
    await client.connect();
    await db.command({ ping: 1 });
    console.log('Connected to MongoDB');
  } catch (ex) {
    console.log(`Unable to connect to database: ${ex.message}`);
    process.exit(1);
  }
})();

// The service port must be 4000
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting (from dist folder)
app.use(express.static('dist'));

// Trust proxy for secure cookies (needed for production)
app.set('trust proxy', true);

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth - create a new user
apiRouter.post('/auth/create', async (req, res) => {
  try {
    const existingUser = await usersCollection.findOne({ email: req.body.email });
    
    if (existingUser) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = await createUser(req.body.email, req.body.password);
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
    }
  } catch (error) {
    res.status(500).send({ msg: 'Error creating user', error: error.message });
  }
});

// GetAuth - login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  try {
    const user = await usersCollection.findOne({ email: req.body.email });
    
    if (user && await bcrypt.compare(req.body.password, user.password)) {
      const token = uuid.v4();
      await usersCollection.updateOne(
        { email: user.email },
        { $set: { token: token } }
      );
      setAuthCookie(res, token);
      res.send({ email: user.email });
    } else {
      res.status(401).send({ msg: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).send({ msg: 'Error logging in', error: error.message });
  }
});

// DeleteAuth - logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
  try {
    const token = req.cookies[authCookieName];
    if (token) {
      await usersCollection.updateOne(
        { token: token },
        { $unset: { token: '' } }
      );
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
  } catch (error) {
    res.status(500).send({ msg: 'Error logging out', error: error.message });
  }
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const token = req.cookies[authCookieName];
  const user = await usersCollection.findOne({ token: token });
  
  if (user) {
    req.email = user.email; // Add email to request for later use
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// GetScores - get all scores (requires auth)
apiRouter.get('/scores', verifyAuth, async (_req, res) => {
  try {
    const scores = await scoresCollection
      .find()
      .sort({ score: -1 })
      .limit(10)
      .toArray();
    res.send(scores);
  } catch (error) {
    res.status(500).send({ msg: 'Error fetching scores', error: error.message });
  }
});

// SubmitScore - submit a new score (requires auth)
apiRouter.post('/score', verifyAuth, async (req, res) => {
  try {
    const email = req.email; // From verifyAuth middleware
    const newScore = {
      email: email,
      score: req.body.score,
      date: new Date()
    };

    let improved = false;

    // Check if user already has a score
    const existingScore = await scoresCollection.findOne({ email: email });
    
    if (existingScore) {
      // Only update if new score is higher
      if (newScore.score > existingScore.score) {
        await scoresCollection.updateOne(
          { email: email },
          { $set: { score: newScore.score, date: newScore.date } }
        );
        improved = true;
      }
    } else {
      // Insert new score
      await scoresCollection.insertOne(newScore);
      improved = true;
    }

    // Get updated top 10 scores
    const topScores = await scoresCollection
      .find()
      .sort({ score: -1 })
      .limit(10)
      .toArray();

    // Broadcast score update via WebSocket if score improved
    if (improved && app.broadcast) {
      app.broadcast({
        type: 'scoreUpdate',
        email: email,
        score: newScore.score,
        topScores: topScores
      });
    }

    res.send({ 
      msg: improved ? 'New high score!' : 'Score saved, but not a new high score', 
      score: improved ? newScore.score : existingScore.score, 
      improved: improved 
    });
  } catch (error) {
    res.status(500).send({ msg: 'Error submitting score', error: error.message });
  }
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'dist' });
});

// Helper function to create a user
async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
    createdAt: new Date()
  };
  
  await usersCollection.insertOne(user);
  return user;
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// ===== START SERVER =====

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// ===== WEBSOCKET SERVER =====

// Create WebSocket server
const wss = new WebSocketServer({ noServer: true });

// Handle WebSocket upgrade
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

// Track connected clients
let connections = [];

wss.on('connection', (ws) => {
  const connection = { id: uuid.v4(), alive: true, ws: ws };
  connections.push(connection);

  console.log(`New WebSocket connection: ${connection.id}`);

  // Send welcome message
  ws.send(JSON.stringify({ 
    type: 'welcome', 
    message: 'Connected to Qwixx leaderboard updates',
    connectionCount: connections.length 
  }));

  // Broadcast connection count to all clients
  broadcastConnectionCount();

  // Handle incoming messages
  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data.toString());
      console.log('Received message:', message);
      
      // Echo the message back or handle specific message types
      if (message.type === 'ping') {
        ws.send(JSON.stringify({ type: 'pong' }));
      }
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
    }
  });

  // Handle pong responses for keep-alive
  ws.on('pong', () => {
    connection.alive = true;
  });

  // Handle connection close
  ws.on('close', () => {
    console.log(`WebSocket connection closed: ${connection.id}`);
    connections = connections.filter((c) => c.id !== connection.id);
    broadcastConnectionCount();
  });

  // Handle errors
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

// Keep-alive ping interval (every 30 seconds)
setInterval(() => {
  connections.forEach((connection) => {
    if (!connection.alive) {
      connection.ws.terminate();
      return;
    }
    connection.alive = false;
    connection.ws.ping();
  });
}, 30000);

// Broadcast message to all connected clients
function broadcastMessage(message) {
  connections.forEach((connection) => {
    if (connection.ws.readyState === 1) { // 1 = OPEN
      connection.ws.send(JSON.stringify(message));
    }
  });
}

// Broadcast connection count
function broadcastConnectionCount() {
  broadcastMessage({
    type: 'connectionCount',
    count: connections.length
  });
}

// Export broadcast function for use in API routes
app.broadcast = broadcastMessage;