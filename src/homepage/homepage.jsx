import React, { useState, useEffect } from 'react';

export function Homepage() {
  const [fact, setFact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Using a simple and reliable random fact API
    const url = "https://uselessfacts.jsph.pl/random.json?language=en";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setFact(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching fact:", error);
        setLoading(false);
      });
  }, []);

  return (
    <main style={{ padding: '20px', textAlign: 'center' }}>
      <h1>QWIXX ONLINE</h1>
      <p>This was made as a way to provide a way to play with friends nearby and afar.</p>
      <img src="Qwixx.webp" width="214" height="300" alt="Qwixx game" />
      
      <div style={{
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px',
        maxWidth: '600px',
        margin: '30px auto',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ color: '#007bff', marginBottom: '15px' }}>Random Fun Fact</h3>
        {loading ? (
          <p style={{ fontStyle: 'italic', color: '#666' }}>Loading fact...</p>
        ) : fact ? (
          <>
            <p style={{
              fontSize: '18px',
              fontStyle: 'italic',
              color: '#333',
              marginBottom: '10px',
              lineHeight: '1.6'
            }}>
              {fact.text}
            </p>
          </>
        ) : (
          <p style={{ color: '#dc3545' }}>Failed to load fact. Network issue detected.</p>
        )}
        <p style={{ fontSize: '12px', color: '#999', marginTop: '10px' }}>
          Powered by Useless Facts API
        </p>
      </div>
    </main>
  );
}