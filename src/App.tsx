import { AiFillDashboard } from 'react-icons/ai';
import { useState } from 'react';

function App() {
  const [count] = useState(0);

  return (
    <>
      <div>
        <h1>
          <AiFillDashboard /> Dashboard
        </h1>
        <button>
          <AiFillDashboard />
        </button>
      </div>
    </>
  );
}

export default App;
