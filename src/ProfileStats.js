const ProfileStats = ({ satCollection }) => {

  const StatItem = ({ label, value }) => (
    <div className="d-flex justify-content-between align-items-center py-2 stat-item">
      <span>{label}:</span>
      <span className="fw-bold" style={{ color: "#C38BFA" }}>{value}</span>
    </div>
  );

  const tagCounts = Object.values(satCollection).reduce((acc, { tags }) => {
    tags.forEach(tag => acc[tag] = (acc[tag] || 0) + 1);
    return acc;
  }, {});


  return (
    <div className="">

      <div className="my-5 profile-stats">
        <h3 className="mb-4" style={{ color: "#C38BFA", borderBottom: "2px solid #444", paddingBottom: "0.5rem" }}>
          Collection Stats
        </h3>
        
        <div className="row g-3">
          {/* Column 1 */}
          <div className="col-md-6">
            <div className="card stats-card">
              <div className="card-body">
                <StatItem label="Total Sats" value={Object.keys(satCollection).length} />
                <StatItem label="Uncommons" value={tagCounts.uncommon || 0} />
                <StatItem label="Black Uncommons" value={tagCounts.black_uncommon || 0} />
                <StatItem label="Alphas" value={tagCounts.alpha || 0} />
                <StatItem label="Omegas" value={tagCounts.omega || 0} />
                <StatItem label="Rodarmor Names" value={tagCounts.rodarmor_name || 0} />
                <StatItem label="Primes" value={tagCounts.prime || 0} />
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div className="col-md-6">
            <div className="card stats-card mt-3 mt-md-0">
              <div className="card-body">
                <StatItem label="Palindromes" value={tagCounts.palindrome || 0} />
                <StatItem label="Uniform Palinceptions" value={tagCounts.uniform_palinception || 0} />
                <StatItem label="Perfect Palinceptions" value={tagCounts.perfect_palinception || 0} />
                <StatItem label="Nova Palindromes" value={tagCounts.nova || 0} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;
