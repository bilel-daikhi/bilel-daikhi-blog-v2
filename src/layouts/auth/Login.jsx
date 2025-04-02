import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { REGISTER_PATH, ROOT_PATH } from "../../lib/routes.jsx";
import { Link, Link as routerLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  emailValidate,
  passwordValidate,
} from "../../utils/form-validation.js";
import { useGoogleLogin, useLogin } from "../../hooks/auths.jsx";
import GoogleButton from "react-google-button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Alert } from "react-bootstrap";
import Register from "./Register.jsx";

export default function Login() {
  const [show, setShow] = useState(false);
  const { login, isLoading } = useLogin();
  const { googleSignIn, isLoadingGoogle } = useGoogleLogin();
  const [key, setKey] = useState("login");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  async function handleLogin(data) {
    const succeeded = await login({
      email: data.email,
      password: data.password,
      redirectTo: ROOT_PATH,
    });
    if (succeeded) {
      reset();
      window.location.reload();
    }
  }
  async function handleGoogleSignIn(e) {
    e.preventDefault();
    const succeeded = await googleSignIn({
      redirectTo: ROOT_PATH,
    });
    if (succeeded) {
      reset();
      window.location.reload();
    }
  }
  return (
    <section id="content">
      <div class="content-wrap">
        <div class="container clearfix">
          <div
            class="tabs divcenter nobottommargin clearfix"
            id="tab-login-register"
            style={{ maxWidth: "500px" }}
          >
            <Tabs
              id="controlled-tab"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3"
            >
              <Tab eventKey="login" title="Login" class="tab-content clearfix">
                <div class="card nobottommargin">
                  <div class="card-body" style={{ padding: "40px" }}>
                    <form
                      id="login-form"
                      name="login-form"
                      class="nobottommargin"
                      onSubmit={handleSubmit(handleLogin)}
                    >
                      <h3>Login to your Account</h3>

                      <div class="col_full">
                        <label for="login-form-email">Email:</label>
                        <input
                          type="text"
                          id="login-form-email"
                          name="login-form-email"
                          {...register("email", emailValidate)}
                          class="form-control"
                        />
                        {errors.email && (
                          <Alert key={"danger"} variant={"danger"}>
                            {errors.email.message}
                          </Alert>
                        )}
                      </div>

                      <div class="col_full">
                        <label for="login-form-password">Password:</label>
                        <input
                          type="password"
                          id="login-form-password"
                          {...register("password", passwordValidate)}
                          class="form-control"
                        />
                        {errors.password && (
                          <Alert key={"danger"} variant={"danger"}>
                            {errors.password.message}
                          </Alert>
                        )}
                      </div>

                      <div class="col_full nobottommargin">
                        <button
                          class="button button-3d button-black nomargin"
                          id="login-form-submit"
                          name="login-form-submit"
                          value="login"
                        >
                          Login
                        </button>
                        <Link to="#" class="fright">
                          Forgot Password?
                        </Link>
                      </div>
                    </form>
                  </div>
                  <div className="mt-3 mb-3 d-flex justify-content-center">
                    {" "}
                    <GoogleButton
                      className="g-btn"
                      type="dark"
                      onClick={handleGoogleSignIn}
                    />
                  </div>
                </div>
              </Tab>

              <Tab
                eventKey="register"
                title="Register"
                class="tab-content clearfix"
              >
                <Register />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}
