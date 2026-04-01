import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return <p>Please login first.</p>;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {user.name} ({user.role})</p>
      {user.role === 'learner' && (
        <div>
          <a href="/modules">View Modules</a><br />
          <a href="/payments">Unlock Access</a><br />
          <a href="/portfolio">My Portfolio</a>
        </div>
      )}
      {user.role === 'employer' && (
        <div>
          <a href="/portfolio">Browse Learner Portfolios</a>
        </div>
      )}
      {user.role === 'admin' && (
        <div>
          <a href="/modules">Manage Modules</a><br />
          <a href="/submissions">Grade Submissions</a><br />
          <a href="/certificates">Issue Certificates</a>
        </div>
      )}
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;
