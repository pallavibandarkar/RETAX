import Organization from "../models/organization.js";
import TeamSpace from "../models/teamSpace.js";
import User from "../models/user.js";
import mongoose from "mongoose";

export const createTeamSpace = async (req, res) => {
  const { name, adminId } = req.body;
  const id = req.user._id;
  try {
    if (!name) {
      return res.status(400).json({ message: "TeamSpace name is required" });
    }

    const newTeamSpace = new TeamSpace({
      name,
      createdBy: adminId,
    });
    const savedTeamSpace = await newTeamSpace.save();

    const TeamId = savedTeamSpace._id;

    const updateOrg = await Organization.findOne({ admin: adminId });

    console.log(updateOrg);

    if (!updateOrg) {
      return res.status(404).json({ message: "Organization not found" });
    }

    updateOrg.teamSpaces.push(TeamId);
    await updateOrg.save();

    const adminUser = await User.findById(adminId);
    if (!adminUser) {
      return res.status(404).json({ message: "Admin user not found", id });
    }
    adminUser.teams.push(TeamId);
    await adminUser.save();

    res.status(201).json({
      message: "TeamSpace created successfully",
      teamSpace: savedTeamSpace,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating TeamSpace", error });
  }
};

export const AddMembers = async (req, res) => {
  const { teamSpaceId, userId } = req.body;
  const id = req.user._id;
  try {
    const teamSpace = await TeamSpace.findById(teamSpaceId);
    if (!teamSpace) {
      return res.status(404).json({ message: "TeamSpace not found" });
    }

    const members = await User.find({ _id: userId });
    console.log(members);

    if (members.length === 0) {
      return res.status(404).json({ message: "No members found" });
    }

    const newMembers = members.filter(
      (member) => !teamSpace.users.includes(member._id)
    );
    if (newMembers.length === 0) {
      return res.status(400).json({
        message: "All members are already part of this TeamSpace",
        id,
      });
    }

    teamSpace.users.push(...newMembers.map((member) => member._id));
    await teamSpace.save();

    res.status(200).json({
      message: "Members added successfully",
      teamSpace,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding members", error });
  }
};

export const deleteTeamSpace = async (req, res) => {
  const { teamspaceId } = req.params;
  const id = req.user._id;
  console.log(req.params);
  try {
    const Delete_Id = await TeamSpace.findById(teamspaceId);
    if (!Delete_Id) {
      return res.status(404).json({ message: "TeamSpace not found", id });
    }
    await TeamSpace.findByIdAndDelete(teamspaceId);
  } catch (error) {
    return res.status(500).json({ message: "Error deleting TeamSpace", error });
  }
  res.status(200).json({ message: "TeamSpace deleted successfully" });
};
