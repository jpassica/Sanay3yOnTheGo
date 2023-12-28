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
export { getUserNotifications };