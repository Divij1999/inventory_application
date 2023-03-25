import { useState, useEffect } from "react";

const App = () => {
  const [test, setTest] = useState(0);

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3000/");
      const jsonData = await response.json();
      console.log(typeof jsonData);
      setTest(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {test}
      <button onClick={getData}>Get Data</button>
    </div>
  );
};

export default App;
