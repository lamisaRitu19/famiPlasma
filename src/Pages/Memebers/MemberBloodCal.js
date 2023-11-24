import React from "react";
import blood from "../../assets/icons/blood.svg";

const MemberBloodCal = ({ data }) => {
  return (
    <div className="flex items-start mr-2">
      <img src={blood} alt="" className="inline" />
      <span className="font-semibold pl-1">{data?.name}: </span>
      <span className="font-bold">{data?.value}</span>
    </div>
  );
};

export default MemberBloodCal;
