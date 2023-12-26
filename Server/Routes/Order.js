import express from "express";
import bodyParser from "body-parser";
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

import * as orderController from "../Controllers/OrderController.js";

router.route('/')
    .get()
    .post(orderController.makeNewOrder)
    .put()
    .patch()
    .delete()

router.route('/:status')
    .get()
    .post()
    .put()
    .patch()
    .delete()


export default router;