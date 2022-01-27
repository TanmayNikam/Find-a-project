const Tag = require("../models/tag")

exports.getTags = async (req, res) => {
    try {
        const tags = await Tag.find({});
        res.status(200).json({
            tags
        })
    }
    catch (error) {
        res.status(400).json({
            error
        })
    }
}

exports.addTag = async (req, res) => {
    try {
        req.body.name = req.body.name.toLowerCase();
        Tag.create(req.body).then(data => {
            res.status(201).json({
                message: "Tag created!",
                data
            })
        })
    }
    catch (err){
        res.status(400).json({
            meesage: error
        })
    }
    
}