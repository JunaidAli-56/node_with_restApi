const express = require('express');
const MenModel = require('../models/mens');

const router = new express.Router();

// create mens route
router.post('/men', async (req, res) => {
    try {
        const record = await new MenModel(req.body);
        const result = await record.save();
        res.status(201).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});
// get mens route
router.get('/men', async (req, res) => {
    try {
        const record = await MenModel.find({})
        res.status(200).send(record);
    } catch (error) {
        res.status(400).send(error);
    }
});
// get individual mens route
router.get('/men/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const record = await MenModel.find({ _id }).sort({ "ranking": 1 });
        res.status(200).send(record);
    } catch (error) {
        res.status(400).send(error);
    }
});

// update  mens route
router.patch('/men/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const record = await MenModel.findByIdAndUpdate({ _id }, req.body, { new: true })
        res.status(200).send(record);
    } catch (error) {
        res.status(500).send(error);
    }
});
// delete  mens route
router.delete('/men/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const record = await MenModel.findByIdAndDelete({ _id })
        res.status(200).send(record);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;