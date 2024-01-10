import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import InputSet from "./InputSet";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [step, setStep] = useState(1);
  const [editable, setEditable] = useState(0);
  const [check, setCheck] = useState(false);
  const [inputCount, setInputCount] = useState(1);
  const [inputValues, setInputValues] = useState([
    { inputValueName: "", inputValueDes: "" },
  ]);
  const navigate = useNavigate();

  const nameArray = user.name.split(" ");
  const fstname = nameArray
    .filter((x, i) => i !== nameArray.length - 1)
    .join(" ");

  useEffect(() => {
    if (user?.diseases.length > 0) {
      const newInputValues = user?.diseases;
      newInputValues.push({ inputValueName: "", inputValueDes: "" });
      setInputValues(newInputValues);
    }
  }, []);

  const handleEditProfile = async (event) => {
    try {
      event.preventDefault();
      const form = event.target;
      const fname = form.fname.value;
      const lname = form.lname.value;
      const email = form.email.value;
      const contact = form.contact.value;
      const addressDetails = form.addressDetails.value;
      const city = form.city.value;
      const zip = form.zip.value;
      const password = form.password.value;
      const confirmPass = form.confirmPass.value;
      const dob = form.dob.value;
      const weight = form.weight.value;
      let gender = form.gender.value;
      let bloodGroup = form.bloodGroup.value;
      const timesDonated = form.timesDonated.value;
      const lastDonation = form.lastDonation.value;
      let eligibilityReason = form.eligibilityReason?.value;
      let eligibilityAuto = form.eligibilityAuto?.value;
      let eligibilityUser = "";
      const todayDate = new Date().toJSON().slice(0, 10);
      const dateDiff =
        (new Date(todayDate) - new Date(lastDonation)) / (1000 * 3600 * 24);

      if (gender === "Select gender") gender = "";
      if (bloodGroup === "Select your blood group") bloodGroup = "";
      if (check) eligibilityUser = "Ineligible";
      if (!eligibilityReason) eligibilityReason = "";
      if (dateDiff > 90) {
        eligibilityAuto = "Eligible";
      } else if (dateDiff < 90) {
        eligibilityAuto = "Ineligible";
        if (eligibilityReason === "") {
          eligibilityReason =
            "90 days have not passed since last blood donation";
        } else {
          eligibilityReason =
            eligibilityReason +
            " and 90 days have not passed since last blood donation";
        }
      }

      const data = {
        name: fname + " " + lname,
        email,
        contact,
        address: { details: addressDetails, city, zip },
        password,
        dob,
        weight,
        gender,
        bloodGroup,
        noOfDonation: timesDonated,
        lastDonationDate: lastDonation,
        eligibility: {
          auto: eligibilityAuto,
          userGiven: eligibilityUser,
          reason: eligibilityReason,
        },
        diseases: inputValues,
      };

      const response = await fetch(
        `https://famiplasma-server-lamisaritu.onrender.com/users/profile/${user?.uid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const responseResult = await response.json();
      if (responseResult.modifiedCount > 0) {
        console.log("Successful updated to mongodb", responseResult);
        Swal.fire({
          position: "bottom-end",
          width: 400,
          icon: "success",
          title: "Updated user profile",
          showConfirmButton: false,
          timer: 1500,
        });
        await form.reset();
        setStep(1);
        setEditable(0);
        setCheck(false);
        navigate("/");
      }
    } catch (error) {
      console.error("From update profile", error);
    }
  };

  return (
    <div className="bg-bgLight text-dark flex-col items-center pb-8">
      <h3 className="text-4xl font-bold text-center pt-10 pb-6">
        Profile Update
      </h3>
      <div className="flex flex-col-reverse lg:flex-row justify-center items-center">
        <div>
          <ul className="steps lg:steps-vertical text-white mt-4 lg:mt-0">
            <li className="step step-error"></li>
            <li className={step === 2 ? `step step-error` : `step`}></li>
          </ul>
        </div>
        <form
          onSubmit={handleEditProfile}
          className="box-border w-full sm:w-4/5 lg:w-3/5"
        >
          <div
            className={
              step === 1
                ? `bg-white border border-borderGrey rounded-2xl drop-shadow-3xl px-6 lg:px-32 pt-16 pb-10`
                : `hidden`
            }
          >
            <div className="sm:grid grid-cols-2 gap-3">
              <div>
                <label className="label">
                  <span className="text-lg font-semibold leading-5">
                    First Name
                  </span>
                </label>
                <input
                  type="text"
                  name="fname"
                  defaultValue={fstname}
                  disabled={editable === 0}
                  placeholder="Your first name"
                  className="input bg-white border-2 border-borderGrey w-full"
                />
              </div>
              <div>
                <label className="label">
                  <span className="text-lg font-semibold leading-5">
                    Last Name
                  </span>
                </label>
                <input
                  type="text"
                  name="lname"
                  defaultValue={nameArray[nameArray.length - 1]}
                  disabled={editable === 0}
                  placeholder="Your last name"
                  className="input bg-white border-2 border-borderGrey w-full"
                />
              </div>
              <div>
                <label className="label">
                  <span className="text-lg font-semibold leading-5">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={user?.email}
                  disabled={editable === 0}
                  placeholder="Your email"
                  className="input bg-white border-2 border-borderGrey w-full"
                />
              </div>
              <div>
                <label className="label">
                  <span className="text-lg font-semibold leading-5">
                    Contact number
                  </span>
                </label>
                <input
                  type="text"
                  name="contact"
                  defaultValue={user?.contact}
                  disabled={editable === 0}
                  placeholder="Your contact number"
                  className="input bg-white border-2 border-borderGrey w-full"
                />
              </div>
              <div className="col-span-2">
                <label className="label">
                  <span className="text-lg font-semibold leading-5">
                    Address Details
                  </span>
                </label>
                <input
                  type="text"
                  name="addressDetails"
                  defaultValue={user?.address?.details}
                  disabled={editable === 0}
                  placeholder="Your address"
                  className="input bg-white border-2 border-borderGrey w-full"
                />
              </div>
              <div>
                <label className="label">
                  <span className="text-lg font-semibold leading-5">City</span>
                </label>
                <input
                  type="text"
                  name="city"
                  defaultValue={user?.address?.city}
                  disabled={editable === 0}
                  placeholder="Your contact number"
                  className="input bg-white border-2 border-borderGrey w-full"
                />
              </div>
              <div>
                <label className="label">
                  <span className="text-lg font-semibold leading-5">
                    ZIP Code
                  </span>
                </label>
                <input
                  type="number"
                  name="zip"
                  defaultValue={user?.address?.zip}
                  disabled={editable === 0}
                  placeholder="Your contact number"
                  className="input bg-white border-2 border-borderGrey w-full"
                />
              </div>
              <div>
                <label className="label">
                  <span className="text-lg font-semibold leading-5">
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  name="password"
                  defaultValue={user?.password}
                  disabled={editable === 0}
                  placeholder="Your password"
                  className="input bg-white border-2 border-borderGrey w-full"
                />
              </div>
              <div>
                <label className="label">
                  <span className="text-lg font-semibold leading-5">
                    Confirm Password
                  </span>
                </label>
                <input
                  type="password"
                  name="confirmPass"
                  defaultValue={user?.password}
                  disabled={editable === 0}
                  placeholder="Confirm your password"
                  className="input bg-white border-2 border-borderGrey w-full"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="bg-white text-navRed text-lg font-bold border border-navRed rounded-lg py-3 w-32 sm:w-60 mr-3 mt-6"
              >
                Next
              </button>
              {editable === 0 && (
                <button
                  type="button"
                  onClick={() => setEditable(1)}
                  className="bg-navRed text-white text-lg font-bold border-0 rounded-lg py-3 w-32 sm:w-60 mt-6"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
          {/* 2nd page */}
          <div
            className={
              step === 2
                ? `bg-white border border-borderGrey rounded-2xl drop-shadow-3xl px-6 lg:px-32 pt-16 pb-10`
                : `hidden`
            }
          >
            <div className="sm:grid grid-cols-2 gap-3">
              <div className="mb-2 sm:mb-0">
                <label className="label">
                  <span className="text-lg font-semibold leading-5">
                    Date of Birth
                  </span>
                </label>
                <input
                  type="date"
                  name="dob"
                  max={new Date().toJSON().slice(0, 10)}
                  defaultValue={user?.dob}
                  disabled={editable === 0}
                  placeholder="Select your date of birth"
                  className="input bg-white border-2 border-borderGrey w-full"
                />
              </div>
              <div className="mb-2 sm:mb-0">
                <label className="label">
                  <span className="text-lg font-semibold leading-5">
                    Weight
                  </span>
                </label>
                <input
                  type="number"
                  name="weight"
                  defaultValue={user?.weight}
                  disabled={editable === 0}
                  placeholder="Your weight in kg"
                  className="input bg-white border-2 border-borderGrey w-full"
                />
              </div>
              <div className="mb-2 sm:mb-0">
                <label className="label">
                  <span className="text-lg font-semibold leading-5">
                    Gender
                  </span>
                </label>
                <select
                  name="gender"
                  defaultValue={user?.gender ? user.gender : "Select gender"}
                  disabled={editable === 0}
                  className="select bg-white border-2 border-borderGrey w-full"
                >
                  <option disabled>Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-2 sm:mb-0">
                <label className="label">
                  <span className="text-lg font-semibold leading-5">
                    Blood Group
                  </span>
                </label>
                <select
                  name="bloodGroup"
                  defaultValue={
                    user?.bloodGroup
                      ? user.bloodGroup
                      : "Select your blood group"
                  }
                  disabled={editable === 0}
                  className="select bg-white border-2 border-borderGrey w-full"
                >
                  <option disabled>Select your blood group</option>
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
                    Number of Time Donated Blood
                  </span>
                </label>
                <input
                  type="number"
                  name="timesDonated"
                  defaultValue={user?.noOfDonation}
                  disabled={editable === 0}
                  placeholder="Number of times you donated blood"
                  className="input bg-white border-2 border-borderGrey w-full"
                />
              </div>
              <div className="mb-2 sm:mb-0">
                <label className="label">
                  <span className="text-lg font-semibold leading-5">
                    Date of Last Donation
                  </span>
                </label>
                <input
                  type="date"
                  name="lastDonation"
                  max={new Date().toJSON().slice(0, 10)}
                  defaultValue={user?.lastDonationDate}
                  disabled={editable === 0}
                  placeholder="Select your date of birth"
                  className="input bg-white border-2 border-borderGrey w-full"
                />
              </div>
              <div className="col-span-2 mb-2 sm:mb-0">
                <label className="label">
                  <span className="text-lg font-semibold leading-5">
                    Eligibility to Donate
                  </span>
                </label>
                {editable === 0 && (
                  <div className="sm:grid grid-cols-4 gap-3">
                    <input
                      type="text"
                      name="eligibilityAuto"
                      defaultValue={user?.eligibility?.userGiven}
                      disabled={editable === 0}
                      placeholder="Eligibility to donate"
                      className="input bg-white border-2 border-borderGrey w-full"
                    />
                    {user?.eligibility?.userGiven === "Ineligible" && (
                      <input
                        type="text"
                        name="eligibilityReason"
                        defaultValue={user?.eligibility?.reason}
                        placeholder="Your reason for eligibility"
                        className="input col-span-3 bg-white border-2 border-borderGrey w-full"
                      />
                    )}
                  </div>
                )}
                {editable === 1 && (
                  <div className="sm:grid grid-cols-4 gap-3">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="radio-8"
                        className="radio radio-error mx-4"
                        onClick={() => setCheck(!check)}
                        checked={check}
                        readOnly
                      />
                      <span className="font-semibold">Ineligible</span>
                    </div>
                    {check && (
                      <input
                        type="text"
                        name="eligibilityReason"
                        defaultValue={user?.eligibility?.reason}
                        placeholder="Your reason for eligibility"
                        className="input col-span-3 bg-white border-2 border-borderGrey w-full"
                      />
                    )}
                  </div>
                )}
              </div>
              <div className="col-span-2 mb-2 sm:mb-0">
                <label className="label">
                  <span className="text-lg font-semibold leading-5">
                    Health Issues
                  </span>
                </label>
                <InputSet
                  editable={editable}
                  inputCount={inputCount}
                  setInputCount={setInputCount}
                  inputValues={inputValues}
                  setInputValues={setInputValues}
                ></InputSet>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="bg-white text-navRed text-lg font-bold border border-navRed rounded-lg py-3 w-32 sm:w-60 mr-3 mt-6"
              >
                Previous
              </button>
              {editable === 0 && (
                <button
                  type="button"
                  onClick={() => setEditable(1)}
                  className="bg-navRed text-white text-lg font-bold border-0 rounded-lg py-3 w-32 sm:w-60 mt-6"
                >
                  Edit
                </button>
              )}
              {editable === 1 && (
                <button className="bg-navRed text-white text-lg font-bold border-0 rounded-lg py-3 w-32 sm:w-60 mt-6">
                  Save
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
