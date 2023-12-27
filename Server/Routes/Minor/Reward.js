import express from "express";
import bodyParser from "body-parser";
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

import * as rewardController from "../../Controllers/Minor/RewardController.js";

router.route('/')
    .get()
    .post()
    .put()
    .patch()
    .delete()

router.route('/PointSystem')
    .get(rewardController.getPointSystemDetails)

export default router;