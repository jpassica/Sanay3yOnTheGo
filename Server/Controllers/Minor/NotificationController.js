import db from "../../Config/DB.js";

const getUserNotifications = async (req, res) => {
    const id = req.params.id; // notified id
    try {
        const result = (await db.query(`SELECT * FROM notification WHERE notified_id = ${id};`)).rows;
        console.log(result);
        res.send(JSON.stringify(result));
    } catch (error) {
        console.log(error);
        res.send("Couldn't retrieve notifications!");
    }
};

const notifyUser = async (req, res) => {
    try {
        await db.query(`INSERT INTO notification (content, notified_id, order_id) VALUES ($1, $2, $3);`,
            [req.body.content, req.body.customer_id, req.body.order_id]);

        res.send("Notified user.");
    } catch (error) {
        console.log(error);
        res.send("Couldn't send in notification!");
    }
};

export { getUserNotifications, notifyUser };