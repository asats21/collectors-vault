import { useState, useEffect } from "react";

const Settings = ({ satCollection, setSatCollection }) => {
  const [userBooksJson, setUserBooksJson] = useState("[]");
  const [error, setError] = useState("");

  useEffect(() => {
    const savedUserBooks = localStorage.getItem("userShowcaseBooks");
    if (savedUserBooks) {
      setUserBooksJson(savedUserBooks);
    }
  }, []);

  const handleSaveBooks = () => {
    try {
      const parsedBooks = JSON.parse(userBooksJson);

      if (!Array.isArray(parsedBooks)) {
        throw new Error("JSON must be an array of books.");
      }

      localStorage.setItem("userShowcaseBooks", JSON.stringify(parsedBooks));
      setError("");
      alert("Books saved successfully!");
    } catch (err) {
      setError("Invalid JSON format. Please check and try again.");
    }
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>

      {/* SAT Collection Delete Button */}
      {satCollection && Object.keys(satCollection).length > 0 && (
        <div className="text-center mt-4">
          <button className="nav-button delete-all" onClick={() => setSatCollection({})}>
            Delete All Sats
          </button>
        </div>
      )}

      {/* User Books Input */}
      <div className="user-books-form mt-5">
        <h2>Add Your Own Books (JSON Format)</h2>
        <textarea
          className="form-control"
          rows="10"
          value={userBooksJson}
          onChange={(e) => setUserBooksJson(e.target.value)}
          placeholder='[{"key": "unique-key", "name": "Book Name", "description": "Details", "traits": ["trait1"], "difficulty": "Novice"}]'
        ></textarea>
        {error && <p className="text-danger mt-2">{error}</p>}
        <button className="nav-button save-books mt-3" onClick={handleSaveBooks}>
          Save Books
        </button>
      </div>
    </div>
  );
};

export default Settings;
