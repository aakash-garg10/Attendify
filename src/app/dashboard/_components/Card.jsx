import React from "react";

const Card = ({ icon, title, value }) => {
  return (
    <>
    <div className="flex items-center gap-5 border p-5 rounded-md m-5">

      <div>{icon}</div>
      <div>
        <h2>{title}</h2>
        <h2>{value}</h2>
      </div>
    </div>
    </>
  );
};

export default Card;
