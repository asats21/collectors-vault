import { useState, useEffect, useContext } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { EditorView } from "@codemirror/view";
import { getAvailableTags, sortSatsByWeight } from './tagWeights';
import ShowcaseBooksContext from './ShowcaseBooksContext';
import { Link } from "react-router-dom";

const Settings = ({ satCollection, setSatCollection, settings, setSettings, setShowPiece, setSubPieces }) => {
  const [userBooksJson, setUserBooksJson] = useState("[]");
  const [error, setError] = useState("");

  const { addUserBook } = useContext(ShowcaseBooksContext);

  const availableTraits = getAvailableTags();

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

      parsedBooks.forEach((book) => {
        addUserBook(book);
      });

      // Save formatted JSON
      localStorage.setItem("userShowcaseBooks", JSON.stringify(parsedBooks, null, 2));

      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  // Toggle the "Ignore silkroad ranges" setting
  const toggleIgnoreSilkroadRanges = () => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      ignoreSilkroadRanges: !prevSettings.ignoreSilkroadRanges,
    }));
  };

  const convertToBackupCSV = (data) => {
    return Object.keys(data).join('\n');
  };

  const convertToCollectionExportCSV = (satCollection) => {
    // Sort the sats by weight using the sortSatsByWeight function
    const sortedSats = sortSatsByWeight(satCollection);
  
    // Define the headers for the CSV
    const headers = ['sat_number', 'tags', 'block_number', 'year', 'epoch', 'weight_sum'].join(';');
  
    // Map through the sorted data to create the CSV rows
    const rows = sortedSats.map(({ sat, details, weightSum }) => {
      // Extract and format the values
      const row = [
        sat, // SAT number (key in the object)
        details.tags.join(','), // Join tags with a comma
        details.block_number,
        details.year,
        details.epoch,
        weightSum.toFixed(1) // Include the weight sum in the CSV
      ].join(';'); // Join values with a semicolon
  
      return row;
    }).join('\n'); // Join all rows with a newline
  
    // Combine headers and rows into a single CSV string
    return `${headers}\n${rows}`;
  };

  const downloadBackupCSV = () => {
    const csvData = convertToBackupCSV(satCollection);
    
    // Create a Blob from the CSV string
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    
    // Create an invisible link to trigger the download
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'backup.txt');  // Set the default filename
    link.style.visibility = 'hidden';
    
    // Append the link to the body, click it, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadCollectionExportCSV = () => {
    const csvData = convertToCollectionExportCSV(satCollection);
    
    // Create a Blob from the CSV string
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    
    // Create an invisible link to trigger the download
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'collection.csv');  // Set the default filename
    link.style.visibility = 'hidden';
    
    // Append the link to the body, click it, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="">

      {/* Header */}
      <div className="page-header mt-4 mt-md-2">
        <h1>Settings</h1>
      </div>

      {/* Ignore Silkroad Ranges Setting */}
      <div className="mt-5">
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="ignoreSilkroadRanges"
            checked={settings.ignoreSilkroadRanges}
            onChange={toggleIgnoreSilkroadRanges}
          />
          <label className="form-check-label" htmlFor="ignoreSilkroadRanges">
            Ignore Silkroad Ranges (Significantly improves performance on lower-end devices)
          </label>
        </div>
      </div>
  
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
          <p>Copy and paste this example into the editor to see how it works. Don't forget to click 'Save'! Once saved, these 2 books will appear on the Showcase Books page, merged with the existing books. (Don't forget to refresh the page!)</p>
          <pre className="json-template">
{`{
  "key": "silkroad_palindrome",
  "name": "Silkroad Palindrome",
  "description": "Palindromic sats from Bitcoin seized and sold at an auction conducted by the US Marshals",
  "traits": ["silkroad", "palindrome"],
  "difficulty": "Novice"
},
{
  "key": "silkroad_alpha",
  "name": "Silkroad Alpha",
  "description": "Alpha sats from Bitcoin seized and sold at an auction conducted by the US Marshals",
  "traits": ["silkroad", "alpha"],
  "difficulty": "Collector"
}`}
          </pre>
          <button
            className="nav-button copy-template mt-2"
            onClick={() => setUserBooksJson(`[
{
  "key": "silkroad_palindrome",
  "name": "Silkroad Palindrome",
  "description": "Palindromic sats from Bitcoin seized and sold at an auction conducted by the US Marshals",
  "traits": ["silkroad", "palindrome"],
  "difficulty": "Novice"
},
{
  "key": "silkroad_alpha",
  "name": "Silkroad Alpha",
  "description": "Alpha sats from Bitcoin seized and sold at an auction conducted by the US Marshals",
  "traits": ["silkroad", "alpha"],
  "difficulty": "Collector"
}
]`)}
          >
            Fill Form with Example
          </button>

          <div className="available-traits mt-3">
            <h5>Available Traits</h5>
            <p>{availableTraits.join(", ")}</p>
          </div>

        </div>
      </div>

      {/* Collection Backup Button */}
      {satCollection && Object.keys(satCollection).length > 0 && (
        <div className="mt-5">
          <h3>Backup & Share</h3>
          <div className="d-flex mt-4">
              <button className="nav-button backup-all me-3" onClick={downloadBackupCSV}>
                Backup Sats*
              </button>
              <button className="nav-button export-all" onClick={downloadCollectionExportCSV}>
                Export Collection
              </button>
          </div>
          <div className="mt-2 small text-secondary">* backup can also be used to transfer your sats between devices</div>
        </div>
      )}
  
      {/* Collection Delete Button */}
      {satCollection && Object.keys(satCollection).length > 0 && (
        <div className="mt-4">
          <h3>Danger Zone</h3>
          <div className="mt-4">
            <button
              className="nav-button delete-all"
              onClick={() => {
                // Show confirmation dialog
                const isConfirmed = window.confirm("Are you sure you want to delete all sats? This action cannot be undone.");
                // If confirmed, delete all SATs
                if (isConfirmed) {
                  setSatCollection({});
                  setShowPiece({});
                  setSubPieces(Array(8).fill(null));
                }
              }}
            >
              Delete All Sats
            </button>
          </div>
        </div>
      )}

      <div className="mt-4">
          <h3>Info</h3>
          <div className="mt-4">
            <Link to="/tag-weights" style={{ textDecoration: 'none' }}>
              <button className={`nav-button`}>View Tag Weights</button>
            </Link>
          </div>
      </div>

    </div>
  );
  
};

export default Settings;
