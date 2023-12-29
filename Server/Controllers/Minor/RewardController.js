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

const winReward = async (req, res) => {
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

export { getPointSystemDetails, winReward };