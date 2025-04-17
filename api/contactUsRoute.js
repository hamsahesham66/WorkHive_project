import * as contactUsService from '../services/contactUsService.js';
import express from 'express';
const router = express.Router();    

router.route('/').post(contactUsService.createContactUs);

export default router;
