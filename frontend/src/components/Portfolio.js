import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Portfolio() {
  const { user, token } = useContext(AuthContext);
  const [portfolio, setPortfolio] = useState(null);
  const [learners, setLearners] = useState([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        if (user.role === 'learner') {
          const res = await fetch(`${process.env.REACT_APP_API_URL}/api/portfolio/${user.id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await res.json();
          if (res.ok) setPortfolio(data);
        }
        if (user.role === 'employer') {
          const res = await fetch(`${process.env.REACT_APP_API_URL}/api/portfolio`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await res.json();
          if (res.ok) setLearners(data);
        }
      } catch (err) {
        console.error(err);
        alert('Failed to load portfolio');
      }
    };
    fetchPortfolio();
  }, [user, token]);

  return (
    <div>
      <h2>Portfolio</h2>
      {user.role === 'learner' && portfolio && (
        <div>
          <h3>{portfolio.learner.name}</h3>
          <p>Email: {portfolio.learner.email}</p>
          <h4>Submissions</h4>
          <ul>
            {portfolio.submissions.map((s) => (
              <li key={s.id}>{s.content} - Grade: {s.grade || 'Pending'}</li>
            ))}
          </ul>
          <h4>Certificates</h4>
          <ul>
            {portfolio.certificates.map((c) => (
              <li key={c.id}>{c.title} (Issued {new Date(c.issuedAt).toLocaleDateString()})</li>
            ))}
          </ul>
        </div>
      )}
      {user.role === 'employer' && (
        <div>
          <h3>All Learners</h3>
          <ul>
            {learners.map((l) => (
              <li key={l.id}>{l.name} - {l.email}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Portfolio;
