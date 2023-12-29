import db from "../../Config/DB.js";

const getPointSystemDetails = async(req, res) => {
    try {
        const result = (await db.query("SELECT * FROM point_system;")).rows;
        console.log(result);
        res.send(JSON.stringify(result));
    } catch (error) {
        console.log(error);
        res.send("Couldn't retrieve point system details");
    }
};

const checkToWinReward = async (req, res) => {
    const customer_id = req.body.customer_id;

    try {
        // employ check if customer has reached a certain threshold
        const pt = (await db.query(`SELECT * FROM point_system;`)).rows;

        console.log(pt[pt.length - 1].req_points);

        res.send("Congrats! You have won a reward!");
    } catch (error) {
        console.log(error);
        res.send("Couldn't win reward! Hard luck, haha!");
    }
}

const addPointsToCustomer = async (order_type, order_id, customer_id) => {
    try {
        let price = 0;

        if (order_type == "R")
        {
            price = (await db.query(`SELECT price FROM regularorder WHERE 
            regularorder.order_id = ${order_id};`)).rows[0].price;
        
        } else if (order_type == "O")
        {
            price = (await db.query(`SELECT new_price FROM offer, isoffer WHERE 
            isoffer.offer_id = offer.offer_id AND isoffer.order_id = ${order_id};`)).rows[0].new_price;

        } else { // bundle
            price = (await db.query(`SELECT total_price FROM bundle, isbundle WHERE 
            isbundle.bundle_id = bundle.bundle_id AND isbundle.order_id = ${order_id};`)).rows[0].total_price;
        }
        await db.query(`UPDATE customer SET points = points + ${price} WHERE customer_id = ${customer_id};`);

    } catch (error) {
        console.log(error);
        res.send("Couldn't add points to customer!");
    }
    };

export { getPointSystemDetails, checkToWinReward, addPointsToCustomer };