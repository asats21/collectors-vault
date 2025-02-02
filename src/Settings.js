const Settings = ({ satCollection, setSatCollection }) => {

  const handleDeleteAll = () => {
    if (window.confirm('Are you sure you want to delete all your sats?')) {
      setSatCollection({});
    }
  };

  return (
    <div className="">
      <h1>Settings</h1>
      {/* Delete All Button */}
      {satCollection && Object.keys(satCollection).length > 0 &&
        <div className="text-center mt-4">
          <button
            className="nav-button delete-all"
            onClick={handleDeleteAll}
          >
            Delete All Sats
          </button>
        </div>
      }
    </div>
  );
};

export default Settings;