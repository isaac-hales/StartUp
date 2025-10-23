import React, { useState } from 'react';

//This is the function for 'rolling' a die
function die_roll(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function roll_dice() {
    const white_die_1 = die_roll(1,6);
    const white_die_2 = die_roll(1,6);
    const red_die = die_roll(1,6);
    const yellow_die = die_roll(1,6);
    const green_die = die_roll(1,6);
    const blue_die = die_roll(1,6);
    return [white_die_1, white_die_2, red_die, yellow_die, green_die, blue_die]
}

export function Play() {
  const [diceRolls, setDiceRolls] = useState(null);
  const [showRules, setShowRules] = useState(false);
  const [showProbability, setShowProbability] = useState(false);
  
  // State for each row - stores which buttons are marked
  const [redRow, setRedRow] = useState({});
  const [yellowRow, setYellowRow] = useState({});
  const [greenRow, setGreenRow] = useState({});
  const [blueRow, setBlueRow] = useState({});
  const [penalties, setPenalties] = useState({});

  const handleRollDice = () => {
    const rolls = roll_dice();
    setDiceRolls(rolls);
  };

  const toggleButton = (row, setRow, value) => {
    setRow(prev => ({
      ...prev,
      [value]: !prev[value]
    }));
  };

  const renderNumberRow = (label, color, row, setRow, ascending = true) => {
    const numbers = ascending 
      ? [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'L']
      : [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 'L'];
    
    return (
      <div style={{marginBottom: '10px'}}>
        <strong style={{color: color, marginRight: '10px', fontSize: '18px'}}>{label}:</strong>
        {numbers.map((num, idx) => (
          <button
            key={idx}
            onClick={() => toggleButton(row, setRow, num)}
            style={{
              width: '40px',
              height: '40px',
              margin: '2px',
              backgroundColor: row[num] ? '#555' : color,
              color: row[num] ? '#888' : 'white',
              border: '2px solid #000',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            {row[num] ? 'X' : num}
          </button>
        ))}
      </div>
    );
  };

  return (
    <main style={{padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto'}}>
        <button 
          onClick={() => setShowRules(!showRules)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
            {showRules ? 'Hide' : 'Show'} Info 
        </button>
        
        {showRules && (
          <div style={{
            marginTop: '15px',
            padding: '20px',
            backgroundColor: '#2c2c2c',
            color: '#ffffff',
            borderRadius: '8px'
          }}>
            <h5 style={{color: '#4da6ff', marginTop: 0}}>How to Play Qwixx</h5>
            <p><strong>Objective:</strong> Score the most points by marking off numbers in four colored rows.</p>
            
            <p><strong>Basic Rules:</strong></p>
            <ul>
                <li>On your turn, roll all 6 dice (2 white + 4 colored)</li>
                <li>Everyone can use the sum of the two white dice to mark a number</li>
                <li>The active player can also combine one white die with one colored die</li>
                <li>Numbers must be marked from left to right in each row</li>
                <li>Red and yellow go from 2-12 (left to right)</li>
                <li>Green and blue go from 12-2 (right to left)</li>
                <li>You cannot go backwards - once you skip a number, it's locked out</li>
                <li>If you can't or don't want to mark anything, take a penalty</li>
            </ul>
            
            <p><strong>Winning:</strong> The game ends when two rows are locked, or someone gets 4 strikes. Count your points - the highest score wins!</p>
          </div>
        )}
        
        <button 
          onClick={() => setShowProbability(!showProbability)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            marginTop: '15px'
          }}
        >
            {showProbability ? 'Hide' : 'Show'} Probability Information
        </button>

        {showProbability && (
          <div style={{
            marginTop: '15px',
            padding: '20px',
            backgroundColor: '#2c2c2c',
            color: '#ffffff',
            borderRadius: '8px'
          }}>
            <h5 style={{color: '#4da6ff', marginTop: 0}}>Probabilities of Each Number</h5>
            <p>This is the probability of getting the number with either two white dice, or a white die and a colored one.</p>
            <ul>
                <li><strong>2:</strong> 7.4% </li>
                <li><strong>3:</strong> 13.9% </li>
                <li><strong>4:</strong> 13.9% </li>
                <li><strong>5:</strong> 27.8% </li>
                <li><strong>6:</strong> 35.2% </li>
                <li><strong>7:</strong> 41.7% </li>
                <li><strong>8:</strong> 35.2% </li>
                <li><strong>9:</strong> 27.8% </li>
                <li><strong>10:</strong> 21.3% </li>
                <li><strong>11:</strong> 13.9% </li>
                <li><strong>12:</strong> 7.4% </li>
            </ul>
            <p>Notice that <strong>7</strong> is the most probable number to roll.</p>
          </div>
        )}

        <div style={{marginTop: '20px'}}>
            <button 
              onClick={handleRollDice}
              style={{
                padding: '15px 30px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: 'bold'
              }}
            >
                🎲 Roll Dice!
            </button>
        </div>

        {diceRolls && (
            <div style={{
              marginTop: '20px',
              padding: '20px',
              backgroundColor: '#2c2c2c',
              color: '#ffffff',
              borderRadius: '8px'
            }}>
                <h5 style={{color: '#ffffff', marginTop: 0}}>All the Dice Rolls!</h5>
                <ul style={{fontSize: '18px', listStyle: 'none', padding: 0}}>
                    <li style={{color: '#d3d3d3', fontWeight: 'bold', padding: '8px'}}>
                        ⚪ White die #1: {diceRolls[0]}
                    </li>
                    <li style={{color: '#d3d3d3', fontWeight: 'bold', padding: '8px'}}>
                        ⚪ White die #2: {diceRolls[1]}
                    </li>
                    <li style={{color: '#c72626', fontWeight: 'bold', padding: '8px'}}>
                        🔴 Red die: {diceRolls[2]}
                    </li>
                    <li style={{color: '#ceec22', fontWeight: 'bold', padding: '8px'}}>
                        🟡 Yellow die: {diceRolls[3]}
                    </li>
                    <li style={{color: '#0b9c0b', fontWeight: 'bold', padding: '8px'}}>
                        🟢 Green die: {diceRolls[4]}
                    </li>
                    <li style={{color: '#4da6ff', fontWeight: 'bold', padding: '8px'}}>
                        🔵 Blue die: {diceRolls[5]}
                    </li>
                </ul>
                <div style={{
                  marginTop: '15px',
                  padding: '15px',
                  backgroundColor: '#1a1a1a',
                  borderRadius: '5px'
                }}>
                    <p style={{color: '#4da6ff', margin: 0, fontSize: '18px'}}>
                        <strong>White dice sum:</strong> {diceRolls[0] + diceRolls[1]}
                    </p>
                </div>
            </div>
        )}

        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px'
        }}>
          <h5 style={{marginTop: 0, marginBottom: '20px'}}>Score Sheet</h5>
          
          {renderNumberRow('Red', '#c72626', redRow, setRedRow, true)}
          {renderNumberRow('Yellow', '#d4c620', yellowRow, setYellowRow, true)}
          {renderNumberRow('Green', '#0b9c0b', greenRow, setGreenRow, false)}
          {renderNumberRow('Blue', '#094785', blueRow, setBlueRow, false)}
          
          <div style={{marginTop: '20px'}}>
            <strong style={{marginRight: '10px', fontSize: '18px'}}>Penalties:</strong>
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() => toggleButton(penalties, setPenalties, num)}
                style={{
                  width: '40px',
                  height: '40px',
                  margin: '2px',
                  backgroundColor: penalties[num] ? '#555' : '#888',
                  color: penalties[num] ? '#333' : 'white',
                  border: '2px solid #000',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                {penalties[num] ? 'X' : ''}
              </button>
            ))}
          </div>
        </div>
    </main>
  );
}