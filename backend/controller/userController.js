const users = require("../model/users")
const passport = require('passport');
const _ = require('lodash');
var ObjectId = require('mongoose').Types.ObjectId;


module.exports.register = async (req, res) => {
    try {
        var user = new users({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            gender: req.body.gender,
            dob: req.body.dob,
            mobilenumber: req.body.mobilenumber,
            roles: req.body.roles,
            email: req.body.email,
            password: req.body.password,
        });

        const userData = await user.save();
        res.send({status:true, "message": "Successfully Registred" });

    } catch (error) {
        if (error.code === 11000) {
            res.status(422).send({status:false, "message": "Duplicate Address Found" });
        }
        else {
            res.send({status:false, "message": "Please Try Later" });
        }
    }
}

module.exports.login = (req, res, next) => {
    passport.authenticate('local', (err, users, info) => {
        
        if (err) return res.status(400).json(err);
       
        else if (users) return res.status(200).json({status : true, message: "Login Successfull", "token": users.generateJwt() });
       
        else return res.status(404).json({ status : true, "message": "Enter Valid Credntials" });
    })(req, res);
}

module.exports.userProfile = (req, res, next) => {
    users.findOne({ _id: req._id },
        (err, users) => {
            if (!users)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, users: _.pick(users, ['id', 'firstname', 'lastname', 'gender','dob','mobilenumber','email', 'roles']) });
        }
    );
}

module.exports.listUsers = (req, res) => {
    users.find({roles: "users"},(err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log('Error in Retriving data ' + JSON.stringify(err, undefined, 2))
        }
    })
}

module.exports.viewUseres = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record within given id :  ${(req.params.id)} `);
    users.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc)
        }
        else {
            console.log('Error in Retriving data : ' + JSON.stringify(err, undefined, 2))
        }
    })
}

module.exports.editUsers = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record within given id : ' + req.params.id);

    users.findByIdAndUpdate(req.params.id, {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        gender: req.body.gender,
        dob: req.body.dob,
        mobilenumber: req.body.mobilenumber,
        email: req.body.email,
        roles: req.body.roles,
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    status : false,
                    message: "ID not found with id " + req.params._id
                });
            }
            res.send({ status : true , message: "Data Updated Successfully" });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    status : false,
                    message: "ID not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                status : false,
                message: "Error updating data"
            });
        });
}
