import React from "react";
import home from "../../assets/images/home.png";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Group = ({ detail }) => {
  const { user, setUserAllGroupsMembersFiltered } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGroup = async () => {
    const famName = detail._id;
    const bloodGroup = "";
    const eligibility = "";

    const response = await fetch(
      `https://famiplasma-server-lamisaritu.onrender.com/users/filterGroupsUsers/${user?.uid}?famName=${famName}&bloodGroup=${bloodGroup}&eligibility=${eligibility}`
    );
    const responseResult = await response.json();
    console.log(
      "Successful fetched filtered users of family groups",
      responseResult
    );
    setUserAllGroupsMembersFiltered(responseResult);
    navigate("/members");
  };

  return (
    <div
      onClick={handleGroup}
      className="text-left w-96 h-64 border border-borderGrey rounded-xl shadow-2xl cursor-pointer p-8"
    >
      <div className="text-center">
        <img
          src={home}
          alt="home"
          className="inline bg-bgLightRed w-28 rounded-full p-4 mx-auto mb-3"
        />
      </div>
      <p className="text-2xl font-semibold mb-2">{detail?.name}</p>
      <div className="flex justify-between">
        <span>{detail?.members.length} members</span>
        {user?.uid === detail?.adminId && (
          <span className="bg-textGreenEligible text-white font-semibold rounded-lg px-2">
            Admin
          </span>
        )}
      </div>
    </div>
  );
};

export default Group;
