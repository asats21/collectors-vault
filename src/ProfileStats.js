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

  const countByTags = (tagsToQuery) => {
    return Object.values(satCollection).filter(({ tags }) =>
      tagsToQuery.every(tag => tags.includes(tag))
    ).length;
  };

  return (
    <div className="">

      <div className="my-5 profile-stats">
        <h3 className="mb-4" style={{ borderBottom: "2px solid #444", paddingBottom: "0.5rem" }}>
          Collection Stats
        </h3>
        
        <div className="row g-3">
          {/* Total */}
          <div className="col-md-6">
            <div className="card stats-card">
              <div className="card-body">
                <StatItem label="Total Sats" value={Object.keys(satCollection).length} />
                <StatItem label="Uncommons" value={tagCounts.uncommon || 0} />
                <StatItem label="Alpha Uncommons" value={countByTags(["alpha", "uncommon"])} />
                <StatItem label="Black Uncommons" value={tagCounts.black_uncommon || 0} />
                <StatItem label="Omega Black Uncommons" value={countByTags(["omega", "black_uncommon"])} />
                <StatItem label="Alphas" value={tagCounts.alpha || 0} />
                <StatItem label="Omegas" value={tagCounts.omega || 0} />
                <StatItem label="Rodarmor Names" value={tagCounts.rodarmor_name || 0} />
                <StatItem label="Primes" value={tagCounts.prime || 0} />
              </div>
            </div>
          </div>

          {/* Palindromes */}
          <div className="col-md-6">
            <div className="card stats-card mt-3 mt-md-0">
              <div className="card-body">
                <StatItem label="Palindromes" value={tagCounts.palindrome || 0} />
                <StatItem label="Uniform Palinceptions" value={tagCounts.uniform_palinception || 0} />
                <StatItem label="Perfect Palinceptions" value={tagCounts.perfect_palinception || 0} />
                <StatItem label="2D Palindromes" value={tagCounts["2_digits"] || 0} />
                <StatItem label="3D Palindromes" value={tagCounts["3_digits"] || 0} />
                <StatItem label="2D Uniform Palinceptions" value={countByTags(["uniform_palinception", "2_digits"])} />
                <StatItem label="3D Uniform Palinceptions" value={countByTags(["uniform_palinception", "3_digits"])} />
                <StatItem label="Paliblock Palindromes" value={countByTags(["palindrome", "paliblock"])} />
                <StatItem label="Nova Palindromes" value={tagCounts.nova || 0} />
              </div>
            </div>
          </div>
        </div>

        <div className="row g-3 mt-2">
          {/* Events */}
          <div className="col-md-6">
            <div className="card stats-card">
              <div className="card-body">
                <StatItem label="Pizza" value={tagCounts.pizza || 0} />
                <StatItem label="Jpeg" value={tagCounts.jpeg || 0} />
                <StatItem label="Hitman" value={tagCounts.hitman || 0} />
                <StatItem label="Silkroad" value={tagCounts.silkroad || 0} />
                <StatItem label="Nakamoto" value={tagCounts.nakamoto || 0} />
                <div style={{color: "#AAA"}} className="mt-2">* palindromes, alphas, omegas, uncommons only</div>
              </div>
            </div>
          </div>

          {/* Historical */}
          <div className="col-md-6">
            <div className="card stats-card">
              <div className="card-body">
                <StatItem label="450x" value={tagCounts["450x"] || 0} />
                <StatItem label="block_9" value={tagCounts.block_9 || 0} />
                <StatItem label="block_78" value={tagCounts.block_78 || 0} />
                <StatItem label="block_286" value={tagCounts.block_286 || 0} />
                <StatItem label="vintage" value={tagCounts.vintage || 0} />
                <div style={{color: "#AAA"}} className="mt-2">* palindromes, alphas, omegas, uncommons only</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileStats;
