import React from "react";
import plus from "../../assets/images/plus.png";

const AddGroup = ({ setShowModal }) => {
  return (
    <div
      onClick={() => setShowModal(true)}
      className="text-center w-96 h-64 border border-borderGrey rounded-xl shadow-2xl cursor-pointer p-10"
    >
      <div className="text-center">
        <img
          src={plus}
          alt="plus"
          className="inline bg-bgLightRed w-28 rounded-full p-10 mx-auto mb-3"
        />
      </div>
      <p className="text-xl font-medium mt-2">Create a new Family group</p>
    </div>
  );
};

export default AddGroup;
