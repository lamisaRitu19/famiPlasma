import React, { useContext } from "react";
import close from "../../assets/icons/close.svg";
import tick from "../../assets/icons/tick.svg";
import exclamation from "../../assets/icons/exclamation.svg";
import blood from "../../assets/icons/blood.svg";
import { AuthContext } from "../../context/AuthProvider";
import Swal from "sweetalert2";

const MemberDetails = ({ handleShowDetails }) => {
  const { user, userGroupsDetails, viewMemberDetail } = useContext(AuthContext);

  const handleDelete = async (id) => {
    try {
      console.log(id);

      // family group is deleted from familyGroups in user collection
      const updatedData = {
        deleteGroup: id,
      };
      const response = await fetch(
        `https://famiplasma-server-lamisaritu.onrender.com/users/groupDelete/${viewMemberDetail?.uid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );
      const responseResult = await response.json();
      console.log("Successful updated user", responseResult);

      // user uid is deleted from members in families collection
      const updatedData2 = {
        deleteMember: viewMemberDetail?.uid,
      };
      const response2 = await fetch(
        `https://famiplasma-server-lamisaritu.onrender.com/families/memberDelete/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData2),
        }
      );
      const responseResult2 = await response2.json();
      console.log("Successful updated family", responseResult2);
      Swal.fire({
        position: "bottom-end",
        width: 400,
        padding: "1em",
        icon: "success",
        title: "Deleted user",
        showConfirmButton: false,
        timer: 1500,
      });

      // await getUserGroupsDetails(user?.uid);      check
    } catch (error) {
      console.error("From handledelete", error);
    }
  };

  function dateFormat(date) {
    if (date) {
      const dateArray = date?.split("-");
      const year = dateArray[0];
      const day = dateArray[2];
      const monthNo = dateArray[1];
      const allMonths = [
        { number: "01", name: "January" },
        { number: "02", name: "February" },
        { number: "03", name: "March" },
        { number: "04", name: "April" },
        { number: "05", name: "May" },
        { number: "06", name: "June" },
        { number: "07", name: "July" },
        { number: "08", name: "August" },
        { number: "09", name: "September" },
        { number: "10", name: "October" },
        { number: "11", name: "November" },
        { number: "12", name: "December" },
      ];
      const month = allMonths.find((m) => m.number === monthNo);
      const fullDate = month.name + " " + day + ", " + year;
      return fullDate;
    }
  }

  return (
    <div className="text-dark overflow-y-auto mb-6">
      <div className="flex justify-between items-center border-b border-borderDark py-6">
        <span className="font-bold leading-6">Member Details</span>
        <button
          onClick={handleShowDetails}
          className="border border-borderGrey rounded-md p-1"
        >
          <img src={close} alt="" />
        </button>
      </div>
      <h3 className="text-2xl font-bold py-6">{viewMemberDetail?.name}</h3>
      <div className="flex mb-4">
        {viewMemberDetail?.noOfDonation === "" ? (
          <span className="bg-bgLightRed text-textRed font-semibold rounded-lg p-2">
            <img src={blood} alt="" className="inline font-bold mr-1" />0 times
            blood donated
          </span>
        ) : (
          <span className="bg-bgLightRed text-textRed font-semibold rounded-lg p-2">
            <img src={blood} alt="" className="inline font-bold mr-1" />
            {viewMemberDetail?.noOfDonation} times blood donated
          </span>
        )}
        {viewMemberDetail?.eligibility?.auto === "Ineligible" ? (
          <span
            className="tooltip bg-bgYellowEligible text-textYellowEligible font-semibold rounded-lg p-2 mr-6"
            data-tip={viewMemberDetail?.eligibility?.reason}
          >
            <img src={exclamation} alt="" className="inline w-5 mr-1" />
            Ineligible to donate blood
          </span>
        ) : (
          <>
            {viewMemberDetail?.eligibility?.auto === "Eligible" ? (
              <>
                {viewMemberDetail?.eligibility?.userGiven === "Ineligible" ? (
                  <span
                    className="tooltip bg-bgYellowEligible text-textYellowEligible font-semibold rounded-lg p-2 mr-6"
                    data-tip={viewMemberDetail?.eligibility?.reason}
                  >
                    <img src={exclamation} alt="" className="inline w-5 mr-1" />{" "}
                    Ineligible to donate blood
                  </span>
                ) : (
                  <span className="bg-bgGreenEligible text-textGreenEligible font-semibold rounded-lg p-2 mr-6">
                    <img src={tick} alt="" className="inline w-6" /> Eligible to
                    donate blood
                  </span>
                )}
              </>
            ) : (
              <>
                {viewMemberDetail?.eligibility?.userGiven ? (
                  <>
                    {viewMemberDetail?.eligibility?.userGiven ===
                    "Ineligible" ? (
                      <span
                        className="tooltip bg-bgYellowEligible text-textYellowEligible font-semibold rounded-lg p-2 mr-6"
                        data-tip={viewMemberDetail?.eligibility?.reason}
                      >
                        <img
                          src={exclamation}
                          alt=""
                          className="inline w-5 mr-1"
                        />{" "}
                        Ineligible to donate blood
                      </span>
                    ) : (
                      <span className="bg-bgGreenEligible text-textGreenEligible font-semibold rounded-lg p-2 mr-6">
                        <img src={tick} alt="" className="inline w-6" />{" "}
                        Eligible to donate blood
                      </span>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          </>
        )}
      </div>
      <div className="mb-6">
        <div className="bg-bgLight flex justify-between items-center leading-5 border-b border-borderGrey rounded-t-xl px-7 py-2">
          <span className="font-medium">Blood Group: </span>
          <span className="text-lg font-medium">
            {viewMemberDetail?.bloodGroup}
          </span>
        </div>
        <div className="bg-bgLight flex justify-between items-center leading-5 border-b border-borderGrey px-7 py-2">
          <span className="font-medium">Date of Last Donation: </span>
          <span className="text-lg font-medium">
            {dateFormat(viewMemberDetail?.lastDonationDate)}
          </span>
        </div>
        <div className="bg-bgLight flex justify-between items-center leading-5 border-b border-borderGrey px-7 py-2">
          <span className="font-medium">Date of Birth: </span>
          <span className="text-lg font-medium">
            {dateFormat(viewMemberDetail?.dob)}
          </span>
        </div>
        <div className="bg-bgLight flex justify-between items-center leading-5 border-b border-borderGrey px-7 py-2">
          <span className="font-medium">Gender: </span>
          <span className="text-lg font-medium">
            {viewMemberDetail?.gender}
          </span>
        </div>
        <div className="bg-bgLight flex justify-between items-center leading-5 border-b border-borderGrey px-7 py-2">
          <span className="font-medium">Weight: </span>
          <span className="text-lg font-medium">
            {viewMemberDetail?.weight}
          </span>
        </div>
        <div className="bg-bgLight flex justify-between items-center leading-5 border-b border-borderGrey px-7 py-2">
          <span className="font-medium">Email: </span>
          <span className="text-lg font-medium">{viewMemberDetail?.email}</span>
        </div>
        <div className="bg-bgLight flex justify-between items-center leading-5 border-b border-borderGrey px-7 py-2">
          <span className="font-medium">Contact: </span>
          <span className="text-lg font-medium">
            {viewMemberDetail?.contact}
          </span>
        </div>
        <div className="bg-bgLight flex justify-between items-center leading-5 rounded-b-xl px-7 py-2">
          <span className="font-medium">Address: </span>
          <span className="flex flex-col">
            <span className="text-lg font-medium">
              {viewMemberDetail?.address?.details}
            </span>
            <span className="text-lg font-medium">
              {viewMemberDetail?.address?.city}
            </span>
            <span className="text-lg font-medium">
              {viewMemberDetail?.address?.zip}
            </span>
          </span>
        </div>
      </div>
      {viewMemberDetail?.diseases?.length !== 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center border-b border-borderDark pb-3 mb-3">
            <span className="font-bold leading-6">Member Diseases</span>
          </div>
          {viewMemberDetail?.diseases?.map((disease, i) => {
            if (i === 0)
              return (
                <div
                  key={i}
                  className="bg-bgLight grid grid-cols-2 gap-4 items-center leading-5 border-b border-borderGrey rounded-t-xl px-7 py-2"
                >
                  <span className="text-lg font-medium">
                    {disease?.inputValueName}
                  </span>
                  <span className="font-medium">{disease?.inputValueDes}</span>
                </div>
              );
            else if (i === viewMemberDetail.diseases.length - 1)
              return (
                <div
                  key={i}
                  className="bg-bgLight grid grid-cols-2 gap-4 items-center leading-5 rounded-b-xl px-7 py-2"
                >
                  <span className="text-lg font-medium">
                    {disease?.inputValueName}
                  </span>
                  <span className="font-medium">{disease?.inputValueDes}</span>
                </div>
              );
            else
              return (
                <div
                  key={i}
                  className="bg-bgLight grid grid-cols-2 gap-4 items-center leading-5 border-b border-borderGrey px-7 py-2"
                >
                  <span className="text-lg font-medium">
                    {disease?.inputValueName}
                  </span>
                  <span className="font-medium">{disease?.inputValueDes}</span>
                </div>
              );
          })}
        </div>
      )}
      <div className="mb-6">
        <div className="flex justify-between items-center border-b border-borderDark pb-3 mb-3">
          <span className="font-bold leading-6">Member Families</span>
        </div>
        <div className="flex flex-wrap justify-evenly">
          {userGroupsDetails?.map((group) => {
            if (viewMemberDetail?.familyGroups?.includes(group._id))
              return (
                <span
                  key={group?._id}
                  className="bg-bgLight text-center leading-5 border border-borderGrey rounded-xl px-7 py-2 mb-2"
                >
                  <span className="text-lg font-medium">{group.name}</span>
                  <br />
                  {group.adminId === user?.uid && (
                    <button
                      type="button"
                      onClick={() => handleDelete(group._id)}
                      className="text-textRed font-bold p-3"
                    >
                      Delete
                    </button>
                  )}
                </span>
              );
          })}
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;
