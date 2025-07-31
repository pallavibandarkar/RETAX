import express from 'express';
import { AddMembers, createTeamSpace, deleteTeamSpace } from '../controllers/teamspace.controller.js';

const router = express.Router();

router.post('/teamspace/create', createTeamSpace);
router.post('/teamspace/add-members', AddMembers);

router.delete('/teamspace/deleteTeamspace/:teamspaceId',deleteTeamSpace)


export default router;