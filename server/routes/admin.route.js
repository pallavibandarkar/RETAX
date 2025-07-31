import express from "express";
import {
  AddUser,
  AdminLogin,
  AdminSignup,
  CreateOrganization,
  deleteOrganisation,
  GetAllOrganizations,
  GetAllTeamSpaces,
  GetAllUsers,
  getOrganization,
} from "../controllers/admin.controller.js";
import Auth from "../middleware/Auth.js";

const router = express.Router();

router.post("/admin/login", AdminLogin);
router.post("/admin/signup", AdminSignup);
router.post("/admin/create-organization", Auth, CreateOrganization);
router.post("/admin/add-user", Auth, AddUser);

router.get("/admin/all-users", Auth, GetAllUsers);
router.get("/admin/getOrganization", Auth, getOrganization);
router.get("/admin/all-organizations", Auth, GetAllOrganizations);
router.get("/admin/all-TeamSpaces", Auth, GetAllTeamSpaces);

router.delete("/admin/deleteOrganisation/:orgId", Auth, deleteOrganisation);

export default router;
