import db from "../Config/DB.js";

const makeNewOrder = async (req, res) => {
    const customer = req.body.customer_id;
    const tech = req.body.tech_id;
    const type = req.body.type;

    try {
        await db.query("INSERT INTO orders (order_type, customer_id)"+ 
        "VALUES ($1, $2)", [type, customer]);

        const newOrder = (await db.query("SELECT currval('orders_order_id_seq');")).rows[0].currval;

        if (type == 'R') // if it is a regular order
            await db.query("INSERT INTO regularorder VALUES ($1, $2, $3, $4, $5);", [newOrder, req.body.header, 
                req.body.description, tech, req.body.price]);

        res.send("Order created succesfully!");
    }
    catch (error) {
        res.send("couldn't create order!");
        console.log(error);
    }
};

//getOrdersByStatus = async (req, res) => {

//}


export { makeNewOrder };