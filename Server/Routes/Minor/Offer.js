import express from "express";
import bodyParser from "body-parser";
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

import * as offerController from "../../Controllers/Minor/OfferController.js";

router.route('/')
    .get()
    .post(offerController.createOffer)
    .put()
    .patch()
    .delete()

router.route('/:id')
    .post(offerController.buyOffer)
    .delete(offerController.deleteOffer)

router.route('/tech/:id')
    .get(offerController.getTechOffers)

export default router;