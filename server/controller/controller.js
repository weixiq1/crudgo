const Userdb = require('../model/model')
let Userbd = require('../model/model')

exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({message: 'поля не могут быть пустые'})
        return
    }

    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })
    
    user
        .save(user)
        .then(data => {
            res.redirect('/add-user')
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })

 }

exports.find = (req, res) => {
    Userdb.find()
    .then(user => {
        res.send(user)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
} 

 exports.update = (req, res) => {
    if(!req.body) {
        return res
            .status(400)
            .send({message: 'Поле не может быть пустое'})
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, {userFindAndModify: false})
    .then(data => {
        if(!data) {
            res.status(404).send({message: 'Не получается обновить данные'})
        } else {
            res.send(data)
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
} 

exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data) {
                res.status(404).send({message: 'Не получается удалить'})
            } else {
                res.send({ message: 'Пользователь успешно удален'})
            }
        })
            .catch(err => {
                res.status(500).send({
                    message: err.message
                
            })
        })
}