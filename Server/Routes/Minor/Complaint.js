import express from "express";
import bodyParser from "body-parser";
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

import * as complaintController from "../../Controllers/Minor/ComplaintController.js";

router.route('/')
    .get()
    .post(complaintController.complain)
    .put()
    .patch(complaintController.considerComplaint)
    .delete()

router.route('/free')
    .get(complaintController.getUnreviewedComplaints)

router.route('/:id')
    .get(complaintController.showComplaintDetails)


export default router;