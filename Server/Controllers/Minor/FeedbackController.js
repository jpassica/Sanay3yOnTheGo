import db from "../../Config/DB.js";

const giveFeedback = async (req, res) => {
    try {
        await db.query("INSERT INTO feedback (content, reporter_id) VALUES ($1, $2);", [req.body.content, req.body.customer_id]);

        // await db.query(`CALL InsertFeedback('${req.body.content}', ${req.body.customer_id});`);
        res.send("Feedback recorded!");
    } catch (error) {
        res.send("Could not record your feedback!");
        console.log(error);
    }
};

const countFeedbacks = async (req, res) => {
    try {
        const result = await db.query("SELECT COUNT(*) FROM feedback WHERE reviewer_id IS NULL;");
        const response = JSON.stringify(result.rows[0]);
        console.log(result);
        res.send(response);
    }
    catch (error) {
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
};

const considerFeedback = async (req, res) => {
    try {
        await db.query(`UPDATE feedback SET reviewer_id = ${req.body.adminId}
        WHERE feedback_id = ${req.body.feedbackId};`);
        res.send ("Feedback considered!");
    } catch (error) {
        console.log(error);
        res.send("Couldn't consider feedback!");
    }
};


export { giveFeedback, getUnreviewedFeedbacks, considerFeedback,countFeedbacks };