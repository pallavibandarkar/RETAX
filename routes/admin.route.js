import express from 'express';
import { AddUser, AdminLogin, CreateOrganization } from '../controllers/admin.controller.js';

const router = express.Router();

router.post('/admin/login', AdminLogin)
router.post('/admin/create-organization', CreateOrganization);
router.post('/admin/add-user', AddUser);

export default router;