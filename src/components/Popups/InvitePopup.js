import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const InvitePopup = ({ visible, onClose }) => {
  const { user, userGroupsDetails } = useContext(AuthContext);

  const handleOnClose = (e) => {
    if (e.target.id === "container") onClose();
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const group = event.target.group.value;
      const email = event.target.email.value;

      // for sending email using emailjs
      // const emailParams = {
      //   to_email: email,
      //   from_name: user?.name,
      //   from_email: user?.email,
      //   message: "http://localhost:3000/",
      // };
      // console.log(emailParams);
      // const result = await emailjs.send(
      //   "invitation_service",
      //   "template_pup9kdi",
      //   emailParams,
      //   "ggz8KkNXvxq7QQoun"
      // );
      // const resultText = result.text;
      // console.log(resultText);

      // post to invite collection
      const data = {
        familyId: group,
        inviterId: user?.uid,
        toEmail: email,
      };
      const response = await fetch(
        `https://famiplasma-server-lamisaritu.onrender.com/invites`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const responseResult = await response.json();
      console.log("Successfully created invite document", responseResult);
      Swal.fire({
        position: "bottom-end",
        width: 400,
        padding: "1em",
        icon: "success",
        title: "Invitation sent!",
        showConfirmButton: false,
        timer: 1500,
      });
      onClose();
    } catch (error) {
      console.error("From invite popup", error);
    }
  };

  return (
    visible && (
      <div
        id="container"
        onClick={handleOnClose}
        className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center z-10"
      >
        <div className="bg-white text-center rounded-3xl p-12">
          <h3 className="text-dark text-3xl font-bold pb-6">
            Invite through Email
          </h3>
          <form onSubmit={handleSubmit} className="text-center">
            <select
              name="group"
              defaultValue="Select family group"
              className="select bg-white border-2 border-borderGrey w-full mb-3"
            >
              <option disabled>Select family group</option>
              {userGroupsDetails?.map((group) => (
                <option key={group._id} value={group._id}>
                  {group.name}
                </option>
              ))}
            </select>
            <input
              type="email"
              name="email"
              placeholder="Type email for invitation"
              className="input bg-white border-2 border-borderGrey w-full"
            />
            <button className="col-span-2 bg-borderDark text-black font-bold border-0 rounded-lg px-6 py-2 mt-4">
              Send
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default InvitePopup;
