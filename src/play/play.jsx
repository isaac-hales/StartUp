import React from 'react';

export function Play() {
  return (
    <main>
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
                    <li>If you can't or don't want to mark anything, take a penalty</li>
                </ul>
                
                <p><strong>Winning:</strong> The game ends when two rows are locked. Count your points - the highest score wins!</p>
            </div>
        </div>
        <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#probabilitiyInfo" aria-expanded="false" aria-controls="probabilitiyInfo">
            Show Probability Information
        </button>

        <div className="collapse mt-3" id="probabilitiyInfo">
            <div className="card card-body" style={{backgroundColor: '#2c2c2c', color: '#ffffff'}}>
                <h5 style={{color: '#4da6ff'}}>Probabilities of Each Number</h5>
                <p> This is the probability of getting the number with either two white dice, or a white die and a colored one.</p>
                <ul>
                    <li><strong>2:</strong> 7.4%</li>
                    <li><strong>3:</strong> 13.9%</li>
                    <li><strong>4:</strong> 13.9%</li>
                    <li><strong>5:</strong> 27.8%</li>
                    <li><strong>6:</strong> 35.2%</li>
                    <li><strong>7:</strong> 41.7%</li>
                    <li><strong>8:</strong> 35.2%</li>
                    <li><strong>9:</strong> 27.8%</li>
                    <li><strong>10:</strong> 21.3%</li>
                    <li><strong>11:</strong> 13.9%</li>
                    <li><strong>12:</strong> 7.4%</li>
                </ul>
                <p> Notice that <strong>7</strong> is the most probable number to roll. </p>
            </div>
        </div>
        <br />
        <img src="Qwixx_Sheet.png" width="640" height="400" alt="Qwixx Score Sheet" />
        <br />
       
    </main>
  );
}