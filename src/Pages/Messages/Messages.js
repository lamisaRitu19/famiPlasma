import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Swal from "sweetalert2";

const Messages = () => {
  const { user, userGroupsDetails, userAllGroupsMembers } =
    useContext(AuthContext);
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    fetch(`http://59.152.103.142:8013/messages/${user?.uid}`)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
      });
  }, []);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const form = event.target;
      const family = form.family.value;
      const postedDate = form.postedDate.value;
      const reqBlood = form.reqBlood.value;
      const reqDate = form.reqDate.value;
      const message = form.message.value;
      let familyGroup = "";
      let requiredBlood = "";

      if (family !== "Select family group") familyGroup = family;
      if (reqBlood !== "Select blood group") requiredBlood = reqBlood;

      const data = {
        messageDate: postedDate,
        member: { id: user?.uid, name: user?.name },
        familyGroup,
        requiredBlood,
        requirementDate: reqDate,
        description: message,
      };
      console.log(data);

      if (familyGroup === "") {
        Swal.fire({
          position: "bottom-end",
          width: 400,
          icon: "error",
          title: "Please select family group",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const response = await fetch("http://59.152.103.142:8013/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const responseResult = await response.json();
        console.log("Successful posted message", responseResult);
        Swal.fire({
          position: "bottom-end",
          width: 400,
          icon: "success",
          title: "Message posted successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        await form.reset();
      }
    } catch (error) {
      console.error("Message submit error", error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const deleteData = {
        deleteId: _id,
      };
      const response = await fetch(`http://59.152.103.142:8013/messages`, {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deleteData),
      });
      const responseResult = await response.json();
      if (responseResult.deletedCount > 0) {
        console.log("Successfully deleted message", responseResult);
        Swal.fire({
          position: "bottom-end",
          width: 400,
          icon: "success",
          title: "Message deleted successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Message delete error", error);
    }
  };

  function dateFormat(date) {
    const dateArray = date.split("-");
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

  return (
    <div className="bg-bgLight text-dark py-6">
      <div className="bg-white sm:w-4/5 lg:w-3/5 px-6 lg:px-8 pt-9 pb-6 mx-auto mb-3 rounded-2xl">
        <h3 className="text-4xl font-bold mb-4">Post a Message</h3>
        <form onSubmit={handleSubmit} className="text-center">
          <div className="sm:grid grid-cols-2 gap-3">
            <div className="mb-2 sm:mb-0">
              <label className="label">
                <span className="text-lg font-semibold leading-5">
                  Family Name
                </span>
              </label>
              <select
                className="select bg-bgLight w-full"
                name="family"
                defaultValue="Select family group"
                required
              >
                <option disabled>Select family group</option>
                {userGroupsDetails?.map((group) => (
                  <option key={group?._id} value={group?._id}>
                    {group?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2 sm:mb-0">
              <label className="label">
                <span className="text-lg font-semibold leading-5">
                  Posted Date
                </span>
              </label>
              <input
                type="date"
                name="postedDate"
                defaultValue={new Date().toJSON().slice(0, 10)}
                disabled
                placeholder="Select your date of birth"
                className="input bg-bgLight w-full"
              />
            </div>
            <div className="mb-2 sm:mb-0">
              <label className="label">
                <span className="text-lg font-semibold leading-5">
                  Required Blood
                </span>
              </label>
              <select
                className="select bg-bgLight w-full"
                name="reqBlood"
                defaultValue="Select blood group"
              >
                <option disabled>Select blood group</option>
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
            <div className="mb-2 sm:mb-0">
              <label className="label">
                <span className="text-lg font-semibold leading-5">
                  Required Date
                </span>
              </label>
              <input
                type="date"
                name="reqDate"
                min={new Date().toJSON().slice(0, 10)}
                placeholder="Select your date of birth"
                className="input bg-bgLight w-full"
              />
            </div>
            <div className="col-span-2 mb-2 sm:mb-0">
              <label className="label">
                <span className="text-lg font-semibold leading-5">Message</span>
              </label>
              <textarea
                name="message"
                cols="30"
                className="textarea bg-bgLight w-full"
                placeholder="Write your message"
                required
              ></textarea>
            </div>
          </div>
          <button className="bg-navRed text-white text-lg font-bold border-0 rounded-lg py-3 w-32 sm:w-60 mt-6">
            Submit
          </button>
        </form>
      </div>
      {messages?.length > 0 && (
        <div className="bg-white sm:w-4/5 lg:w-3/5 px-6 lg:px-8 pt-9 pb-6 mx-auto rounded-2xl">
          <h3 className="text-3xl font-bold mb-4">Family Messages</h3>
          <div className="sm:grid grid-cols-2 gap-3">
            {messages?.map((msg) => (
              <div
                key={msg?._id}
                className="border border-borderGrey rounded-2xl px-6 pt-6 pb-4 mb-2 sm:mb-0"
              >
                {userGroupsDetails.map(
                  (group) =>
                    group?._id === msg?.familyGroup && (
                      <div
                        key={group?._id}
                        className="flex justify-between mb-3"
                      >
                        <p className="text-black">{group?.name}</p>
                        {(user?.uid === msg?.member?.id ||
                          group?.adminId === msg?.member?.id) && (
                          <button
                            onClick={() => handleDelete(msg._id)}
                            className="text-textYellowEligible font-semibold border-2 border-textYellowEligible rounded-lg px-3 ml-3"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    )
                )}
                <p className="text-black text-lg font-bold mb-2">
                  <span className="mr-1">{msg?.member?.name}</span>
                  {msg?.requiredBlood && (
                    <>
                      is required of blood group
                      <span className="font-bold ml-1">
                        {msg?.requiredBlood}
                      </span>
                    </>
                  )}
                </p>
                <div className="bg-bgLight text-textLightBlack text-sm rounded-lg p-3 mb-2">
                  {msg?.description}
                </div>
                <div
                  className={
                    msg?.requirementDate
                      ? "flex justify-between"
                      : "flex justify-end"
                  }
                >
                  {msg?.requirementDate && (
                    <span className="flex flex-col">
                      <span className="text-textLightBlack text-sm">
                        Required Date:
                      </span>
                      <span className="text-black">
                        {dateFormat(msg?.requirementDate)}
                      </span>
                    </span>
                  )}
                  <span className="flex flex-col text-right">
                    <span className="text-textLightBlack text-sm">
                      Posted Date:
                    </span>
                    <span className="text-black">
                      {dateFormat(msg?.messageDate)}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
