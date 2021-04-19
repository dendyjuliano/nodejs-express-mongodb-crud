var Userdb = require('../model/model')

// create and save new user
exports.create = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({ message: 'Content can not be emtpy' })
        return
    }

    // new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    // save user in the database
    user.save(user)
        .then(data => {
            // res.send(data)
            res.redirect('/add-user')
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Some error accourred while creating a craete operation'
            })
        })
}

// returl all users and single user
exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id
        Userdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: `user with ${id} not found` })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || 'Error get data user'
                })
            })
    } else {
        Userdb.find().then(user => {
            res.send(user)
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Some error accourred while get a craete operation'
            })
        })
    }

}

// update a new idetified user by user id
exports.update = (req, res) => {

    if (!req.body) {
        res.status(400).send({ message: 'Data to update not be emtpy' })
        return
    }

    const id = req.params.id

    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update user with ${id}` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: 'Error update user information' })
        })
}

// delete a user with specified user id in the request
exports.delete = (req, res) => {
    const id = req.params.id

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Delete user with ${id}` })
            } else {
                res.send({
                    message: 'user deletd successfully'
                })
            }
        })
        .catch(err => {
            res.status(500).send({ message: 'Error delete user' })
        })
}