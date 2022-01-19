const express = require('express');
const router = express.Router();
const Grup = require('../../models/Grup.js');
const User = require('../../models/User.js');

router.get('/', (req, res, next) => {
    var jsonObj = [];
    Grup.findAll().then(grupuri => {
        for (g of grupuri) {
            var gr = {
                id_grup: g.id_grup,
                id_user: g.id_user,
                id_user_detinator: g.id_user_detinator,
                nume_grup: g.nume_grup
            }
            let jsonGr = JSON.stringify(gr);
            rez = jsonGr.replace(/'\'/g, '');
            jsonObj.push(rez);
        }
        res.status(200).json({
            jsonObj
        })
    })
});

router.post('/', async (req, res, next) => {
    const data = await Grup.create({
        id_grup: req.body.id_grup,
        id_user: req.body.id_user,
        id_user_detinator: req.body.id_user_detinator,
        nume_grup: req.body.nume_grup
    })
    res.status(201).json({
        message: "Handling POST requests to /grupuri",
        grupCreat: data
    });
});

router.get('/:idGrup', (req, res, next) => {
    Grup.findByPk(req.params.idGrup).then(
        grup => {
            res.status(200).json({
                message: grup 
            })
        }
    );
});

router.patch('/:idGrup', (req, res, next) => {
    res.status(200).json({
        message: 'Grup actualizat!'
    });
});

router.delete('/:idGrup', (req, res, next) => {
    gr = Grup.findByPk(req.params.idGrup);
    Grup.destroy({
        where: {
            id_grup: req.params.idGrup
        }
    })
    res.status(200).json({
        message: 'Grup sters!',
        grup: gr
    })
})

module.exports = router;