import express from "express";
import bodyParser from "body-parser";
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

import * as notificationController from "../../Controllers/Minor/NotificationController.js";

router.route('/')
    .get()
    .post()
    .put()
    .patch()
    .delete()

router.route('/:id')
    .get(notificationController.getUserNotifications)


export default router;  