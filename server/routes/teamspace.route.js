import express from 'express';
import { AddMembers, createTeamSpace } from '../controllers/teamspace.controller.js';

const router = express.Router();

router.post('/teamspace/create', createTeamSpace);
router.post('/teamspace/add-members', AddMembers);


export default router;