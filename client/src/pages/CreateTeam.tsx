import React from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface IState {
  teamName: string;
}

const CreateTeam: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<IState>({
    teamName: "",
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
        "http://localhost:3000/api/teamspace/create",
        { name: data.teamName, adminId: id },{
          withCredentials:true
        }
      );

      console.log(res.data);
      toast.success(res.data.message);
      setData({
        teamName: "",
      });
    } catch (err) {
      console.log(err);
      toast.error("Error Occurred");
    }
    navigate(`/dashboard/${id}`);
  };
  return (
    <div className="bg-slate-100 m-auto mt-10 w-1/2 p-10 rounded-xl">
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <label htmlFor="teamname" className="p-2">
          Team Name:
        </label>
        <input
          className="p-1"
          id="teamname"
          name="teamName"
          placeholder="team name"
          onChange={handleChange}
          value={data.teamName}
          required
        />
        <button className="bg-blue-500 text-white mt-5 p-2 rounded-md">
          Create Team
        </button>
      </form>
    </div>
  );
};

export default CreateTeam;
