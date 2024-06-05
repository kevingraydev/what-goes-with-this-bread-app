import logo from "../../logo.svg";
import "../../App.css";
import { useState } from "react";
import { Container, Button, Alert } from "react-bootstrap";

// I want to ahve sign-up and sign in buttons
// Clicking Sign Up will review the Sign Up will will post
// Clicking Sign In will review do a get request, and if the get is ok, the next action will be a redirection
// Or Maybe it wont be a redirect, but the hidden div with the functionalty to use the app will go away
// Then I want to create a side bar that  Or just a buttont hat say old recipes.

export const PrimaryBackground = () => {
  <div
    className="background"
    style={{
      backgroundColor: "#F9EFDC",
      minHeight: "100hv",
      textAlign: "center",
    }}
  ></div>;
};

export const LogoIntro = () => {
  return (
    <div
      className="background"
      style={{
        backgroundColor: "#F9EFDC",
        textAlign: "center",
      }}
    >
      {}

      {/* <h1> What Goes With This Bread?</h1> */}
      <br />
      <img
        src="logo-what-goes-with-this-bread.png"
        alt="logo"
        style={{ width: 350, height: "auto" }}
      />
      <br />
      <br />
      <p style={{ marginBotton: "10px" }}>
        Got random food items in your kitchen, but don't know what to make?
        <br />
        Use <strong>What Gos With This Bread?</strong> to turn any ingredients
        <br />
        you have laying around the kitchen into a quick, delicious meal.
        <br />
        <br />
      </p>
    </div>
  );
};
