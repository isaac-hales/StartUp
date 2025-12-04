import React, { useState, useEffect } from 'react';

export function Leaderboard() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [connectionCount, setConnectionCount] = useState(0);
  const [wsConnected, setWsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    fetchScores();
    
    // Setup WebSocket connection
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      console.log('WebSocket connected');
      setWsConnected(true);
    };

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log('WebSocket message received:', message);

        if (message.type === 'welcome') {
          console.log(message.message);
          setConnectionCount(message.connectionCount || 0);
        } else if (message.type === 'connectionCount') {
          setConnectionCount(message.count);
        } else if (message.type === 'scoreUpdate') {
          // Update leaderboard in real-time
          setScores(message.topScores);
          setLastUpdate(`${message.email} scored ${message.score} points!`);
          setTimeout(() => setLastUpdate(null), 5000); // Clear after 5 seconds
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
      setWsConnected(false);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setWsConnected(false);
    };

    // Cleanup on unmount
    return () => {
      socket.close();
    };
  }, []);

  const fetchScores = async () => {
    try {
      const response = await fetch('/api/scores', {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setScores(data);
      } else {
        setError('Please log in to view the leaderboard');
      }
    } catch (error) {
      console.error('Error fetching scores:', error);
      setError('Failed to load leaderboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h1 style={{textAlign: 'center', color: '#007bff'}}>🏆 Live Leaderboard 🏆</h1>
      
      {/* WebSocket Status */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 15px',
        marginBottom: '20px',
        backgroundColor: wsConnected ? '#d4edda' : '#f8d7da',
        color: wsConnected ? '#155724' : '#721c24',
        borderRadius: '8px',
        fontSize: '14px'
      }}>
        <span>
          {wsConnected ? '🟢 Live Updates Active' : '🔴 Disconnected'}
        </span>
        <span>
          👥 {connectionCount} viewer{connectionCount !== 1 ? 's' : ''} online
        </span>
      </div>

      {/* Live Update Notification */}
      {lastUpdate && (
        <div style={{
          padding: '15px',
          marginBottom: '20px',
          backgroundColor: '#fff3cd',
          color: '#856404',
          borderRadius: '8px',
          textAlign: 'center',
          fontWeight: 'bold',
          animation: 'fadeIn 0.3s ease-in'
        }}>
          🎉 {lastUpdate}
        </div>
      )}
      
      {loading ? (
        <div style={{textAlign: 'center', padding: '40px'}}>
          <p style={{fontSize: '18px', color: '#666'}}>Loading scores...</p>
        </div>
      ) : error ? (
        <div style={{
          padding: '20px',
          backgroundColor: '#f8d7da',
          color: '#721c24',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      ) : scores.length === 0 ? (
        <div style={{
          padding: '40px',
          textAlign: 'center',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <p style={{fontSize: '18px', color: '#666'}}>
            No scores yet! Be the first to play and submit a score!
          </p>
        </div>
      ) : (
        <div style={{
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          padding: '20px'
        }}>
          {scores.map((score, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px',
                marginBottom: '10px',
                backgroundColor: index < 3 ? '#fff3cd' : 'white',
                borderRadius: '8px',
                border: index < 3 ? '2px solid #ffc107' : '1px solid #ddd',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                <span style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : index === 2 ? '#cd7f32' : '#666',
                  minWidth: '40px'
                }}>
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                </span>
                <div>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#333'
                  }}>
                    {score.email}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#666'
                  }}>
                    {new Date(score.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#007bff'
              }}>
                {score.score} pts
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{marginTop: '30px', textAlign: 'center'}}>
        <button
          onClick={fetchScores}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Refresh Leaderboard
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}