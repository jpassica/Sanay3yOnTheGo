import express from "express";
import bodyParser from "body-parser";
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

import * as serviceController from "../../Controllers/Minor/ServiceController.js";

router.route('/')
    .get(serviceController.getServiceCategories)
    .post(serviceController.addServiceCategory)
    .put()
    .patch()
    .delete()

export default router;