import { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { EditorView } from "@codemirror/view";

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
        <CodeMirror
          value={userBooksJson}
          height="300px"
          extensions={[json(), EditorView.lineWrapping]}
          onChange={(value) => setUserBooksJson(value)}
          theme="dark"
        />
        {error && <p className="text-danger mt-2">{error}</p>}
        <button className="nav-button save-books mt-3" onClick={handleSaveBooks}>
          Save Books
        </button>
      </div>
    </div>
  );
};

export default Settings;
