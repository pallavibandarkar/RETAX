import Organization from "../models/organization.js";
import User from "../models/user.js";

export const AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log(user);
    // if (!user) {
    //   return res.status(404).json({ message: "Admin not found" });
    // }
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }
    res.status(200).json({ message: "Admin logged in successfully", user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error Occurred while login" });
  }
};

export const AdminSignup = async (req, res) => {
  const { email, name } = req.body;
  console.log(req.body);
  if (!email || !name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newAdmin = await User.create({
      email,
      name,
      password: "123456",
    });

    await newAdmin.save();
    console.log("New admin created:", newAdmin);
    res.status(201).json({
      message: "Admin created successfully",
      newAdmin,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating admin", error });
  }
};

export const CreateOrganization = async (req, res) => {
  const { name } = req.body;
  const id = req.headers["id"];

  if (!name) {
    return res.status(400).json({ message: "Organization name is required" });
  }
  const org = await Organization.findOne({ name: name });
  if (org) {
    console.log(org);
    return res.status(400).json({ message: "Oraganization already exist!" });
  }

  try {
    const new_organization = await Organization.create({
      name,
      admin: id,
    });
    await new_organization.save();
    const user = await User.findById(id);
    user.organizationId = new_organization._id;
    await user.save();
    res
      .status(201)
      .json({ message: "Organization created successfully", new_organization });
  } catch (error) {
    res.status(500).json({ message: "Error creating organization", error });
  }
};

export const AddUser = async (req, res) => {
  const { email, name, password } = req.body;

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

export const GetAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: "Users retrieved successfully", users });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error });
  }
};
