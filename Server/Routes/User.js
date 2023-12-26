import express from "express";
import bodyParser from "body-parser";
const router = express.Router();
import * as userController from "../Controllers/UserController.js";
router.use(bodyParser.urlencoded({ extended: true }));

router.route('/')
    .get()
    .post(userController.createNewUser)
    .put()
    .patch()
    .delete()

router.route('/SignIn')
    .post(userController.signInUser)


export default router;