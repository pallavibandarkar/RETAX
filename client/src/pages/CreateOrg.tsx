import React from "react";
import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface IState {
  orgName: string;
}

const CreateOrganization: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<IState>({
    orgName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(data);
    console.log(id);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/admin/create-organization",
        { name: data.orgName, adminId: id }
      );

      console.log(res.data);
      toast.success(res.data.message);
      setData({
        orgName: "",
      });
      navigate(`/dashboard/${id}`);
    } catch (err) {
      console.log(err);
      toast.error("Error Occurred");
    }
  };
  return (
    <div className="bg-slate-100 m-auto mt-10 w-1/2 p-10 rounded-xl">
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <label htmlFor="orgname" className="p-2">
          Organization Name:
        </label>
        <input
          className="p-1"
          id="orgname"
          name="orgName"
          placeholder="organization name"
          onChange={handleChange}
          value={data.orgName}
          required
        />
        <button className="bg-blue-500 text-white mt-5 p-2 rounded-md">
          Create Organization
        </button>
      </form>
    </div>
  );
};

export default CreateOrganization;
