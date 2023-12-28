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

router.route('/:id')
    .get(userController.getUserDetails)
    .patch(userController.updateUserDetails)
    .delete(userController.banUser)

router.route('/SignIn')
    .post(userController.signInUser)

router.route('/all/Areas')
    .get(userController.getUserAreas)

router.route('/Tech/:id')
    .get()
    .post()
    .put()
    .patch()
    .delete()

router.route('/All/Techs')
    .get(userController.getAllTechs)

router.route('/TechsNearby')
    .post(userController.getNearbyTechs)


export default router;