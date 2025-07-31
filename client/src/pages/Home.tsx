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

export default function Home() {
  const navigate = useNavigate();
  const handleSignup = async (credentialResponse: CredentialResponse) => {
    const decoded = jwtDecode<DecodedToken>(
      credentialResponse.credential || ""
    );

    try {
      const { name, email } = decoded;
      const res = await fetch("http://localhost:3000/api/admin/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name: name, email }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return;
      }
      toast.success("Signed Up Successfully!!");
      console.log("Signup Success:", email);
      console.log("User respose data : ", data);
      console.log(data.newAdmin.role);
      if (!data.newAdmin.role || data.newAdmin.role === "undefined") {
        setTimeout(() => {
          navigate(`/createOrg/${data.newAdmin._id}`);
        }, 3000);
      } else {
        navigate(`/dashboard/${data.newAdmin._id}`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to signed up");
    }
  };

  const handleError = () => {
    console.error("Signup Failed");
  };

  return (
    <div className="flex flex-col p-12 w-1/2 m-auto mt-10 bg-gray-200 text-center px-4 rounded-2xl">
      <h1 className="text-4xl font-bold mb-4">Google Sign In</h1>
      <p className="text-lg text-gray-600 mb-6">
        Sign in with your Google account to continue.
      </p>
      <div className="w-1/2 m-auto">
        <GoogleLogin onSuccess={handleSignup} onError={handleError} />
      </div>
    </div>
  );
}
