const userController = {}
const User = require('../models/user.model')

userController.create = async (req, res, next) => {
    try {
        const {name, age,email} = req.body;
        const newUser = new User({
            name: name,
            age: age,
            email:email
        });

        newUser.save().then(doc => {
            res.status(200).json({message: doc})
        }).catch( error => {
            res.status(200).json({error: error})
        })
    } catch (error) {

    }
}


userController.update = async (req, res, next) => {
    try {
        const {id} = req.params;
        User.findByIdAndUpdate({_id:id},{name:"farah"},{new:true, upsert:true}).then(doc => {
            res.status(200).json({message: "updated successfully"})
        }).catch( error => {
            res.status(200).json({error: error})
        })
    } catch (error) {

    }
}
userController.getUser = async (req, res, next) => {
    try {
        // User.collection.dropIndexes(function (err, results) {
        //     console.log(results);
        // });
        // const {id} = req.params;
        User.find({}).then(doc => {
            res.status(200).json({message: doc})
        }).catch( error => {
            res.status(200).json({error: error})
        })
    } catch (error) {

    }
}
userController.delete = async (req, res, next) => {
    try {
        const {id} = req.params;
        User.findByIdAndRemove({_id:id}).then(doc => {
            res.status(200).json({message: "deleted successfully"})
        }).catch( error => {
            res.status(200).json({error: error})
        })
    } catch (error) {

    }
}
module.exports =  userController;