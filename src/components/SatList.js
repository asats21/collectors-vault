// components/SatList.js
import React from 'react';

function SatList({ collection }) {
  return (
    <div>
      <h2>Sat Collection</h2>
      <ul>
        {Object.entries(collection).map(([sat, details]) => (
          <li key={sat}>
            <strong>{sat}</strong>: {JSON.stringify(details)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SatList;
