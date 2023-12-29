import express from "express";
import bodyParser from "body-parser";
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

import * as complaintController from "../../Controllers/Minor/ComplaintController.js";

router.route('/')
    .get()
    .post(complaintController.complain)
    .put()
    .patch()
    .delete()

router.route('/free')
    .get(complaintController.getUnreviewedComplaints)

export default router;