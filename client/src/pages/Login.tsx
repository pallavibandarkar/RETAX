import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
type DecodedToken = {
  email: string;
  name: string;
  picture: string;
  sub: string;
};

export default function Login() {
  const navigate = useNavigate();
  const handleLogin = async (credentialResponse: CredentialResponse) => {
    const decoded = jwtDecode<DecodedToken>(
      credentialResponse.credential || ""
    );

    const { email } = decoded;
    try {
      const res = await fetch("http://localhost:3000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password: "123456" }),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return;
      }
      toast.success("Logged in Successfully!!");
      console.log("Log in Success:", email);
      setTimeout(() => navigate(`/dashboard/${data.user._id}`), 4000);
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  const handleError = () => {
    toast.error("Failed to Login");
    console.error("Login Failed");
  };

  return (
    <div className="flex flex-col p-12 w-1/2 m-auto mt-10 bg-gray-200 text-center px-4 rounded-2xl">
      <h1 className="text-4xl font-bold mb-4">Login</h1>
      <p className="text-lg text-gray-600 mb-6">
        Use your Google account to Log in.
      </p>
      <div className="w-1/2 m-auto">
        <GoogleLogin onSuccess={handleLogin} onError={handleError} />
      </div>
    </div>
  );
}
