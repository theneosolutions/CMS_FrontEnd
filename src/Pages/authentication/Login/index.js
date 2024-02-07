import React, { useEffect } from "react";
import "./login.css";
import WaveAnimation from "Components/Loading"; // Adjust the path based on your file structure

import Logo from "../../../Assets/Images/logo.svg";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "Services/redux/reducer";

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.Loading);
  const islogin = useSelector((state) => state.islogin);
  const user = useSelector((state) => state.user);

  function Login() {
    dispatch({
      type: "LOGIN_USER",
      payload: {
        username: email,
        password: password,
      },
    });
  }
  useEffect(() => {
    if (islogin) {
      console.log("logggggggggggggggggggggggg", islogin);
      // Add any logic you want to execute when islogin changes
    }
  }, []); // Include islogin in the dependency array

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    Validate();
  };
  const handleClose = () => {
    dispatch(action.Message({ open: false })); // Closing the message
  };

  function Validate() {
    Login();
  }

  return (
    <section className="bg-fixed-full h-screen w-full">
      <WaveAnimation show={loading} />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <a
            href="#"
            class="flex flex-col items-center mb-2 mt-8 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            {" "}
            <img class="w-48" src={Logo} alt="logo" />
          </a>

          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  class="bg-gray-50 border border-primary text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:placeholder-gray-400 dark:text-white outline-none"
                  required={true}
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  class="bg-gray-50 border border-primary text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5  dark:placeholder-gray-200 dark:text-white outline-none"
                  required={true}
                />
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      class="w-4 h-4 border border-primary rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label
                      for="remember"
                      class="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                // onClick={() => navigate("/otp")}
                type="submit"
                class="w-full text-white bg-primary hover:bg-opacity-80 duration-300  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  onClick={() => console.log("user", user, islogin)}
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>

      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={!error ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </section>
  );
}
export default Login;
