import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import db from "./Config/DB.js";

const app = express();
const port = 3001;

import userRoute from "./Routes/User.js";
import orderRoute from "./Routes/Order.js";
import serviceRoute from "./Routes/Minor/Service.js";
import feedbackRoute from "./Routes/Minor/Feedback.js";
import complaintRoute from "./Routes/Minor/Complaint.js";
import offerRoute from "./Routes/Minor/Offer.js";
import rewardRoute from "./Routes/Minor/Reward.js";
import bundleRoute from "./Routes/Minor/Bundles.js";

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


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from all origins (not recommended for production)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Define the HTTP methods allowed
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Define the allowed headers
    next();
});


app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
});

// Win a Reward
app.post("/CustomerProfile/Reward", async (req, res) => {
    const c_id = req.body.c_id;
    const prcntg = req.body.percentage; // this of course is not determined this way

    try{
        await db.query("INSERT INTO reward (customer_id, percentage) VALUES ($1, $2);", [c_id, prcntg]);
        res.send("Congrats! You have won this reward!");
    } catch (error) {
        res.send("Could not win reward!");
        console.log(error);
    }
});

