import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Certificates() {
  const { token, user } = useContext(AuthContext);
  const [userId, setUserId] = useState('');
  const [title, setTitle] = useState('');

  const handleIssue = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/certificates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, title })
      });
      const data = await res.json();
      if (res.ok) {
        alert('Certificate issued');
        setUserId('');
        setTitle('');
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to issue certificate');
    }
  };

  if (!user || user.role !== 'admin') {
    return <p>Access denied</p>;
  }

  return (
    <div>
      <h2>Issue Certificate</h2>
      <form onSubmit={handleIssue}>
        <input type="text" placeholder="Learner ID"
          value={userId} onChange={(e) => setUserId(e.target.value)} required />
        <input type="text" placeholder="Certificate Title"
          value={title} onChange={(e) => setTitle(e.target.value)} required />
        <button type="submit">Issue</button>
      </form>
    </div>
  );
}

export default Certificates;
