import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import google from "../../assets/icons/google.svg";
import { useLottie } from "lottie-react";
import heartAnimation from "../../assets/lotties/heartAnimation.json";
import { AuthContext } from "../../context/AuthProvider";
import { GoogleAuthProvider } from "firebase/auth";
import Swal from "sweetalert2";

const Login = () => {
  const { setLoading, signInUser, providerLogin } = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const form = event.target;
      const email = form.email.value;
      const password = form.password.value;

      await signInUser(email, password).then(async (userCredential) => {
        Swal.fire({
          position: "bottom-end",
          width: 400,
          icon: "success",
          title: "Successfully logged in!",
          showConfirmButton: false,
          timer: 1500,
        });
        await form.reset();
        navigate(from, { replace: true });
      });
    } catch (error) {
      console.error("From signIn user error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await providerLogin(googleProvider).then((userCredential) => {
        Swal.fire({
          position: "bottom-end",
          width: 400,
          padding: "1em",
          icon: "success",
          title: "Successfully logged in!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      });
    } catch (error) {
      console.error("From google signed in error", error);
    } finally {
      setLoading(false);
    }
  };

  // For lottie animation
  const options = {
    animationData: heartAnimation,
    loop: true,
  };
  const { View } = useLottie(options);

  return (
    <div className="bg-bgLight text-dark sm:px-6 lg:px-36 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:w-1/2 bg-white lg:border border-borderGrey rounded-2xl drop-shadow-3xl lg:px-12 mx-auto ">
        <div className="h-full">
          <div className="w-1/3 lg:w-2/3 mx-auto mt-10 lg:mt-32 mb-6 lg:mb-0">
            {View}
          </div>
        </div>
        <div className="text-center rounded-r-2xl px-12 lg:px-0 pt-4 pb-16">
          <h3 className="text-4xl font-bold text-center lg:pt-10 pb-3">
            Log In
          </h3>
          <form onSubmit={handleLogin}>
            <div className="mb-1">
              <label className="label justify-start">
                <span className="text-lg font-semibold leading-5">Email</span>
                <span className="text-textRed font-bold leading-5 ml-1">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your email"
                className="input bg-white border-2 border-borderGrey w-full"
                required
              />
            </div>
            <div className="mb-1">
              <label className="label justify-start">
                <span className="text-lg font-semibold leading-5">
                  Password
                </span>
                <span className="text-textRed font-bold leading-5 ml-1">*</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Your password"
                className="input bg-white border-2 border-borderGrey w-full"
                required
              />
            </div>
            <button className="bg-navRed text-white text-lg font-bold border-0 rounded-lg py-3 w-40 my-5">
              Login
            </button>
            <div className="flex justify-center items-center mb-1">
              <p>Or Login with</p>
              <button onClick={handleGoogle}>
                <img
                  src={google}
                  alt="google"
                  className="inline bg-bgLight rounded-full p-3 ml-3"
                />
              </button>
            </div>
            <p>
              Do not have an account?{" "}
              <Link to="/register" className="text-navRed font-bold">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
