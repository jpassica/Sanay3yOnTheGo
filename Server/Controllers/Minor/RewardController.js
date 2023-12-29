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

const checkToWinReward = async (customer_id) => {
    //const customer_id = req.body.customer_id;

    try {
        const pt = (await db.query(`SELECT * FROM point_system;`)).rows;

        //console.log(pt[pt.length - 1].req_points);

        const points = (await db.query(`SELECT points FROM customer WHERE customer_id = ${customer_id};`)).rows[0].points;
        console.log(points);
        
        for (var i = pt.length - 1; i >= 0; i --)
        {
            if (points >= pt[i].req_points)
            {
                // win reward

                await db.query(`INSERT INTO reward (customer_id, percentage) VALUES ($1, $2);`,
                [customer_id, pt[i].percentage]);

                // dec points 

                await db.query(`UPDATE customer SET points = points - ${pt[i].req_points}
                WHERE customer_id = ${customer_id};`);

                return res.send("Congrats! You have won a reward!");
            }
        }

        //res.send("No reward has been won!");        

    } catch (error) {
        console.log(error);
        //res.send("Couldn't win reward! Hard luck, haha!");
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

        checkToWinReward(customer_id);

    } catch (error) {
        console.log(error);
        //res.send("Couldn't add points to customer!");
    }
};

const checkToApplyReward = async () => {
    try {

    } catch (error) {
        console.log(error);
    }
}

export { getPointSystemDetails, checkToWinReward, addPointsToCustomer };