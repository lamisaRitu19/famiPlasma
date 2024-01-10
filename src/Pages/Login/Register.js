import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logInImg from "../../assets/images/28463049_xco2_8jtl_220606.jpg";
import blood from "../../assets/icons/blood.svg";
import google from "../../assets/icons/google.svg";
import { AuthContext } from "../../context/AuthProvider";
import { GoogleAuthProvider } from "firebase/auth";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, providerLogin, updateUserData } = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();

  async function postUserData(
    name,
    email,
    city,
    gender,
    group,
    password,
    _user
  ) {
    try {
      const data = {
        name,
        email,
        uid: _user?.uid,
        contact: "",
        address: { details: "", city, zip: "" },
        password,
        dob: "",
        weight: "",
        gender,
        bloodGroup: group,
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
      await updateUserData(_user);
    } catch (error) {
      console.error(error);
    }
  }

  const handleRegister = async (event) => {
    try {
      event.preventDefault();
      const form = event.target;
      const fname = form.fname.value;
      const lname = form.lname.value;
      const name = fname + " " + lname;
      const email = form.email.value;
      const city = form.city.value;
      const gender = form.gender.value;
      let group = form.group.value;
      const password = form.password.value;
      const confirmPass = form.confirmPass.value;
      if (group === "Select your blood group") group = "";

      if (password === confirmPass) {
        await createUser(email, password).then(async (userCredential) => {
          await postUserData(
            name,
            email,
            city,
            gender,
            group,
            password,
            userCredential.user
          );
          await form.reset();
          navigate("/");
        });
      } else {
        Swal.fire({
          position: "bottom-end",
          width: 400,
          icon: "error",
          title: "Password and Confirm password doesn't match!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("From created user error", error);
    }
  };

  const handleGoogle = async () => {
    try {
      await providerLogin(googleProvider).then((userCredential) => {
        Swal.fire({
          position: "bottom-end",
          width: 400,
          icon: "success",
          title: "Successfully registered!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      });
    } catch (error) {
      console.error("From google signed in error", error);
    }
  };

  return (
    <div className="bg-bgLight text-dark sm:px-6 lg:px-36 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:w-3/4 bg-white border border-borderGrey rounded-2xl drop-shadow-3xl lg:px-12 mx-auto">
        <div className="text-center pt-4 pb-0 lg:pb-16">
          <h3 className="text-4xl font-bold text-center py-10">Register</h3>
          <form onSubmit={handleRegister}>
            <div className="sm:grid grid-cols-2 gap-3 px-6 lg:px-0">
              <div className="mb-1 sm:mb-0">
                <label className="label justify-start">
                  <span className="text-lg font-semibold leading-5">
                    First Name
                  </span>
                  <span className="text-textRed font-bold leading-5 ml-1">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  name="fname"
                  placeholder="Your first name"
                  className="input bg-white border-2 border-borderGrey w-full"
                  required
                />
              </div>
              <div className="mb-1 sm:mb-0">
                <label className="label">
                  <span className="text-lg font-semibold leading-5">
                    Last Name
                  </span>
                </label>
                <input
                  type="text"
                  name="lname"
                  placeholder="Your last name"
                  className="input bg-white border-2 border-borderGrey w-full"
                />
              </div>
              <div className="mb-1 sm:mb-0">
                <label className="label justify-start">
                  <span className="text-lg font-semibold leading-5">Email</span>
                  <span className="text-textRed font-bold leading-5 ml-1">
                    *
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  className="input bg-white border-2 border-borderGrey w-full"
                  required
                />
              </div>
              <div className="mb-1 sm:mb-0">
                <label className="label justify-start">
                  <span className="text-lg font-semibold leading-5">City</span>
                  <span className="text-textRed font-bold leading-5 ml-1">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="Your city"
                  className="input bg-white border-2 border-borderGrey w-full"
                  required
                />
              </div>
              <div className="mb-1 sm:mb-0">
                <label className="label justify-start">
                  <span className="text-lg font-semibold leading-5">
                    Gender
                  </span>
                  <span className="text-textRed font-bold leading-5 ml-1">
                    *
                  </span>
                </label>
                <select
                  name="gender"
                  className="select bg-white border-2 border-borderGrey w-full"
                  defaultValue="Select your gender"
                  required
                >
                  <option disabled>Select your gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-1 sm:mb-0">
                <label className="label">
                  <span className="text-lg font-semibold leading-5">
                    Blood Group
                  </span>
                </label>
                <select
                  name="group"
                  className="select bg-white border-2 border-borderGrey w-full"
                  defaultValue="Select your blood group"
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
              <div className="mb-1 sm:mb-0">
                <label className="label justify-start">
                  <span className="text-lg font-semibold leading-5">
                    Password
                  </span>
                  <span className="text-textRed font-bold leading-5 ml-1">
                    *
                  </span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Your password"
                  className="input bg-white border-2 border-borderGrey w-full"
                  required
                />
              </div>
              <div className="mb-1 sm:mb-0">
                <label className="label justify-start">
                  <span className="text-lg font-semibold leading-5">
                    Confirm Password
                  </span>
                  <span className="text-textRed font-bold leading-5 ml-1">
                    *
                  </span>
                </label>
                <input
                  type="password"
                  name="confirmPass"
                  placeholder="Confirm your password"
                  className="input bg-white border-2 border-borderGrey w-full"
                  required
                />
              </div>
            </div>
            <button className="bg-navRed text-white text-lg font-bold border-0 rounded-lg py-3 w-40 my-5">
              Register
            </button>
            <div className="flex justify-center items-center mb-1">
              <p>Or Register with</p>
              <button onClick={handleGoogle}>
                <img
                  src={google}
                  alt="google"
                  className="inline bg-bgLight rounded-full p-3 ml-3"
                />
              </button>
            </div>
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-navRed font-bold">
                Login
              </Link>
            </p>
          </form>
        </div>
        <div>
          <img src={logInImg} alt="" className="w-1/2 mx-auto my-12" />
          <div className="text-dark text-lg font-semibold mx-6 mb-6">
            <h3 className="text-xl font-bold">Benefits of Donating Blood</h3>
            <div className="ml-12 mt-3">
              <div className="mb-1">
                <img src={blood} alt="" className="inline w-5 mr-2" />
                <span>A healthier heart and vascular system</span>
              </div>
              <div className="mb-1">
                <img src={blood} alt="" className="inline w-5 mr-2" />
                <span>Benefit of physical health</span>
              </div>
              <div className="mb-1">
                <img src={blood} alt="" className="inline w-5 mr-2" />
                <span>Reduce stress and negative feelings</span>
              </div>
              <div className="mb-1">
                <img src={blood} alt="" className="inline w-5 mr-2" />
                <span>Provide a sense of belonging and reduce isolation</span>
              </div>
              <div className="mb-1">
                <img src={blood} alt="" className="inline w-5 mr-2" />
                <span>A happier and longer life</span>
              </div>
            </div>
          </div>
          <div className="text-dark text-lg font-semibold mx-6 mb-6">
            <h3 className="text-xl font-bold">Why use this platform</h3>
            <div className="ml-12 mt-3">
              <div className="mb-1">
                <img src={blood} alt="" className="inline w-5 mr-2" />
                <span>Connect with family</span>
              </div>
              <div className="mb-1">
                <img src={blood} alt="" className="inline w-5 mr-2" />
                <span>Reach them easily during emergency</span>
              </div>
              <div className="mb-1">
                <img src={blood} alt="" className="inline w-5 mr-2" />
                <span>Save yourself and others</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
