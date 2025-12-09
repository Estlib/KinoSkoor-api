const {db} = require("../db.js")
const Utilities = require("./Utilities.js")
const UUID = require('uuid')

exports.create = async (req,res) => {
    if( !req.body.OrderCost || !req.body.DeliveryAddress)
    {
        return res.status(400).send({error:"You are missing order cost or delivery address"})
    }
    if( !req.body.UserID || !req.body.FilmID) 
    {
        return res.status(404).send({error:"USER or FILM not found"})
    }
    let newOrder = {
        OrderID: UUID.v7(),
        OrderCost: req.body.OrderCost,
        DeliveryAddress: req.body.DeliveryAddress,
        UserID: req.body.UserID,
        FilmID: req.body.FilmID
    }
    const submittedOrder = await db.orders.create(newOrder);
    res
    .location(`${Utilities.getBaseURL(req)}/orders/${submittedOrder.OrderID}`)
    .sendStatus(201);
}