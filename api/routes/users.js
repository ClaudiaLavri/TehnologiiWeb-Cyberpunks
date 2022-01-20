const express = require('express');
const router = express.Router();
const User = require('../../models/User.js'); 

router.get('/', (req, res, next) =>{
    var jsonObj = [];
    User.findAll().then(users => {
        for (u of users){
            var us = {
                id_user: u.id_user,
                nume_user: u.nume_user,
                prenume_user: u.prenume_user,
                mail: u.mail,
                parola: u.parola
            }
            let jsonUs = JSON.stringify(us);
            rez = jsonUs.replace(/'\'/g, '');
            jsonObj.push(rez);
        }
    })
    res.status(200).json({
        jsonObj
    });
})

router.post('/', async (req, res, next) => {
    const user =  await User.create({
        id_user: req.body.id_user,
        nume_user: req.body.nume_user,
        prenume_user: req.body.prenume_user,
        mail: req.body.mail,
        parola: req.body.parola
    });
    res.status(201).json({
        message: "Handling POST requests to /users",
        userCreat: user
    });
});

router.get('/:idUser', (req, res, next) => {
    // res.status(200).json({
    //     message: "Detalii User",
    //     idRezervare: req.params.idUser
    // });

    User.findByPk(req.params.idUser).then(
        user => {
            res.status(200).json({
                message: user
            })
        }
    )
});

router.patch('/:idUser', (req, res, next) => {
    res.status(200).json({
        message: 'User actualizat!',
        idUser: req.params.idUser
    });
});

router.delete('/:idUser', (req, res, next) => {
    us = User.findByPk(req.params.idUser);
    User.destroy({
        where:{
            id_user: req.params.idUser
        }
    })
    res.status(200).json({
        message: 'User sters!',
        idUser: req.params.idUser
    });
});

module.exports = router;