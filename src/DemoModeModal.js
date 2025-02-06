import React from 'react';
import { Modal } from 'react-bootstrap';
import { demoSats } from './DemoMode'; // Import demoSats
import { addSatsToCollection } from './satManagement'; // Import function

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
      className="cyber-modal"
      centered
      size="lg"
    >
      <Modal.Header className="modal-header-glow">
        <Modal.Title>Try Demo Mode</Modal.Title>
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
          When you're done, you can easily <strong>delete all demo sats</strong> in the <strong>Settings</strong> section.
        </p>
        <div className="text-center mt-4">
          <button onClick={handleActivateDemo} className="nav-button add-sats">
            Activate Demo Mode
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DemoModeModal;