import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import React from "react";

type DecodedToken = {
  email: string;
  name: string;
  picture: string;
  sub: string;
};

export default function Home() {
  const handleLogin = async (credentialResponse: CredentialResponse) => {
    const decoded = jwtDecode<DecodedToken>(
      credentialResponse.credential || ""
    );

    const { name, email } = decoded;

    const password = "defaultPassword";

    await fetch("http://localhost:3000/api/admin/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ name: name, email, password }),
    });

    console.log("Signup Success:", email);
  };

  const handleError = () => {
    console.error("Signup Failed");
  };

  return (
    <div>
      <h1>Google Sign In</h1>
      <p>Sign in with your Google account to continue.</p>
      <GoogleLogin onSuccess={handleLogin} onError={handleError} />
    </div>
  );
}
