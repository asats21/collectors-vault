// TestApiPage.js
import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { fetchSats } from './SatingApiCaller';

const TestApiPage = () => {
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState('');

  const handleRequest = async () => {
    setLoading(true);
    try {
      const result = await fetchSats(wallet);
      // Format the result as pretty-printed JSON
      const prettyOutput = JSON.stringify(result, null, 2);
      setOutput(prettyOutput);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Test API Page</h1>
      <div className="card p-4 mb-4">
        <div className="mb-3">
          <label htmlFor="walletInput" className="form-label">Wallet Address</label>
          <input
            id="walletInput"
            type="text"
            className="form-control"
            placeholder="Enter wallet address"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
          />
        </div>
        <button className="nav-button" onClick={handleRequest} disabled={loading}>
          {loading ? 'Requesting...' : 'Request'}
        </button>
      </div>
      <div className="card p-3">
        <CodeMirror
          value={output}
          height="500px"
          extensions={[json()]}
          readOnly={true}
          theme="dark"
        />
      </div>
    </div>
  );
};

export default TestApiPage;
