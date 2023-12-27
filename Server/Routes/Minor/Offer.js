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
    .get(offerController.getTechOffers)
    .delete(offerController.deleteOffer)

export default router;