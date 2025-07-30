import React, { use } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center gap-4 mt-4">
      <button
        className="bg-green-400 text-white p-2 font-semibold rounded-lg"
        onClick={() => navigate(`/createOrg/${id}`)}
      >
        Create Orgnization
      </button>
      <button
        className="bg-green-400 text-white p-2 font-semibold rounded-lg"
        onClick={() => navigate(`/createTeam/${id}`)}
      >
        Create Team
      </button>
    </div>
  );
};

export default Dashboard;
