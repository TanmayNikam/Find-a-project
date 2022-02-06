const User = require("../models/user")

exports.follow = async (req, res) => {
    try {   
        await User.findOneAndUpdate({ gid: req.user }, { "$push": { follower: req.params.id } }, { new: true, runValidators: true })
        .then(data => {
            res.status(201).json({
                data
            })
        })
    }
    catch (err) {
        res.status(400).json({
            err
        })
    }
}


exports.feed = (req, res) => {
    console.log(req.user)
    res.status(200).json({
            message: "feed"
        })
}