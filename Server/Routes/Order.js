import express from "express";
import bodyParser from "body-parser";
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

import * as orderController from "../Controllers/OrderController.js";

router.route('/')
    .get()
    .post(orderController.makeRegOrder)
    .put()
    .patch()
    .delete()

router.route('/:id')
    .get(orderController.getOrderByID)
    .post()
    .put()
    .patch(orderController.updateOrderStatus)
    .delete(orderController.deleteOrder)

router.route('/tech/:id')
    .get(orderController.getTechOrders)

router.route('/review')
    .get()
    .post(orderController.makeReview)
    .put()
    .patch()
    .delete()

router.route('/review/:id')
    .get(orderController.getReviewByOrderID)

router.route('/review/tech/:id')
    .get(orderController.getReviewsByTechID)

export default router;