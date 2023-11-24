import React, { useContext, useState } from "react";
import MemberDetails from "./MemberDetails";
import { AuthContext } from "../../context/AuthProvider";
import MemberBloodCal from "./MemberBloodCal";
import open from "../../assets/images/share.png";

const Members = () => {
  const {
    user,
    userGroupsDetails,
    userAllGroupsMembers,
    userAllGroupsMembersFiltered,
    setUserAllGroupsMembersFiltered,
    setViewMemberDetail,
    bloodData,
  } = useContext(AuthContext);
  const [showDetails, setShowDetails] = useState(false);

  const handleFilter = async (event) => {
    try {
      event.preventDefault();
      const form = event.target;
      const famName = form.famName.value;
      let bloodGroup = form.bloodGroup.value;
      const eligibility = form.eligibility.value;
      if (bloodGroup.includes("+")) {
        bloodGroup = bloodGroup.slice(0, -1) + "%2B";
      } else if (bloodGroup.includes("-")) {
        bloodGroup = bloodGroup.slice(0, -1) + "%2D";
      }

      const response = await fetch(
        `http://59.152.103.142:8013/users/filterGroupsUsers/${user?.uid}?famName=${famName}&bloodGroup=${bloodGroup}&eligibility=${eligibility}`
      );
      const responseResult = await response.json();
      console.log(
        "Successful fetched filtered users of family groups",
        responseResult
      );
      setUserAllGroupsMembersFiltered(responseResult);
      setShowDetails(false);
    } catch (error) {
      console.error("From handleFilter", error);
    }
  };

  const handleShowDetails = (_uid) => {
    const member = userAllGroupsMembers?.find((u) => u.uid === _uid);
    setShowDetails(true);
    setViewMemberDetail(member);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  return (
    <div
      className={
        showDetails
          ? `bg-bgLight sm:grid grid-cols-2 lg:grid-cols-3 gap-1 md:gap-3`
          : ` bg-bgLight sm:px-6 lg:px-36 pb-6`
      }
    >
      {userAllGroupsMembers.length > 0 ? (
        <>
          <div
            className={
              showDetails ? `hidden sm:block lg:col-span-2 lg:ml-36` : ``
            }
          >
            <div className="flex flex-col-reverse lg:flex-row lg:justify-between lg:items-end">
              <div className="flex justify-center my-4">
                {bloodData.map(
                  (data, i) =>
                    data.value > 0 && (
                      <MemberBloodCal key={i} data={data}></MemberBloodCal>
                    )
                )}
              </div>
              <form
                onSubmit={handleFilter}
                className="lg:flex justify-center lg:justify-end items-end py-4 mx-6 lg:mx-0"
              >
                <div className="mr-3 mb-3 lg:mb-0">
                  <label
                    htmlFor=""
                    className="text-dark text-sm font-semibold mb-2"
                  >
                    Family name
                  </label>
                  <br />
                  <select
                    name="famName"
                    defaultValue="All"
                    className="bg-white text-dark text-sm font-medium w-32 border border-borderGrey rounded-lg px-4 py-2"
                  >
                    <option value="">All</option>
                    {userGroupsDetails.map((group) => (
                      <option key={group?._id} value={group?._id}>
                        {group?.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mr-3 mb-3 lg:mb-0">
                  <label
                    htmlFor=""
                    className="text-dark text-sm font-semibold mb-2"
                  >
                    Blood group
                  </label>
                  <br />
                  <select
                    name="bloodGroup"
                    defaultValue="All"
                    className="bg-white text-dark text-sm font-medium w-32 border border-borderGrey rounded-lg px-4 py-2"
                  >
                    <option value="">All</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div className="mr-6 mb-3 lg:mb-0">
                  <label
                    htmlFor=""
                    className="text-dark text-sm font-semibold mb-2"
                  >
                    Eligibility
                  </label>
                  <br />
                  <select
                    name="eligibility"
                    defaultValue="All"
                    className="bg-white text-dark text-sm font-medium w-32 border border-borderGrey rounded-lg px-4 py-2"
                  >
                    <option value="">All</option>
                    <option value="Eligible">Eligible</option>
                    <option value="Ineligible">Ineligible</option>
                  </select>
                </div>
                <button className="bg-white text-textRed font-medium border border-textRed rounded-lg h-9 px-4">
                  Filter
                </button>
              </form>
            </div>
            <div className="overflow-x-auto bg-white px-6 lg:px-20 py-3 rounded-lg">
              {userAllGroupsMembersFiltered ? (
                userAllGroupsMembersFiltered.length > 0 ? (
                  <table className="table">
                    <thead className="text-lg font-bold">
                      <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Blood Group</th>
                        <th>Eligibility</th>
                        <th>City</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody className="text-base font-medium">
                      {userAllGroupsMembersFiltered.map((member, i) => (
                        <tr key={member.uid}>
                          <th>{i + 1}</th>
                          <td>{member.name}</td>
                          <td>{member.bloodGroup}</td>
                          {member.eligibility.auto === "Ineligible" ? (
                            <td>{member.eligibility.auto}</td>
                          ) : (
                            <>
                              {member.eligibility.auto === "Eligible" ? (
                                <>
                                  {member?.eligibility?.userGiven ===
                                  "Ineligible" ? (
                                    <td>{member.eligibility.userGiven}</td>
                                  ) : (
                                    <td>Eligible</td>
                                  )}
                                </>
                              ) : (
                                <>
                                  {member?.eligibility?.userGiven ? (
                                    <>
                                      {member?.eligibility?.userGiven ===
                                      "Ineligible" ? (
                                        <td>{member.eligibility.userGiven}</td>
                                      ) : (
                                        <td>Eligible</td>
                                      )}
                                    </>
                                  ) : (
                                    <td></td>
                                  )}
                                </>
                              )}
                            </>
                          )}
                          <td>{member.address.city}</td>
                          <td>
                            <button
                              onClick={() => handleShowDetails(member.uid)}
                            >
                              <img src={open} alt="open" className="w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-textLightBlack text-lg text-center font-bold py-6">
                    No members to show
                  </div>
                )
              ) : (
                <table className="table">
                  <thead className="text-lg font-bold">
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Blood Group</th>
                      <th>Eligibility</th>
                      <th>City</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody className="text-base font-medium">
                    {userAllGroupsMembers.map((member, i) => (
                      <tr key={member.uid}>
                        <th>{i + 1}</th>
                        <td>{member.name}</td>
                        <td>{member.bloodGroup}</td>
                        {member.eligibility.auto === "Ineligible" ? (
                          <td>{member.eligibility.auto}</td>
                        ) : (
                          <>
                            {member.eligibility.auto === "Eligible" ? (
                              <>
                                {member?.eligibility?.userGiven ===
                                "Ineligible" ? (
                                  <td>{member.eligibility.userGiven}</td>
                                ) : (
                                  <td>Eligible</td>
                                )}
                              </>
                            ) : (
                              <>
                                {member?.eligibility?.userGiven ? (
                                  <>
                                    {member?.eligibility?.userGiven ===
                                    "Ineligible" ? (
                                      <td>{member.eligibility.userGiven}</td>
                                    ) : (
                                      <td>Eligible</td>
                                    )}
                                  </>
                                ) : (
                                  <td></td>
                                )}
                              </>
                            )}
                          </>
                        )}
                        <td>{member.address.city}</td>
                        <td>
                          <button onClick={() => handleShowDetails(member.uid)}>
                            <img src={open} alt="open" className="w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          <div
            className={showDetails ? `lg:col-span-1 bg-white px-8` : `hidden`}
          >
            <MemberDetails
              handleShowDetails={handleCloseDetails}
            ></MemberDetails>
          </div>
        </>
      ) : (
        <div className="text-textLightBlack text-lg text-center font-bold py-6">
          No members to show
        </div>
      )}
    </div>
  );
};

export default Members;
