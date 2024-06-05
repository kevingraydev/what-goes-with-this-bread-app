import logo from "../logo.svg";
import "../App.css";
import { useState } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import { LogoIntro, PrimaryBackground } from "./common/LogoIntro";
import { useNavigate } from "react-router-dom";

// I want to ahve sign-up and sign in buttons
// Clicking Sign Up will review the Sign Up will will post
// Clicking Sign In will review do a get request, and if the get is ok, the next action will be a redirection
// Or Maybe it wont be a redirect, but the hidden div with the functionalty to use the app will go away
// Then I want to create a side bar that  Or just a buttont hat say old recipes.

function LoginPage() {
  const navigate = useNavigate();
  const [loginDisplay, setLoginDisplay] = useState("none");
  const [signUpDisplay, setSignUpDisplay] = useState("none");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupPasswordOne, setsignupPasswordOne] = useState("");
  const [signupPasswordTwo, setSignupPasswordTwo] = useState("");
  let [validPassword, setValidPassword] = useState("");
  const [invalidSignupPasswordDisplay, setInvalidSignupPasswordDisplay] =
    useState("none");
  const [invalidSignUpMessage, setInvalidSignUpMessage] = useState("");
  const [validLoginPasswordDisplay, setValidLoginPasswordDisplay] =
    useState("none");
  const [invalidLoginPasswordDisplay, setInvalidLoginPasswordDisplay] =
    useState("none");
  const [validPasswordDisplay, setValidPasswordDisplay] = useState("none");
  const [backEndData, setBackendData] = useState("none");

  function toggleAccessDisplays(displayType, displayStatus) {
    if (displayType === "login") {
      if (displayStatus === "none") {
        setSignUpDisplay("none");
        setLoginDisplay("inline");
      }
    } else if (displayType == "signUp") {
      if (displayStatus === "none") {
        setLoginDisplay("none");
        setSignUpDisplay("inline");
      }
    }
  }

  async function submitSignUp() {
    if (signupPasswordOne === signupPasswordTwo) {
      validPassword = signupPasswordTwo;

      const request = {
        email: email,
        password: validPassword,
      };

      // Call the backend server to save the email and password
      const response = await fetch("/signup", {
        method: "POST",
        // adding headers
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error("Something is wrong");
      }

      if (result.userAdded === false) {
        console.log("display reason");
        setValidPasswordDisplay("none");
        setInvalidSignUpMessage(
          result.reason + ". Login or try a different email address."
        );
        setInvalidSignupPasswordDisplay("inline");
      } else {
        console.log("valid new user");
        setInvalidSignupPasswordDisplay("none");
        setValidPasswordDisplay("inline");
        setTimeout(() => {
          navigate("/chat");
        }, 1000);
      }
    } else {
      setInvalidSignUpMessage(
        "Error: The passwords above do not match. Try again."
      );
      setValidPasswordDisplay("none");
      setInvalidSignupPasswordDisplay("inline");
    }
  }

  async function submitLogin() {
    // Call the backend route with the password
    const request = {
      email: email,
      password: password,
    };

    const response = await fetch("/login", {
      method: "POST", // Getting the user if the user provided the username and pasword
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error("HTTP error! Status:" + response.status);
    } else if (result.validLogin === false) {
      setValidLoginPasswordDisplay("none");
      setInvalidLoginPasswordDisplay("inline");
    } else if (result.validLogin === true) {
      setInvalidLoginPasswordDisplay("none");
      setValidLoginPasswordDisplay("inline");

      // Redirects to the chat page
      setTimeout(() => {
        navigate("/chat");
      }, 1000);
    }
  }

  function validatePassword() {
    if (signupPasswordOne === signupPasswordTwo) {
      validPassword = signupPasswordTwo;
    } else {
      setValidPassword("ERROR - PASSWORD DO NOT MATCH");
    }
  }

  return (
    <div
      style={{
        backgroundColor: "#F9EFDC",
        textAlign: "center",
        height: "100%",
      }}
    >
      <LogoIntro />
      <p>
        Yep, we're powered by OpenAI. And nope, bread is not required.
        <br />
        Just login below and lets make something <i>gooood</i>.
      </p>
      <br />
      <Button
        name="loginButton"
        variant="gray"
        style={{
          backgroundColor: "#B86128",
          width: "120px",
          margin: "5px",
          borderColor: "none",
        }}
        onClick={() => toggleAccessDisplays("login", loginDisplay)}
      >
        Login
      </Button>
      <Button
        name="signUpButton"
        variant="gray"
        style={{
          backgroundColor: "tan",
          width: "120px",
          margin: "5px",
          borderColor: "none",
        }}
        onClick={() => toggleAccessDisplays("signUp", signUpDisplay)}
      >
        Sign Up
      </Button>
      <br />

      <div
        name="login"
        style={{
          display: loginDisplay,
          backgroundColor: "#F9EFDC",
          textAlign: "center",
          height: "300px",
        }}
      >
        <br />
        <h4>Login Form</h4>
        <input
          type="text"
          value={email}
          class="form-control-med w-10"
          placeholder="email@domain.com"
          onChange={(e) => setEmail(e.target.value)}
          style={{
            height: "40px",
            borderColor: "tan",
            borderRadius: "10px",
            paddingLeft: "5px",
            fontSize: "13px",
            width: "250px",
          }}
        />
        <br />
        <input
          type="text"
          value={password}
          class="form-control-med w-10"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          style={{
            height: "40px",
            borderColor: "tan",
            borderRadius: "10px",
            paddingLeft: "5px",
            fontSize: "13px",
            width: "250px",
          }}
        />
        <br />
        <Button
          name="loginSubmitButton"
          variant="gray"
          style={{
            backgroundColor: "#CFCFCF",
            width: "130px",
            margin: "5px",
            fontSize: "13px",
            borderColor: "none",
          }}
          onClick={() => submitLogin()}
        >
          Submit Login
        </Button>
        <br />
        <p style={{ display: invalidLoginPasswordDisplay, color: "red" }}>
          Error: The username/password combination is incorrect. Try again.
        </p>
        <p style={{ display: validLoginPasswordDisplay, color: "green" }}>
          Valid Password. You will be redirected.
        </p>
      </div>
      <div
        name="signUp"
        style={{
          display: signUpDisplay,
          backgroundColor: "#F9EFDC",
          textAlign: "center",
          height: "300px",
        }}
      >
        <br />
        <h4>Sign Up Form</h4>
        <input
          type="text"
          value={email}
          class="form-control-med w-10"
          placeholder="email@domain.com"
          onChange={(e) => setEmail(e.target.value)}
          style={{
            height: "40px",
            borderColor: "tan",
            borderRadius: "10px",
            paddingLeft: "5px",
            fontSize: "13px",
            width: "250px",
          }}
        />
        <br />
        <input
          type="text"
          value={signupPasswordOne}
          class="form-control-med w-10"
          placeholder="password"
          onChange={(e) => setsignupPasswordOne(e.target.value)}
          style={{
            height: "40px",
            borderColor: "tan",
            borderRadius: "10px",
            paddingLeft: "5px",
            fontSize: "13px",
            width: "250px",
          }}
        />
        <br />
        <input
          type="text"
          value={validPassword === "" ? signupPasswordTwo : validPassword}
          class="form-control-med w-10"
          placeholder="re-enter password"
          onChange={(e) => setSignupPasswordTwo(e.target.value)}
          style={{
            height: "40px",
            borderColor: "tan",
            borderRadius: "10px",
            paddingLeft: "5px",
            fontSize: "13px",
            width: "250px",
          }}
        />
        <br />
        <Button
          name="signUpButton"
          variant="light gray"
          style={{
            backgroundColor: "#CFCFCF",
            width: "130px",
            fontSize: "13px",
            margin: "5px",
            borderColor: "none",
          }}
          onClick={() => submitSignUp()}
        >
          Submit Sign Up
        </Button>
        <br />
        <p style={{ display: invalidSignupPasswordDisplay, color: "red" }}>
          {invalidSignUpMessage}
        </p>
        <p style={{ display: validPasswordDisplay, color: "green" }}>
          Valid Password
        </p>
      </div>
      <div
        style={{
          backgroundColor: "#F9EFDC",
          textAlign: "center",
          height: "300px",
        }}
      ></div>
    </div>
  );
}

export default LoginPage;
