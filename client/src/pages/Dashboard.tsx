import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface TeamType {
  _id: string;
  name: string;
  createdBy: string;
  createdAt: string;
  users: Array<any>;
}
interface OrganizationType {
  _id: string;
  name: string;
  createdAt: string;
  isActive: boolean;
  admin: {
    name: string;
    email: string;
  };
  teams: Array<TeamType>;
}

const Dashboard: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [organization, setOrganization] = useState<OrganizationType | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          "http://localhost:3000/api/admin/getOrganization",
          {
            withCredentials: true,
          }
        );

        const org = result.data.organization;
        if (org) {
          setOrganization({
            _id: org._id,
            name: org.name,
            createdAt: org.createdAt,
            isActive: org.isActive,
            admin: {
              name: org.admin.name,
              email: org.admin.email,
            },
            teams: org.teamSpaces,
          });
        }
      } catch (error) {
        console.error("Failed to fetch organization:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading...</p>
      ) : organization ? (
        <div className="mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <h2 className="text-3xl font-bold text-center text-green-700">
              Organization Details
            </h2>

            <div className="text-gray-700 space-y-2">
              <p>
                <span className="font-semibold">Organization ID:</span>{" "}
                {organization._id}
              </p>
              <p>
                <span className="font-semibold">Organization Name:</span>{" "}
                {organization.name}
              </p>

              <p>
                <span className="font-semibold">Admin Name:</span>{" "}
                {organization.admin.name}
              </p>
              <p>
                <span className="font-semibold">Admin Email:</span>{" "}
                {organization.admin.email}
              </p>
            </div>

            <div className="flex justify-center mt-6">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition"
                onClick={() => navigate(`/createTeam/${id}`)}
              >
                Create Team
              </button>
            </div>
          </div>

          <div className="my-10 border-t border-gray-300"></div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Teams
            </h2>

            {organization?.teams?.length === 0 ? (
              <p className="text-center text-gray-600">No teams found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {organization.teams.map((team) => (
                  <div
                    key={team._id}
                    className="bg-white border border-gray-200 rounded-xl p-5 shadow hover:shadow-md transition duration-200"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {team.name}
                    </h3>
                    <p className="text-sm text-gray-600">Team ID: {team._id}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center mt-10 text-red-600">
          No organization found.
        </div>
      )}
    </div>
  );
};

export default Dashboard;
