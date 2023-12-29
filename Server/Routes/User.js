import express from "express";
import bodyParser from "body-parser";
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

import * as userController from "../Controllers/UserController.js";

router.route('/')
    .get()
    .post(userController.createNewUser)
    .put()
    .patch()
    .delete()

router.route('/:id')
    .get(userController.getUserDetails)
    .patch(userController.updateUserDetails)
    .delete(userController.deleteUser)

router.route('/SignIn')
    .post(userController.signInUser)


router.route('/all/Areas')
    .get(userController.getUserAreas)

router.route('/Admin')
    .post(userController.addAdmin)

router.route('/All/Techs')
    .get(userController.getAllTechs)

router.route('/TechsNearby')
    .post(userController.getNearbyTechs)


export default router;