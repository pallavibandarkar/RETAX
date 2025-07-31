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

const router = express.Router();

router.post("/admin/login", AdminLogin);
router.post("/admin/signup", AdminSignup);
router.post("/admin/create-organization", CreateOrganization);
router.post("/admin/add-user", AddUser);

router.get("/admin/all-users", GetAllUsers);
router.get("/admin/all-organizations", GetAllOrganizations);
router.get("/admin/organization/:id", getOrganization);
router.get("/admin/all-TeamSpaces", GetAllTeamSpaces);

router.delete("/admin/deleteOrganisation/:orgId", deleteOrganisation);

export default router;

// import express from "express";
// import {
//   AddUser,
//   AdminLogin,
//   AdminSignup,
//   CreateOrganization,
//   GetAllUsers,
// } from "../controllers/admin.controller.js";

// const router = express.Router();

// router.post("/admin/login", AdminLogin);
// router.post("/admin/signup", AdminSignup);
// router.post("/admin/create-organization", CreateOrganization);
// router.post("/admin/add-user", AddUser);
// router.get("/admin/all-users", GetAllUsers);

// export default router;
