import db from "../Config/DB.js";

const makeNewOrder = async (req, res) => {
    try {
        await db.query("INSERT INTO orders (order_type, customer_id)"+ 
        "VALUES ($1, $2)", [req.body.type, req.body.customer_id]);

        const newOrder = (await db.query("SELECT currval('orders_order_id_seq');")).rows[0].currval;

        return newOrder;
    } catch (error) {
        console.log(error);
        return res.send("Couldn't make new order!");
    }
};

export default makeNewOrder;