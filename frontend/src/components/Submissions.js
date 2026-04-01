import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Submissions() {
  const { token, user } = useContext(AuthContext);
  const [submissions, setSubmissions] = useState([]);
  const [grade, setGrade] = useState('');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/submissions`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) setSubmissions(data);
      } catch (err) {
        console.error(err);
        alert('Failed to load submissions');
      }
    };
    if (user && user.role === 'admin') {
      fetchSubmissions();
    }
  }, [token, user]);

  const handleGrade = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/submissions/${id}/grade`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ grade })
      });
      const data = await res.json();
      if (res.ok) {
        alert('Submission graded');
        window.location.reload();
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to grade submission');
    }
  };

  if (!user || user.role !== 'admin') {
    return <p>Access denied</p>;
  }

  return (
    <div>
      <h2>Submissions</h2>
      <ul>
        {submissions.map((s) => (
          <li key={s.id}>
            {s.content} - Grade: {s.grade || 'Pending'}
            <input type="text" placeholder="Enter grade"
              value={grade} onChange={(e) => setGrade(e.target.value)} />
            <button onClick={() => handleGrade(s.id)}>Grade</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Submissions;
