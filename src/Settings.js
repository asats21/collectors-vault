import { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { EditorView } from "@codemirror/view";
import { tagWeights } from "./tagWeights";

const Settings = ({ satCollection, setSatCollection }) => {
  const [userBooksJson, setUserBooksJson] = useState("[]");
  const [error, setError] = useState("");

  const availableTraits = Object.keys(tagWeights);

  useEffect(() => {
    const savedUserBooks = localStorage.getItem("userShowcaseBooks");
    if (savedUserBooks) {
      // Format JSON for readability
      try {
        const formattedJson = JSON.stringify(JSON.parse(savedUserBooks), null, 2);
        setUserBooksJson(formattedJson);
      } catch {
        setUserBooksJson("[]");
      }
    }
  }, []);

  const handleSaveBooks = () => {
    try {
      const parsedBooks = JSON.parse(userBooksJson);
  
      if (!Array.isArray(parsedBooks)) {
        throw new Error("JSON must be an array.");
      }
  
      parsedBooks.forEach((book, index) => {
        if (typeof book !== "object" || book === null || Array.isArray(book)) {
          throw new Error(`Book at index ${index} must be an object.`);
        }
  
        // Validate required fields
        const requiredFields = ["key", "name", "description", "traits", "difficulty"];
        requiredFields.forEach((field) => {
          if (!(field in book)) {
            throw new Error(`Book at index ${index} is missing the required field: ${field}`);
          }
        });
  
        // Validate field types
        if (typeof book.key !== "string" || !book.key.trim()) {
          throw new Error(`Book at index ${index}: "key" must be a non-empty string.`);
        }
        if (typeof book.name !== "string" || !book.name.trim()) {
          throw new Error(`Book at index ${index}: "name" must be a non-empty string.`);
        }
        if (typeof book.description !== "string" || !book.description.trim()) {
          throw new Error(`Book at index ${index}: "description" must be a non-empty string.`);
        }
        if (!Array.isArray(book.traits) || !book.traits.every((trait) => typeof trait === "string")) {
          throw new Error(`Book at index ${index}: "traits" must be an array of strings.`);
        }
        if (typeof book.difficulty !== "string" || !book.difficulty.trim()) {
          throw new Error(`Book at index ${index}: "difficulty" must be a non-empty string.`);
        }
      });
  
      // Save formatted JSON
      localStorage.setItem("userShowcaseBooks", JSON.stringify(parsedBooks, null, 2));
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="settings-page mt-2">
      <h1>Settings</h1>
  
      {/* User Books Input */}
      <div className="user-books-form mt-5">
        <h3>Add Your Own Showcase Books (JSON Format)</h3>
        <CodeMirror
          value={userBooksJson}
          height="300px"
          extensions={[json(), EditorView.lineWrapping]}
          onChange={(value) => setUserBooksJson(value)}
          theme="dark"
        />
        {error && <p className="text-danger mt-2">{error}</p>}
        <div className="d-flex mt-3">

          <button className="nav-button save-books me-3" onClick={handleSaveBooks}>
            Save Books
          </button>

          <button
            className="nav-button help-toggle"
            data-bs-toggle="collapse"
            data-bs-target="#json-help"
            aria-expanded="false"
            aria-controls="json-help"
          >
            How do I do it?
          </button>

        </div>

      </div>

            {/* Collapsible Help Section */}
            <div className="help-section mt-4">
        <div className="collapse mt-2" id="json-help">
          <p>Copy and paste this example into the editor to see how it works. Don't forget to click 'Save'! Once saved, this book will appear on the Showcase Books page, merged with the existing books.</p>
          <pre className="json-template">
  {`{
    "key": "hitman_palindrome",
    "name": "Hitman Palindrome",
    "description": "Palindromic sats from the hitman transaction",
    "traits": ["hitman", "palindrome"],
    "difficulty": "Novice"
  }`}
          </pre>
          <button
            className="nav-button copy-template mt-2"
            onClick={() => setUserBooksJson(`[{
  "key": "hitman_palindrome",
  "name": "Hitman Palindrome",
  "description": "Palindromic sats from the hitman transaction",
  "traits": ["hitman", "palindrome"],
  "difficulty": "Novice"
}]`)}
          >
            Fill Form with Example
          </button>

          <div className="available-traits mt-3">
            <h5>Available Traits</h5>
            <p>{availableTraits.join(", ")}</p>
          </div>

        </div>
      </div>
  
      {/* Collection Delete Button */}
      {satCollection && Object.keys(satCollection).length > 0 && (
        <div className="mt-5">
          <h3>Danger Zone</h3>
        
          <div className="mt-4">
            <button className="nav-button delete-all" onClick={() => setSatCollection({})}>
              Delete All Sats
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default Settings;
