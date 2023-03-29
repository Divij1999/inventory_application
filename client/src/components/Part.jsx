import { Link } from "react-router-dom";
const Part = ({ partDetails }) => {
  return (
    <div className="partCard">
      <Link to={`/${partDetails._id}`}>{partDetails.name}</Link>
      <div>{partDetails.price}</div>
    </div>
  );
};

export { Part };
