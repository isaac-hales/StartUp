import React, { useState, useEffect } from 'react';

export function Homepage() {
  const [axolotlData, setAxolotlData] = useState(null);

  useEffect(() => {
    const url = "https://theaxolotlapi.netlify.app/";
    fetch(url)
      .then((x) => x.json())
      .then((response) => {
        setAxolotlData(response);
      })
      .catch((error) => {
        console.error("Error fetching axolotl:", error);
      });
  }, []); // Empty array means run once on mount

  return (
    <main>
      <h1>QWIXX ONLINE</h1>
      <p>This was made as a way to provide a way to play with friends nearby and afar.</p>
      <img src="Qwixx.webp" width="214" height="300" alt="Qwixx game" />
      
      {axolotlData && (
        <pre>{JSON.stringify(axolotlData, null, 2)}</pre>
      )}
    </main>
  );
}