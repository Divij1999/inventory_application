import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PartDetail = () => {
  const params = useParams();
  const [part, setPart] = useState({});

  const getPartDetail = async () => {
    try {
      const response = await fetch(`http://localhost:3000/parts/${params.id}`);
      const jsonData = await response.json();
      console.log(jsonData);
      setPart(jsonData);
    } catch (err) {}
  };

  useEffect(() => {
    getPartDetail();
  }, []);

  return <div>hello</div>;
};

export { PartDetail };
