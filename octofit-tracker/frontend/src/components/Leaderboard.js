import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Fetching Leaderboard from:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaders(results);
        console.log('Fetched Leaderboard:', results);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, [apiUrl]);

  return (
    <div className="card shadow mb-4">
      <div className="card-header bg-primary text-white">
        <h2 className="h4 mb-0">Leaderboard</h2>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-light">
              <tr>
                {leaders.length > 0 && Object.keys(leaders[0]).map((key) => (
                  <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leaders.map((leader, idx) => (
                <tr key={leader.id || idx}>
                  {leaders.length > 0 && Object.keys(leaders[0]).map((key) => (
                    <td key={key}>{String(leader[key])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {leaders.length === 0 && <div className="text-center text-muted">No leaderboard data found.</div>}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
