import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Modules() {
  const { token } = useContext(AuthContext);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/modules`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setModules(data);
        } else {
          alert(data.error);
        }
      } catch (err) {
        console.error(err);
        alert('Failed to load modules');
      }
    };
    fetchModules();
  }, [token]);

  return (
    <div>
      <h2>Learning Modules</h2>
      <ul>
        {modules.map((m) => (
          <li key={m.id}>
            <strong>{m.title}</strong> - {m.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Modules;
