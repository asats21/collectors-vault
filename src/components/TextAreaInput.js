// components/TextAreaInput.js
import React, { useState } from 'react';

function TextAreaInput({ onAddSats }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onAddSats(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter sat numbers separated by comma or whitespace"
        rows="5"
        cols="50"
      />
      <br />
      <button type="submit">Add Sats</button>
    </form>
  );
}

export default TextAreaInput;
