const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const Grup = require('../../models/Grup.js');
const User = require('../../models/User.js');

router.get('/', async (req, res) => {
    const grupuri = await Grup.findAll();
    res.status(200).json({
        message: 'Grupuri gasite',
        grupuri
    })
});

router.post('/', async (req, res) => {
    const data = await Grup.create({
        id_grup: req.body.id_grup,
        id_user: req.body.id_user,
        id_user_detinator: req.body.id_user_detinator,
        nume_grup: req.body.nume_grup
    })
    res.status(201).json({
        message: "Grupul este inserat",
        grupCreat: data
    });
});

router.get('/:idGrup', async (req, res) => {
    const id = req.params.idGrup;
    const grup = await Grup.findAll({
        where: {
            id_grup: id
        }
    })
    res.status(202).json({
        grup
    })
});

router.patch('/:idGrup', async (req, res) => {
    const id = parseInt(req.params.idGrup);
    const data = await Grup.findAll({
        where: {
            id_grup: id
        }
    });

    if (req.body.nume_grup) {
        for (let d of data) {
            d.nume_grup = req.body.nume_grup;
            await d.save();
        }
        res.status(205).json({
            message: "Nume grup updatat",
            data
        })
    }
});

router.delete('/:idGrup', async (req, res) => {
    const id = req.params.idGrup;
    await Grup.destroy({
        where: {
            id_grup: id
        }
    })
    res.status(204).json({
        message: "Grup sters"
    })
})

module.exports = router;