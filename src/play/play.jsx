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
  const [showRolls, setShowRolls] = useState(false);

  const handleRollDice = () => {
    const rolls = roll_dice();
    setDiceRolls(rolls);
    setShowRolls(true);
  };

  return (
    <main className="p-4">
        <button type="button" className="btn btn-info" data-bs-toggle="collapse" data-bs-target="#rulesInfo">
            Info 
        </button>
        <div className="collapse mt-3" id="rulesInfo">
            <div className="card card-body" style={{backgroundColor: '#2c2c2c', color: '#ffffff'}}>
                <h5 style={{color: '#4da6ff'}}>How to Play Qwixx</h5>
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
                    <li>If you can't or don't want to mark anything, take a penalty (-5 points)</li>
                </ul>
                
                <p><strong>Winning:</strong> The game ends when two rows are locked, or someone gets 4 strikes. Count your points - the highest score wins!</p>
            </div>
        </div>
        
        <button className="btn btn-primary mt-3" type="button" data-bs-toggle="collapse" data-bs-target="#probabilityInfo" aria-expanded="false" aria-controls="probabilityInfo">
            Show Probability Information
        </button>

        <div className="collapse mt-3" id="probabilityInfo">
            <div className="card card-body" style={{backgroundColor: '#2c2c2c', color: '#ffffff'}}>
                <h5 style={{color: '#4da6ff'}}>Probabilities of Each Number</h5>
                <p> This is the probability of getting the number with either two white dice, or a white die and a colored one.</p>
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
                <p> Notice that <strong>7</strong> is the most probable number to roll. </p>
            </div>
        </div>

        <div className="mt-3">
            <button className="btn btn-success btn-lg" type="button" onClick={handleRollDice}>
                🎲 Roll Dice!
            </button>
        </div>

        {showRolls && diceRolls && (
            <div className="mt-3 p-3 rounded" style={{backgroundColor: '#2c2c2c', color: '#ffffff'}}>
                <h5 style={{color: '#ffffff'}}>All the Dice Rolls!</h5>
                <ul style={{fontSize: '1.2rem', listStyle: 'none', padding: 0}}>
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
                <div className="mt-3 p-2 rounded" style={{backgroundColor: '#1a1a1a'}}>
                    <p style={{color: '#ced4e7bd', margin: 0}}>
                        <strong>White dice sum:</strong> {diceRolls[0] + diceRolls[1]}
                    </p>
                </div>
            </div>
        )}

        <br/>
        <img src="Qwixx_Sheet.png" width="640" height="400" alt="Qwixx Score Sheet" />
        <br />
        

    </main>
  );
}