import { useState } from "react";

function App() {
  const [count] = useState(0);

  return (
    <>
      <div>
        <h1>Counter: {count}</h1>
      </div>
    </>
  );
}

export default App;
