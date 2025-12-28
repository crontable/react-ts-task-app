import { useState } from 'react';
import axios from 'axios';

function LogIn() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const fetchUser = async () => {
    setError('');
    setUser(null);
    try {
      const response = await axios.get('/api/user');
      setUser(response.data);
      console.log('MSW Response:', response.data);
    } catch (err) {
      console.error('Error fetching user:', err);
      setError('Failed to fetch user data.');
    }
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="id" />
        <input type="password" placeholder="password" />
        <button type="submit">Log In</button>
      </form>

      <div>
        <button type="button" onClick={fetchUser}>
          Fetch Mock User
        </button>
        {user && (
          <div>
            <h4>Mock Data Received:</h4>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </div>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
}

export default LogIn;
