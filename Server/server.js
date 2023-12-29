import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./Config/DB.js";


import userRoute from "./Routes/User.js";
import orderRoute from "./Routes/Order.js";
import serviceRoute from "./Routes/Minor/Service.js";
import feedbackRoute from "./Routes/Minor/Feedback.js";
import complaintRoute from "./Routes/Minor/Complaint.js";
import offerRoute from "./Routes/Minor/Offer.js";
import rewardRoute from "./Routes/Minor/Reward.js";
import bundleRoute from "./Routes/Minor/Bundles.js";
import notifRoute from "./Routes/Minor/Notification.js";

const app = express();
const port = 3001;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin: '*'}));

// Using routes
app.use("/user", userRoute);
app.use("/order", orderRoute);
app.use("/service", serviceRoute);
app.use("/feedback", feedbackRoute);
app.use("/complaint", complaintRoute);
app.use("/offer", offerRoute);
app.use("/reward", rewardRoute);
app.use("/bundle", bundleRoute);
app.use("/notification", notifRoute);


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from all origins (not recommended for production)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Define the HTTP methods allowed
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Define the allowed headers
    next();
});


app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
});

