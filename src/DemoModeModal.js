import React from 'react';
import { Modal } from 'react-bootstrap';
import { demoSats } from './DemoMode'; // Import demoSats
import { addSatsToCollection } from './satManagement'; // Import function
import { FaTimes } from "react-icons/fa";

const DemoModeModal = ({ showModal, setShowModal, setSatCollection, satCollection }) => {
  // Function to activate demo mode
  const handleActivateDemo = () => {
    const updatedCollection = addSatsToCollection(demoSats.join(","), satCollection, {});
    setSatCollection(updatedCollection);
    setShowModal(false);
  };

  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      className="demo-modal"
      centered
      size="lg"
    >
      <Modal.Header className="demo-modal-header-glow">
        <Modal.Title>Try Demo Mode</Modal.Title>
        <button 
          onClick={() => setShowModal(false)} 
          className="close-add-sats-modal-button"
        >
          <FaTimes size={24} />
        </button>
      </Modal.Header>
      <Modal.Body className="modal-body-glow">
        <p>
          Curious to try the app but don’t want the hassle of importing your sats yet? 
          No worries—we’ve got you covered! Try the app in <strong>demo mode</strong> with a hand-picked set of rare sats.
        </p>

        <p>
          Explore the <strong>Showcase Books</strong> section to discover ideas for expanding your collection, 
          or simply enjoy the sats you’ve collected.
        </p>

        <p>
          Looking for a challenge? Test your collection with our <strong>Challenge Books</strong>—can you complete them?
        </p>

        <p>
          Discover unexpected satribute combinations like 'Pizza Rodarmor Name,' 'Palindromic & Paliblock Uncommons' and even blazing '4/20 Pizza Palindromes' (light up your collection with one!). 
        </p>

        <p>
          Our detection system makes it easy to spot prime number sats, track down elusive '3/5 Uniform Palinceptions' and uncover 'Nova Palindromes.' 
          Plus, don’t forget to explore our subpali detection — it reveals hidden patterns within your palinception!
        </p>

        <p>
          When you're done, you can easily <strong>delete all demo sats</strong> in the <strong>Settings</strong> section.
        </p>
        <div className="text-center mt-4">
          <button onClick={handleActivateDemo} className="nav-button try-demo-mode">
            Activate Demo Mode
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DemoModeModal;