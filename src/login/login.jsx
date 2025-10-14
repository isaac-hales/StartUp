import React from 'react';

export function Login() {
  return (
     <main>
            {/*https://theaxolotlapi.netlify.app/ */}
            {/*<!-- This will be an API that will give random pictures of an axolotl. -->*/}
            <img src="dice.png" width="335" height="316" alt="dice" />
            <section>
            <h1> LOGIN PAGE </h1>
                <form action="formSubmit.html" method="post">
                    <ul>
                        <li>
                            <label htmlFor="email">Email: </label>
                            <input type="email" id="email" name="varEmail" placeholder="Your Email Here" required pattern="[Aa].*" style={{color: 'rgb(255,220,0)'}}/>
                        </li>
                        <li>
                            <label htmlFor="player-name">User Name: </label>
                            <input type="text" id="player-name" name="player-name" placeholder="Your Name Here" required pattern="[Aa].*" style={{color: 'rgb(255,0,0)'}} />
                        </li>
                        <li>
                            <label htmlFor="password">Password: </label>
                            <input type="password" id="password" name="varPassword" placeholder="Your Password Here" required pattern="[Aa].*" style={{color: 'rgb(50,240,100)'}} />
                        </li>
                    </ul>
                </form>
            </section>
        </main>
  );
}