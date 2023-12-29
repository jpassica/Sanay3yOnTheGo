import db from "../../Config/DB.js";

const getUnreviewedComplaints = async (req, res) => {
    try {
        //const result = await db.query("SELECT * FROM complaint WHERE reviewer_id IS NULL;");

        const regorder_result = (await db.query(`SELECT * FROM complaint, order, regularorder 
        WHERE comaplaint.order_id = orders.order_id 
        AND regularorder.order_id = orders.order_id
        AND reviewer_id IS NULL;`)).rows;

        //const response = JSON.stringify(result.rows);
        //console.log(response);
        //res.send(response);
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

export { complain, getUnreviewedComplaints };
