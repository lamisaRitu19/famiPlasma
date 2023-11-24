import React from "react";
import tick from "../../assets/icons/tick.svg";
import exclamation from "../../assets/icons/exclamation.svg";

const Member = ({ member, handleShowDetails }) => {
  return (
    <div className="md:flex justify-between items-center md:border-b border-textRed mb-6">
      <div className="mb-3 md:mb-0">
        <h3 className="text-dark text-lg font-semibold leading-7">
          {member?.name}
        </h3>
        <p className="text-neutral leading-7">
          Blood group: <span className="font-medium">{member?.bloodGroup}</span>
        </p>
        <p className="text-neutral leading-7">Contact: {member?.contact}</p>
      </div>
      {member?.eligibility === "Eligible" ? (
        <div className="flex items-center bg-bgGreenEligible text-textGreenEligible font-medium px-3 py-1 rounded-2xl mb-3 md:mb-0">
          <img src={tick} alt="" className="w-6" />
          <span>Eligible</span>
        </div>
      ) : (
        <div className="flex items-center bg-bgYellowEligible text-textYellowEligible font-medium px-3 py-1 rounded-2xl mb-3 md:mb-0">
          <img src={exclamation} alt="" className="w-5 mr-1" />
          <span>Ineligible</span>
        </div>
      )}
      <button
        onClick={() => handleShowDetails()}
        className="btn bg-white text-textRed border border-textRed"
      >
        Details
      </button>
    </div>
  );
};

export default Member;
