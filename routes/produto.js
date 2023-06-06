const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const db = mongoose.connection;

router.get('/:id?', async function (req, res, next) {
    try {
        const db = await connect();
        if (req.params.id)
            res.json(await db.collection("produtos").findOne({ _id: new ObjectId(req.params.id) }));
        else
            res.json(await db.collection("produtos").find().toArray());
    }
    catch (ex) {
        console.log(ex);
        res.status(400).json({ erro: `${ex}` });
    }
})

//post produtos
router.post('/', async function (req, res, next) {
    try {
        const produtos = req.body;
        const db = await connect();
        res.json(await db.collection("produtos").insertOne(produtos));
    }
    catch (ex) {
        console.log(ex);
        res.status(400).json({ erro: `${ex}` });
    }
})

//put produtos
router.put('/:id', async function (req, res, next) {
    try {
        const produtos = req.body;
        const db = await connect();
        res.json(await db.collection("produtos").updateOne({ _id: new ObjectId(req.params.id) }, { $set: produtos }));
    }
    catch (ex) {
        console.log(ex);
        res.status(400).json({ erro: `${ex}` });
    }
})

//delete produtos
router.delete('/:id', async function (req, res, next) {
    try {
        const db = await connect();
        res.json(await db.collection("produtos").deleteOne({ _id: new ObjectId(req.params.id) }));
    }
    catch (ex) {
        console.log(ex);
        res.status(400).json({ erro: `${ex}` });
    }
})

module.exports = router;