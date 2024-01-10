import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import Swal from "sweetalert2";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userGroupsDetails, setUserGroupsDetails] = useState([]);
  const [userAllGroupsMembers, setUserAllGroupsMembers] = useState([]);
  const [userAllGroupsMembersFiltered, setUserAllGroupsMembersFiltered] =
    useState(null);
  const [viewMemberDetail, setViewMemberDetail] = useState({});
  const [loading, setLoading] = useState(true);
  let userReceivedInvitations = [];

  const bloodData = [
    { name: "A+", value: 0 },
    { name: "A-", value: 0 },
    { name: "B+", value: 0 },
    { name: "B-", value: 0 },
    { name: "AB+", value: 0 },
    { name: "AB-", value: 0 },
    { name: "O+", value: 0 },
    { name: "O-", value: 0 },
  ];
  const ageData = [
    { name: "0-10", value: 0 },
    { name: "11-20", value: 0 },
    { name: "21-30", value: 0 },
    { name: "31-40", value: 0 },
    { name: "41-50", value: 0 },
    { name: "51-60", value: 0 },
    { name: "61-70", value: 0 },
    { name: "71-80", value: 0 },
    { name: "80+", value: 0 },
  ];
  userAllGroupsMembers.map((member) => {
    bloodData.map((d) => {
      if (d.name === member.bloodGroup) {
        d.value++;
      }
    });

    const age =
      new Date(new Date().toJSON().slice(0, 10)).getFullYear() -
      new Date(member.dob).getFullYear();

    if (age <= 10) ageData[0].value++;
    else if (age <= 20) ageData[1].value++;
    else if (age <= 30) ageData[2].value++;
    else if (age <= 40) ageData[3].value++;
    else if (age <= 50) ageData[4].value++;
    else if (age <= 60) ageData[5].value++;
    else if (age <= 70) ageData[6].value++;
    else if (age <= 80) ageData[7].value++;
    else ageData[8].value++;
  });

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  const providerLogin = async (provider) => {
    setLoading(true);
    return await signInWithPopup(auth, provider);
  };

  async function updateFamilyGroupsInUsers(_uid) {
    try {
      // giving user id and invites list of this user, in familyGroups list of user, groups are added with ids in invites list
      const response = await fetch(
        `https://famiplasma-server-lamisaritu.onrender.com/users/groupUpdateMany/${_uid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userReceivedInvitations),
        }
      );
      const responseResult = await response.json();
      console.log("Successful updated user", responseResult);
    } catch (error) {
      console.error("updateFamilyGroupsInUsers", error);
    }
  }
  async function updateMembersInFamilies(_uid) {
    try {
      // giving user id and invites list of this user, user is added in members list of families containing ids in invites list
      const response = await fetch(
        `https://famiplasma-server-lamisaritu.onrender.com/families/${_uid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userReceivedInvitations),
        }
      );
      const responseResult = await response.json();
      console.log("Successful updated families", responseResult);
    } catch (error) {
      console.error("updateMembersInFamilies", error);
    }
  }
  async function deleteInvites() {
    try {
      // deleting invite document from collection
      const response = await fetch(
        `https://famiplasma-server-lamisaritu.onrender.com/invites`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userReceivedInvitations),
        }
      );
      const responseResult = await response.json();
      console.log("Successful deleted invitations", responseResult);
    } catch (err) {
      console.error("From deleteInvites function", err);
    }
  }
  async function updateUserInviteData(_uid) {
    await updateFamilyGroupsInUsers(_uid);
    await updateMembersInFamilies(_uid);
    await deleteInvites();
  }

  async function checkInvitation(_email) {
    try {
      const emain = _email.split("@")[0];
      const response = await fetch(
        `https://famiplasma-server-lamisaritu.onrender.com/invites/${emain}`
      );
      const responseResult = await response.json();
      console.log("Successful fetched requested invitations", responseResult);
      userReceivedInvitations = responseResult;
    } catch (err) {
      console.log("No invitations found for this user");
    }
  }

  async function getUserGroupsDetails(userUid) {
    try {
      // giving user id, families are fetched, filtered and listed if they have this user id
      const response = await fetch(
        `https://famiplasma-server-lamisaritu.onrender.com/families/${userUid}`
      );
      const responseResult = await response.json();
      console.log("Successful fetched family groups", responseResult);
      setUserGroupsDetails(responseResult);
    } catch (err) {
      console.log("The user does not belong to any family");
    }
  }

  async function getUserAllGroupsMembers(userUid) {
    try {
      // giving user id, families are listed if they have this user id then all the members from these families are fetched
      const response = await fetch(
        `https://famiplasma-server-lamisaritu.onrender.com/users/allGroupsUsers/${userUid}`
      );
      const responseResult = await response.json();
      console.log(
        "Successful fetched all users of family groups",
        responseResult
      );
      setUserAllGroupsMembers(responseResult);
    } catch (err) {
      console.log("The user does not belong to any family");
    }
  }

  async function updateUserData(currentUser) {
    if (currentUser) {
      // checking if the current user has any invitation request, if yes then invitation list is set in userReceivedInvitations array
      checkInvitation(currentUser.email);

      try {
        // trying to login user and set in user state
        const response = await fetch(
          `https://famiplasma-server-lamisaritu.onrender.com/users/${currentUser?.uid}`
        );
        const responseResult = await response.json();
        console.log("Successful login", responseResult);
        setUser(responseResult);

        // if userReceivedInvitations array is not empty, user data, family data are updated accordingly and invitation is later deleted
        if (userReceivedInvitations.length !== 0) {
          await updateUserInviteData(responseResult.uid);
        }

        // user groups details are fetched and set in userGroupsDetails state
        await getUserGroupsDetails(responseResult.uid);

        // await getUserAllGroupsMembers(responseResult.uid);
        setLoading(false);

        await getUserAllGroupsMembers(responseResult.uid); //new added check
      } catch (error) {
        // check if the user is logging in with google provider so the user is posted
        if (currentUser?.emailVerified) {
          try {
            const data = {
              name: currentUser?.displayName,
              email: currentUser?.email,
              uid: currentUser?.uid,
              contact: "",
              address: { details: "", city: "", zip: "" },
              password: "",
              dob: "",
              weight: "",
              gender: "",
              bloodGroup: "",
              noOfDonation: "",
              lastDonationDate: "",
              eligibility: { auto: "", userGiven: "", reason: "" },
              diseases: [],
              familyGroups: [],
            };
            const response = await fetch(
              "https://famiplasma-server-lamisaritu.onrender.com/users",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              }
            );
            const responseResult = await response.json();
            Swal.fire({
              position: "bottom-end",
              width: 400,
              icon: "success",
              title: "Successfully registered!",
              showConfirmButton: false,
              timer: 1500,
            });
            await updateUserData(currentUser);
          } catch (error) {
            console.error(error);
          }
        }
      }
    } else {
      setUser(null);
      setUserGroupsDetails([]);
      setUserAllGroupsMembers([]);
      setLoading(false);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("State changed", currentUser);
      await updateUserData(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    setUser,
    userGroupsDetails,
    userAllGroupsMembers,
    setUserAllGroupsMembers,
    userAllGroupsMembersFiltered,
    setUserAllGroupsMembersFiltered,
    viewMemberDetail,
    setViewMemberDetail,
    loading,
    setLoading,
    bloodData,
    ageData,
    createUser,
    signInUser,
    signOutUser,
    providerLogin,
    getUserGroupsDetails,
    updateUserData,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
