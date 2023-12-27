import db from "../../Config/DB.js";

const giveFeedback = async (req, res) => {
    try {
        await db.query("INSERT INTO feedback (content, reporter_id) VALUES ($1, $2);", [req.body.content, req.body.customer_id]);
    } catch (error) {
        res.send("Could not record your feedback!");
        console.log(error);
    }
};

const getUnreviewedFeedbacks = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM feedback WHERE reviewer_id IS NULL;");
        const response = JSON.stringify(result.rows);
        console.log(response);
        res.send(response);
    } catch (error) {
        console.log(error);
    }
}


export { giveFeedback, getUnreviewedFeedbacks };