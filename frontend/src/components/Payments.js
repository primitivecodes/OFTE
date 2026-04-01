import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Payments() {
  const { user, token } = useContext(AuthContext);
  const [code, setCode] = useState('');

  const handleUnlock = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/payments/unlock`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId: user.id, code })
      });
      const data = await res.json();
      if (res.ok) {
        alert('Unlock successful');
        window.location.href = '/dashboard';
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert('Unlock failed');
    }
  };

  return (
    <div>
      <h2>Unlock Access</h2>
      <form onSubmit={handleUnlock}>
        <input type="text" placeholder="Enter unlock code"
          value={code} onChange={(e) => setCode(e.target.value)} required />
        <button type="submit">Unlock</button>
      </form>
    </div>
  );
}

export default Payments;
