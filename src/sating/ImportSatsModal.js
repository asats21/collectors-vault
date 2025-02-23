// ImportSatsModal.js
import React, { useState } from 'react';
import { fetchSats } from './SatingApiCaller';
import { addSatsToCollection } from '../satManagement';

const ImportSatsModal = ({ show, setShow, setSatCollection, settings }) => {
  const [wallet, setWallet] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fetchedData = await fetchSats(wallet);
      // Extract only the first number from each sat array
      const satsArray = fetchedData.map(item => item.sat[0]);
      const satsString = satsArray.join(',');
      setSatCollection(prev => addSatsToCollection(satsString, prev, settings));
      setShow(false);
    } catch (error) {
      console.error('Error importing sats:', error);
    }
    setLoading(false);
  };

  if (!show) return null;

  return (
    <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => setShow(false)}>
      <div className="modal-dialog modal-sm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content p-3">
          <div className="modal-header">
            <h5 className="modal-title">Import Sats</h5>
            <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
          </div>
          <div className="modal-body">
            <p>Import sats from sating.io - experimental. By clicking submit you are sending your wallet address to the sating.io API and getting your sats from there.</p>
            <input
              type="text"
              className="form-control"
              placeholder="Enter wallet address"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button className="nav-button" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Importing...' : 'Submit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportSatsModal;
