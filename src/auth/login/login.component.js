/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./login.component.css";
import { useForm } from "react-hook-form";
import { Box, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import LOGO from "../../assets/logo.png";
import { signIn } from "../../service";
import CircularProgress from "@mui/material/CircularProgress";
// import { AccountCircle } from '@mui/icons-material';

const Login = () => {
  const navigate = useNavigate();
  const [disableBtn, setDisableBtn] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState({
    apiResError: "",
  });

  useEffect(() => {
    document.getElementById("appBar-container").style.display = "none";
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const onSubmit = (data) => {
    setDisableBtn(true);
    axios({
      method: "POST",
      url: signIn,
      data: data,
    })
      .then((res) => {
        setDisableBtn(false);
        const { authKey, fname, lname, email, phone, userId } = res.data.data;
        localStorage.setItem("token", authKey);
        localStorage.setItem(
          "userInfo",
          JSON.stringify({ fname, lname, phone, email, userId })
        );
        swal("Good job!", "Login Successful!", "success");
        navigate("/");
      })
      .catch((err) => {
        setDisableBtn(false);
        setError({ apiResError: "Invalid Credentials" });
      });
  };

  return (
    <>
      <div
        className="login-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box
          style={{
            width: "500px",
            padding: "4rem 2rem",
            borderRadius: "35px",
            margin: "0 2rem",
          }}
          component={Paper}
        >
          <div className="mb-4">
            <div className="text-center fw-bold mb-4">
              <img
                src={LOGO}
                alt="..."
                className="bg-primary p-2 rounded"
                width={"100"}
              />
            </div>
            <h2 className="text-center fw-bold">Sign In</h2>
            <h5 className="text-danger text-center">{error.apiResError}</h5>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <input
                type="email"
                className="form-control input-field"
                aria-describedby="emailHelp"
                placeholder="Enter your username"
                defaultValue={"karl@gmail.com"}
                name="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Username is required ***",
                  },
                  maxLength: 80,
                })}
              />
              {errors?.email && (
                <span
                  className="span-error text-danger"
                  style={{ fontSize: "14px", marginLeft: "10px" }}
                >
                  {errors.email.message}{" "}
                </span>
              )}
            </div>
            <div className="mb-3">
              <input
                type={"password"}
                placeholder="Enter your password"
                name="password"
                defaultValue={"test@123"}
                className="form-control input-field"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required ***",
                  },
                  maxLength: 50,
                })}
              />
              {errors?.password && (
                <span
                  className="span-error text-danger"
                  style={{ fontSize: "14px", marginLeft: "10px" }}
                >
                  {" "}
                  {errors.password.message}{" "}
                </span>
              )}
            </div>

            {/* <TextField
                        variant="filled"
                        id="input-with-icon-textfield"
                        placeholder="Enter your password"
                        className="form-control rounded-pill input-field my-3"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <VisibilityIcon />
                                </InputAdornment>
                            ),
                        }}
                    /> */}

            <div className="d-flex flex-column justify-content-center mt-5">
              <div className="text-center">
                <button
                  type="submit"
                  disabled={disableBtn}
                  className="btn btn-primary rounded-pill px-4 w-100 login-btn btn-lg"
                >
                  {disableBtn ? (
                    <CircularProgress color="inherit" size={"18px"} />
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
              <span
                className="span-signup"
                style={{ marginTop: "10px", textAlign: "center" }}
              >
                Don't you have an account?{" "}
                <Link className="link-tag" to="/register">
                  Sign up
                </Link>
              </span>
            </div>
          </form>
        </Box>
      </div>
    </>
  );
};

export default Login;
