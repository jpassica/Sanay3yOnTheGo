import express from "express";
import bodyParser from "body-parser";
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

import * as bundlesController from "../../Controllers/Minor/BundlesController.js";

router.route('/')
    .get()
    .post(bundlesController.createBundle)
    .put()
    .patch()
    .delete()

router.route('/:id')
    .post(bundlesController.buyBundle)


export default router;