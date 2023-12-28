import db from "../Config/DB.js";

const makeNewOrder = async (req, res) => {
    try {
        await db.query("INSERT INTO orders (order_type, customer_id, order_exec_date)"+ 
        "VALUES ($1, $2, $3)", [req.body.type, req.body.customer_id, req.body.order_exec_date]);

        const newOrder = (await db.query("SELECT currval('orders_order_id_seq');")).rows[0].currval;

        return newOrder;
    } catch (error) {
        console.log(error);
        return res.send("Couldn't make new order!");
    }
};

export default makeNewOrder;