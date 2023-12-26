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


// Using routes
app.use("/user", userRoute);
app.use("/order", orderRoute);
app.use("/service", serviceRoute);
app.use("/feedback", feedbackRoute);
app.use("/complaint", complaintRoute);

 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin: '*'}));


app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
});

// Show techs in area by service 
app.get("/Orders/Available", async (req, res) => {
    const customerCity = req.body.city; //how to figure this out?
    const service = req.body.service;
    const result = await db.query(`SELECT fullname, name, rating FROM client, technician, service
        WHERE address = '${customerCity}' AND technician.service_id = service.service_id
        AND tech_id = client_id AND name = '${service}'`);
    res.send(result.rows);
    console.log(req.body);
    console.log(resut.rows);
});

// Show Past Orders 
app.get("/Orders/Past", async (req, res) => {
    const c_id = req.body["c_id"]; 
    const result = await db.query(`SELECT order_timestamp, name FROM order, consistof, service WHERE customer_id = ${c_id}
        AND consistof.service_id = service.service_id AND order.order_id = consistof.order_id
        AND order_status = 'FINISHED';`);
    res.send(result.rows);
}); 

// Show Pending Orders 
app.get("/Orders/Pending", async (req, res) => {
    const c_id = req.body["c_id"]; 
    const result = await db.query(`SELECT order_timestamp, name FROM service, consistof, order WHERE customer_id = ${c_id}
        AND consistof.service_id = service.service_id AND order.order_id = consistof.order_id
        AND order_status = 'PENDING';`);
    res.send(result.rows);
}); 

// Review an order
app.post("/Orders/Review", async (req, res) => {
    const s_id = req.body.s_id;
    const c_id = (await db.query("SELECT customer_id FROM orders WHERE order_id = $1;", [s_id])).rows[0].customer_id;

    // Customer can only make one review about each order
    if ((await db.query("SELECT * FROM review WHERE order_id = $1 AND customer_id = $2;", [s_id, c_id])).rowCount != 0 )
    {
        return res.send("You have already reviewed this order, you cannot review it again.");
    }

    try {
        await db.query("INSERT INTO review (rating, order_id, customer_id, content) VALUES ($1, $2, $3, $4);", 
        [req.body.rating, s_id, c_id, req.body.content]);
        res.send("Review posted successfully!");
    } catch (error) {
        res.send("Could not post review!");
        console.log(error);
    }
        
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

// tech makes new offer
app.post("/offers/new", async (req, res) => {
   const t_id = req.body.t_id;
   
   try{
        await db.query("INSERT INTO offer (content, price, expiry_date, tech_id) VALUES ($1, $2, $3, $4);",
        [req.body.content, req.body.price, req.body.expiry_date, t_id]);
        res.send("Offer created successfully!");
   } catch (error) {
    res.send("Could not create your offer!");
    console.log(error);
    }
});

// customer buys offer 
app.post("/offers", async (req, res) =>
{
    const c_id = req.body.c_id;

    try{
        await db.query("INSERT INTO order () VALUES");
        res.send("Offer created successfully!");
    } catch (error) {
        res.send("Could not create your offer!");
        console.log(error);
    }
});