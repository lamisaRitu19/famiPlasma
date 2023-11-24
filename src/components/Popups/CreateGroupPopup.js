import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Swal from "sweetalert2";

const CreateGroupPopup = ({ visible, onClose }) => {
  const { user, getUserGroupsDetails } = useContext(AuthContext);

  const handleOnClose = (e) => {
    if (e.target.id === "container") onClose();
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const name = event.target.name.value;

      // a new family posting in family collection
      const data = {
        name,
        adminId: user?.uid,
        members: [user?.uid],
      };
      const response = await fetch(`http://59.152.103.142:8013/families`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseResult = await response.json();
      console.log("Successfully created family", responseResult);

      // new family group is updated in familyGroups in user collection
      const updatedData = {
        newGroup: responseResult.insertedId,
      };
      const response2 = await fetch(
        `http://59.152.103.142:8013/users/groupUpdateOne/${user?.uid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );
      const responseResult2 = await response2.json();
      console.log("Successful updated user", responseResult2);

      await getUserGroupsDetails(user?.uid).then(() => {
        Swal.fire({
          position: "bottom-end",
          width: 400,
          padding: "1em",
          icon: "success",
          title: "Created a new group",
          showConfirmButton: false,
          timer: 1500,
        });
      });

      onClose();
    } catch (error) {
      console.error("From create group popup", error);
    }
  };

  return (
    visible && (
      <div
        id="container"
        onClick={handleOnClose}
        className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center"
      >
        <div className="bg-white text-center rounded-3xl p-12">
          <h3 className="text-dark text-3xl font-bold pb-6">
            Create a new Family group
          </h3>
          <form onSubmit={handleSubmit} className="text-center">
            <input
              type="text"
              name="name"
              placeholder="Your family group name"
              className="input bg-white border-2 border-borderGrey w-full"
            />
            <button className="col-span-2 bg-borderDark text-black font-bold border-0 rounded-lg px-6 py-2 mt-4">
              Create
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default CreateGroupPopup;
