import { useState, useEffect } from "react";
import { Part } from "./Part";

const Parts = () => {
  const [parts, setParts] = useState([]);

  const getParts = async () => {
    try {
      const response = await fetch("http://localhost:3000/parts/");
      const jsonData = await response.json();
      console.log(jsonData);
      setParts(jsonData);
    } catch (err) {
      if (err) console.log(err);
    }
  };

  useEffect(() => {
    getParts();
  }, []);

  return (
    <div>
      <>
        {parts.map((part) => (
          <Part key={part._id} partDetails={part} />
        ))}
      </>
    </div>
  );
};

export { Parts };
