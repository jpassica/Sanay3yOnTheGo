import db from "../../Config/DB.js";

const getUnreviewedComplaints = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM complaint WHERE reviewer_id IS NULL;");

        // const regorder_query = (await db.query(`SELECT * FROM complaint, order, regularorder 
        // WHERE complaint.order_id = orders.order_id 
        // AND regularorder.order_id = orders.order_id
        // AND reviewer_id IS NULL;`)).rows;

        // const offer_query = (await db.query(`SELECT * FROM complaint, order, offer, isoffer 
        // WHERE complaint.order_id = orders.order_id 
        // AND isoffer.order_id = orders.order_id
        // AND isoffer.offer_id = offer.offer_id
        // AND reviewer_id IS NULL;`)).rows;

        // const bundle_query = (await db.query(`SELECT * FROM complaint, order, bundle, isbundle 
        // WHERE complaint.order_id = orders.order_id 
        // AND isbundle.order_id = orders.order_id
        // AND isbundle.bundle_id = bundle.bundle_id
        // AND reviewer_id IS NULL;`)).rows;

        // const result = [...regorder_query, ...offer_query, ...bundle_query];

        // console.log(result);

        const response = JSON.stringify(result.rows);
        console.log(response);
        res.send(response);
    } catch (error) {
        console.log(error);
    }
}

const complain = async (req, res) => {
    try {
        await db.query("INSERT INTO complaint (content, customer_id, order_id) VALUES ($1, $2, $3);", 
        [req.body.content, req.body.customer_id, req.body.order_id]);

        res.send("Complaint is sent successfully, help is on the way!");
    } catch (error) {
        console.log(error);
        res.send("Could not make complaint!");
    }
}

const showComplaintDetails = async (req, res) => {
    const id = req.params.id;
    let result = {};

    try {
        const order_type = (await db.query(`SELECT order_type FROM orders, complaint 
        WHERE orders.order_id = complaint.order_id
        AND complaint_id = ${id};`)).rows[0].order_type;

        if (order_type == "R")
        {
            result = (await db.query(`SELECT * FROM orders, complaint, regularorder
            WHERE orders.order_id = regularorder.order_id 
            AND complaint.order_id = regularorder.order_id
            AND complaint_id = ${id};`)).rows;
        } else if (order_type == "O")
        {
            result = (await db.query(`SELECT * FROM orders, complaint, offer, isoffer
            WHERE orders.order_id = isoffer.order_id 
            AND complaint.order_id = orders.order_id
            AND offer.offer_id = isoffer.offer_id
            AND complaint_id = ${id};`)).rows;
        } else {
            result = (await db.query(`SELECT * FROM orders, complaint, bundle, isbundle
            WHERE orders.order_id = isbundle.order_id 
            AND complaint.order_id = orders.order_id
            AND bundle.bundle_id = isbundle.bundle_id
            AND complaint_id = ${id};`)).rows;
        }

        console.log(result);
        res.send(JSON.stringify(result));

    } catch (error) {
        console.log(error);
        res.send("Couldn't retrieve complaint details!");
    }
}

const considerComplaint = async (req, res) => {
    try {
        await db.query(`UPDATE complaint SET reviewer_id = ${req.body.admin_id}
        WHERE complaint_id = ${req.body.complaint_id};`);
        res.send("Complaint considered.");
    } catch (error) {
        console.log(error);
        res.send("Couldn't consider complaint!");
    }
}

export { complain, getUnreviewedComplaints, showComplaintDetails, considerComplaint };
