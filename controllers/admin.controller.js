import Organization from "../models/organization.js";
import User from "../models/user.js";

export const AdminLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, role: "admin" });
  if (!user) {
    return res.status(404).json({ message: "Admin not found" });
  }
  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid password" });
  }
  res.status(200).json({ message: "Admin logged in successfully", user });
};

export const CreateOrganization = async (req, res) => {
  const { name } = req.body;
  const id = req.headers["id"]; 

  if (!name) {
    return res.status(400).json({ message: "Organization name is required" });
  }

  try {
    const new_organization = await Organization.create({
      name,
      admins: [id],
    });
    await new_organization.save();

    res
      .status(201)
      .json({ message: "Organization created successfully", new_organization });
  } catch (error) {
    res.status(500).json({ message: "Error creating organization", error });
  }
};

export const AddUser = async (req, res) => {
  const { email, name, password, role, teamSpaceId, isActive } = req.body;

  if (!email || !name || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newMember = await User.create({
      email,
      name,
      password,
      role,
      teamSpaceId,
    });

    await newMember.save();
    console.log("New user created:", newMember);
    res.status(201).json({
      message: "User added successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding user", error });
  }
};
