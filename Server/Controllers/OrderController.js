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

// support type results
const getTechOrders = async (req, res) => {
    const id = req.params.id;

    try {
        let result = [];

        const regorder_query = (await db.query(`SELECT * FROM orders, regularorder
            WHERE orders.order_id = regularorder.order_id 
            AND tech_id = ${id};`)).rows;
        
        result = [...regorder_query];

        const offer_query = (await db.query(`SELECT * FROM orders, offer, isoffer
        WHERE orders.order_id = isoffer.order_id 
        AND isoffer.offer_id = offer.offer_id
        AND offer.tech_id = ${id};`)).rows;

        result = [...result, ...offer_query];

        const bundle_query = (await db.query(`SELECT * FROM orders, bundle, isbundle, consistof
        WHERE orders.order_id = isbundle.order_id
        AND isbundle.bundle_id = bundle.bundle_id
        AND bundle.bundle_id = consistof.bundle_id
        AND consistof.tech_id = ${id};`)).rows;

        result = [...result, ...bundle_query];

        console.log(result);
        res.send(JSON.stringify(result));
        
    } catch (error) {
        console.log(error);
        res.send("couldn't retrieve orders");
    }
};

// make sure all type results work
const getOrderByID = async (req, res) => {
    const id = req.params.id;

    try {
        const main_result = (await db.query(`SELECT * FROM orders WHERE order_id = ${id};`)).rows[0];

        if (main_result.order_type == "R")
        {
            const type_result = (await db.query(`SELECT * FROM regularorder where order_id = ${id};`)).rows[0];

            const result = {...main_result, ...type_result};
            console.log(result);
            res.send(JSON.stringify(result));
        } else if (main_result.order_type == "B") 
        {
            const bundle_id = (await db.query(`SELECT bundle_id FROM isbundle WHERE order_id = ${id};`)).rows[0].bundle_id;

            const type_result = (await db.query(`SELECT * FROM bundle where bundle_id = ${bundle_id};`)).rows[0];

            const result = {...main_result, ...type_result};
            console.log(result);
            res.send(JSON.stringify(result));
        } else { // type = offer
            const offer_id = (await db.query(`SELECT offer_id FROM isoffer WHERE order_id = ${id};`)).rows[0].offer_id;

            const type_result = (await db.query(`SELECT * FROM offer where offer_id = ${offer_id};`)).rows[0];

            const result = {...main_result, ...type_result};
            console.log(result);
            res.send(JSON.stringify(result));
        }
    } catch (error) {
        console.log(error);
        res.send("couldn't retrieve order");
    }
};

const updateOrderStatus = async (req, res) => {
    const order_id = req.params.id;
    const status = req.query.status;

    try {
        await db.query(`UPDATE orders SET order_status = '${status}' WHERE order_id = ${order_id};`);
        res.send("successfully updated order status!");
    } catch (error) {
        console.log(error);
        res.send("couldn't retrieve orders");
    }
};

const deleteOrder = async (req, res) => {
    const id = req.params.id;

    try {
        await db.query(`DELETE FROM orders WHERE order_id = ${id};`);
        res.send("deleted successfully!");
    } catch (error) {
        console.log(error);
        res.send("couldn't delete order!");
    }
};

const makeReview = async (req, res) => {
    const order = req.body.order_id;
    const customer = req.body.customer_id;

    //const c_id = (await db.query("SELECT customer_id FROM orders WHERE order_id = $1;", [s_id])).rows[0].customer_id;

    // Customer can only make one review about each order
    if ((await db.query("SELECT * FROM review WHERE order_id = $1 AND customer_id = $2;", [order, customer])).rowCount != 0 )
    {
        return res.send("You have already reviewed this order, you cannot review it again.");
    }

    try {
        await db.query("INSERT INTO review (rating, order_id, customer_id, content) VALUES ($1, $2, $3, $4);", 
        [req.body.rating,  order, customer, req.body.content]);
        res.send("Review posted successfully!");
    } catch (error) {
        res.send("Could not post review!");
        console.log(error);
    }

};

const getReviewByOrderID = async (req, res) => {
    const id = req.params.id;

    try {
        const result = (await db.query(`SELECT * FROM review WHERE review.order_id = ${id};`)).rows[0];
        console.log(JSON.stringify(result));
        res.send(JSON.stringify(result));

    } catch (error) {
        console.log(error);
        res.send("Couldn't retrieve review!");
    }
};

const getReviewsByTechID = async (req, res) => {
    const id = req.params.id;

    try {
        let result = [];
        
        // search in regular order
        const regorder_query = (await db.query(`SELECT review.rating, review.content 
        FROM review, orders, regularorder 
        WHERE review.order_id = orders.order_id  
        AND regularorder.order_id = orders.order_id 
        AND regularorder.tech_id = ${id};`)).rows;

        result = [...regorder_query];

        // search in offer
        const offer_query = (await db.query(`SELECT review.rating, review.content
        FROM review, orders, offer, isoffer
        WHERE review.order_id = orders.order_id
        AND orders.order_id = isoffer.order_id
        AND isoffer.offer_id = offer.offer_id
        AND offer.tech_id = ${id};`)).rows;

        result = [...result, ...offer_query];

        // search in bundle
        const bundle_query = (await db.query(`SELECT review.rating, review.content 
        FROM review, orders, bundle, isbundle, consistof
        WHERE review.order_id = orders.order_id
        AND orders.order_id = isbundle.order_id
        AND isbundle.bundle_id = bundle.bundle_id
        AND bundle.bundle_id = consistof.bundle_id
        AND consistof.tech_id = ${id};`)).rows;

        result = [...result, ...bundle_query];

        console.log(JSON.stringify(result));
        res.send(JSON.stringify(result));
    } catch (error) {
        console.log(error);
        res.send("Couldn't retrieve reviews!");
    }
}

export { makeNewOrder, getOrderByID, getTechOrders, updateOrderStatus, deleteOrder, makeReview, getReviewByOrderID, getReviewsByTechID };