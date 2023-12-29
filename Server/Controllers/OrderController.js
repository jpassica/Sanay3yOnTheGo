import db from "../Config/DB.js";
import * as helper from "../Helpers/GenHelper.js";
import { notifyUser } from "./Minor/NotificationController.js";
import { addPointsToCustomer } from "./Minor/RewardController.js"

const makeRegOrder = async (req, res) => {
    const tech = req.body.tech_id;
    const type = req.body.type;

    try {
        const newOrder = await helper.makeNewOrder(req, res);

        const reward_query = await db.query(`SELECT * FROM reward WHERE customer_id = ${req.body.customer_id};`);

        if (reward_query.rowCount != 0)
        {
            req.body.price = req.body.price - req.body.price * reward_query[0].percentage; 
        }

        await db.query("INSERT INTO regularorder VALUES ($1, $2, $3, $4, $5);", [newOrder, req.body.header, 
            req.body.description, req.body.price, tech]);


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

const getCustomerOrders = async (req, res) => {
    const id = req.params.id;

    try {
        let result = [];

        const regorder_query = (await db.query(`SELECT * FROM orders, regularorder
        WHERE regularorder.order_id = orders.order_id AND customer_id = ${id};`)).rows;

        const offer_query = (await db.query(`SELECT * FROM orders, offer, isoffer 
        WHERE orders.order_id = isoffer.order_id AND isoffer.offer_id = offer.offer_id
        AND customer_id = ${id};`)).rows;

        const bundle_query = (await db.query(`SELECT * FROM orders, bundle, isbundle
        WHERE orders.order_id = isbundle.order_id AND isbundle.bundle_id = bundle.bundle_id 
        AND customer_id = ${id};`)).rows;

        result = [...regorder_query, ...offer_query, ...bundle_query];

        console.log(result);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send("Couldn't retrieve orders!");
    }
}

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
    const status = req.body.order_status;

    try {
        await db.query(`UPDATE orders SET order_status = '${status}' WHERE order_id = ${order_id};`);

        const order_query = (await db.query(`SELECT customer_id,order_type FROM orders WHERE order_id = ${order_id};`)).rows[0];
        
        const customer_id = order_query.customer_id;
        
        // send notification || increment user's pts
        if (status == "F")
        {
            req.body.content = "Order completed successfully! Please consider rating.";

            // increment user pts 
            const order_type = order_query.order_type;

            addPointsToCustomer(order_type, order_id, customer_id);
            // let price = 0;

            // if (order_type == "R")
            // {
            //     price = (await db.query(`SELECT price FROM regularorder WHERE 
            //     regularorder.order_id = ${order_id};`)).rows[0].price;
            
            // } else if (order_type == "O")
            // {
            //     price = (await db.query(`SELECT new_price FROM offer, isoffer WHERE 
            //     isoffer.offer_id = offer.offer_id AND isoffer.order_id = ${order_id};`)).rows[0].new_price;

            // } else { // bundle

            //     price = (await db.query(`SELECT total_price FROM bundle, isbundle WHERE 
            //     isbundle.bundle_id = bundle.bundle_id AND isbundle.order_id = ${order_id};`)).rows[0].total_price;
            // }

            // await db.query(`UPDATE customer SET points = points + ${price} WHERE customer_id = ${customer_id};`);

        }
        else if (status == "U")
        {
            req.body.content = "The technician has accepted your order!";
            
        }
        else if (status == "C")
        {
            req.body.content = "Order cancelled.";
            req.body.order_id = order_id;

            notifyTechOfCancellation(req, res);
        }

        // send notification
        req.body.order_id = order_id;
        req.body.notified_id = customer_id;

        notifyUser(req, res);

        res.send("successfully updated order status!");
    } catch (error) {
        console.log(error);
        res.send("couldn't retrieve orders");
    }
};

const toggleHighlighted = async (req, res) => {
    const id = req.params.id;

    try {
        await db.query(`UPDATE orders SET highlighted = NOT highlighted WHERE order_id = ${id};`);
        res.send("Toggled!");
        
    } catch (error) {
        console.log(error);
        res.send("Couldn't toggle highlighted!");
    }
}

const cancelOrder = async (req, res) => {
    const id = req.params.id;
    const customer_id = (await db.query(`SELECT customer_id FROM orders WHERE order_id = ${id};`)).rows[0].customer_id;

    try {
        await db.query(`UPDATE orders SET order_status = 'C' WHERE order_id = ${id};`);

        // send notification 
        req.body.content = "Order cancelled.";
        req.body.order_id = id;
        req.body.customer_id = customer_id;

        notifyUser(req, res);

        res.send("Cancelled successfully!");
    } catch (error) {
        console.log(error);
        res.send("Couldn't cancel order!");
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

        const order_type = (await db.query(`SELECT order_type FROM orders WHERE order_id = ${order};`)).rows[0].order_type;

        // let n = 0;
        // let tech_id = 0;

        // if (order_type == "R")
        // {
        //     tech_id = (await db.query(`SELECT tech_id FROM regularorder WHERE order_id = ${order};`)).rows[0].tech_id;
        // } else if (order_type == "O")
        // {
        //     tech_id = (await db.query(`SELECT tech_id FROM offer, isoffer WHERE order_id = ${order}
        //     AND isoffer.offer_id = offer.offer_id;`)).rows[0].tech_id;
        // }

        // if (order_type == "R" || order_type == "O")
        // {
        //     // update tech rating 
        //     n = (await db.query(`SELECT COUNT(*) FROM review, regularorder WHERE review.order_id = regularorder.order_id 
        //     AND tech_id = ${tech_id}`)).rows[0].count;
        //     n += (await db.query(`SELECT COUNT(*) FROM offer, review, isoffer 
        //     WHERE offer.offer_id = isoffer.offer_id AND review.order_id = isoffer.order_id 
        //     AND offer.tech_id = ${tech_id};`)).rows[0].count;    

        //     const rating = req.body.rating / n;
        //     console.log(tech_id);
        //     console.log(rating);
        
        //     await db.query(`UPDATE technician SET rating = rating + ${rating} WHERE tech_id = ${tech_id};`);
        // }

        await db.query(`UPDATE technician SET rating=(SELECT AVG(review.rating) 
        from review where technician.tech_id IN 
        (SELECT tech_id from regularorder where review.order_id = regularorder.order_id) 
        OR technician.tech_id IN (SELECT tech_id from isoffer io,offer o 
            where io.offer_id=o.offer_id and review.order_id = io.order_id)
            OR technician.tech_id IN (SELECT tech_id1 from bundle b,isbundle ib 
                where b.bundle_id=ib.bundle_id and ib.order_id=review.order_id )
                OR technician.tech_id IN (SELECT tech_id2 from bundle b,isbundle ib 
                    where b.bundle_id=ib.bundle_id and ib.order_id=review.order_id ) 
                    OR technician.tech_id IN (SELECT tech_id3 from bundle b,isbundle ib 
                        where b.bundle_id=ib.bundle_id and ib.order_id=review.order_id ))`);
        
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

const notifyTechOfCancellation = async (req, res) => {
    const order_id = req.body.order_id;

    try {
        const type = (await db.query(`SELECT order_type FROM orders WHERE order_id = ${order_id};`)).rows[0].order_type;

        if (type == "R")
        {
            req.body.notified_id = (await db.query(`SELECT tech_id FROM regularorder WHERE order_id = ${order_id};`)).rows[0].tech_id;

            notifyUser(req, res);

        } else if (type == "O")
        {
            req.body.notified_id = (await db.query(`SELECT tech_id FROM offer, isoffer 
            WHERE isoffer.offer_id = offer.offer_id 
            AND order_id = ${order_id};`)).rows[0].tech_id;

            notifyUser(req, res);

        } else if (type == "B")
        {
            const techs = (await db.query(`SELECT tech_id1, tech_id2, tech_id3 FROM bundle, isbundle 
            WHERE isbundle.bundle_id = bundle.bundle_id 
            AND order_id = ${order_id};`)).rows;

            console.log(techs);
            console.log(order_id);

            req.body.notified_id = techs[0].tech_id1;
            notifyUser(req, res);

            req.body.notified_id = techs[0].tech_id2;
            notifyUser(req, res);

            req.body.notified_id = techs[0].tech_id3;
            notifyUser(req, res);
        }
    } catch (error) {
        console.log(error);
        res.send("Couldn't notify tech!");
    }
}

export { makeRegOrder, getOrderByID, getTechOrders, updateOrderStatus, 
    cancelOrder as deleteOrder, makeReview, getReviewByOrderID, getReviewsByTechID,
    toggleHighlighted, getCustomerOrders };