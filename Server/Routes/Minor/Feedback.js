import express from "express";
import bodyParser from "body-parser";
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

import * as feedbackController from "../../Controllers/Minor/FeedbackController.js";

router.route('/')
    .get(feedbackController.countFeedbacks)
    .post(feedbackController.giveFeedback)
    .put()
    .patch(feedbackController.considerFeedback)
    .delete()

router.route('/free')
    .get(feedbackController.getUnreviewedFeedbacks)


export default router;