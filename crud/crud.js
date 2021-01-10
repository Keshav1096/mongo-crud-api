const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const url = `mongodb+srv://${user}:${password}@cluster0-y9dsi.mongodb.net/tasks_list?retryWrites=true&w=majority`

const client = new MongoClient(url);


/**
 * METHOD: POST
 * URL: <base url>/mongo/insert
 * Arguments:
 *  - table: <table name>
 *  - record: <key value pair>
 * Returns: inserted id of record
 */
router.post('/insert', async (req, res) => {
    const table = req.body.table;
    const record = req.body.record;

    await client.connect();
    let data = await client.db(process.env.DB_NAME).collection(table).insertOne(record).catch(err => {
        return false;
    });
    if (!data) {
        return res.json({
            success: false
        })
    }
    res.json({
        success: true,
        data: data.insertedId
    });
    await client.close();
});


/**
 * METHOD: POST
 * URL: <base url>/mongo/find
 * Arguments:
 *  - table: <table name>
 *  - query: <key value pair>
 * Returns: array of records
 */
router.post('/find', async (req, res) => {
    const table = req.body.table;
    let query = req.body.query;

    if (req.body && req.body.query && req.body.query._id) {
        query = {
            _id: ObjectId(req.body.query._id)
        }
    }
    console.log("query", query)
    await client.connect();
    const data = await client.db(process.env.DB_NAME).collection(table).find(query).toArray().catch(err => {
        return false;
    });

    if (!data) {
        return res.json({
            success: false
        });
    }

    res.json({
        success: true,
        data: data
    });
    await client.close();
});


/**
 * METHOD: POST
 * URL: <base url>/mongo/update
 * Arguments:
 *  - table: <table name>
 *  - _id: <_id of record>
 *  - record: <key value pair>
 * Returns: inserted id of record
 */
router.post('/update', async (req, res) => {
    const table = req.body.table;
    const _id = req.body._id;
    const record = req.body.record;

    await client.connect();
    const data = await client.db(process.env.DB_NAME).collection(table).updateOne({ _id: ObjectId(_id) }, { $set: record }).catch(err => { return false });

    if (!data) {
        return res.json({
            success: false
        });
    }

    res.json({
        success: true,
        message: `Updated ${data.result.nModified} documents`
    });
    await client.close();
});


/**
 * METHOD: POST
 * URL: <base url>/mongo/delete
 * Arguments:
 *  - table: <table name>
 *  - _id: <_id of record>
 * Returns: inserted id of record
 */
router.post('/delete', async (req, res) => {
    const table = req.body.table;
    const _id = req.body._id;

    await client.connect();
    const data = await client.db(process.env.DB_NAME).collection(table).deleteOne({ _id: ObjectId(_id) }).catch(err => { return false });
    if (!data) {
        return res.json({
            success: false
        });
    }

    res.json({
        success: true,
        message: `Deleted ${data.result.n} documents`
    });
    await client.close();
});

module.exports = router;
