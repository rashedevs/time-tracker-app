import React, { useState } from "react";
import Dashboard from "../Dashboard/Dashboard";
import * as Components from "./Components";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../../firebase.init";
import { useNavigate } from "react-router-dom";

const auth = getAuth(app);

const Login = () => {
  const navigate = useNavigate();
  const [signIn, setSignIn] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "name") setName(value);
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((value) => {
        console.log(value);
        setSignIn(!signIn);
      })
      .catch((error) => {
        console.error("Error signing up:", error);
      });
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed in:", user);
        //will navigate to home page later
        navigate("/Dashboard");
        // setSignIn(!signIn);
      })
      .catch((error) => {
        console.error("Error signing in:", error);
      });
  };

  return (
    <Components.Container>
      <Components.SignUpContainer signinIn={signIn}>
        <Components.Form>
          <Components.Title>Create Account</Components.Title>
          <Components.Input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            required
            onChange={handleInputChange}
          />
          <Components.Input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={handleInputChange}
          />
          <Components.Input
            type="password"
            name="password"
            required
            placeholder="Password"
            value={password}
            onChange={handleInputChange}
          />
          <Components.Button onClick={handleSignUp}>Sign Up</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>

      <Components.SignInContainer signinIn={signIn}>
        <Components.Form>
          <Components.Title>Sign in</Components.Title>
          <Components.Input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleInputChange}
          />
          <Components.Input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleInputChange}
          />
          <Components.Anchor href="#">Forgot your password?</Components.Anchor>
          <Components.Button onClick={handleSignIn}>Sign In</Components.Button>
        </Components.Form>
      </Components.SignInContainer>

      <Components.OverlayContainer signinIn={signIn}>
        <Components.Overlay signinIn={signIn}>
          <Components.LeftOverlayPanel signinIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              To keep connected with us please login with your personal info
            </Components.Paragraph>
            <Components.GhostButton onClick={() => setSignIn(!signIn)}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>

          <Components.RightOverlayPanel signinIn={signIn}>
            <Components.Title>New Here!</Components.Title>
            <Components.Paragraph>
              Enter Your personal details and start journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => setSignIn(!signIn)}>
              Register
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
};

export default Login;
