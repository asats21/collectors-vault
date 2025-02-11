import { tagWeights, bonusTagWeights } from './tagWeights';

const TagWeightsPage = () => {
    return (
        <div className="container">
            {/* Header */}
            <div className="page-header mt-4 mt-md-2">
                <h1>Tag Weights</h1>
            </div>

            {/* Disclaimer */}
            <p>
                Tag weights are experimental and are a proof-of-concept. They are subject to change and should not be considered final.
            </p>

            {/* Table for Tag Weights */}
            <div className="mt-4">
                <table className="table table-dark table-bordered">
                    <thead>
                        <tr>
                            <th>Tag</th>
                            <th>Weight</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(tagWeights).map(([tag, weight]) => (
                            <tr key={tag}>
                                <td>{tag}</td>
                                <td>{weight}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Table for Bonus Tag Weights */}
            <div className="mt-4">
                <h2>Bonus Tag Weights</h2>
                <table className="table table table-dark table-bordered">
                    <thead>
                        <tr>
                            <th>Tag Combination</th>
                            <th>Bonus Weight</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(bonusTagWeights).map(([tagPair, bonus]) => (
                            <tr key={tagPair}>
                                <td>{tagPair.split(',').join(' + ')}</td>
                                <td>{bonus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TagWeightsPage;