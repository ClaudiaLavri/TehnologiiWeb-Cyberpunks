const express = require('express');
const router = express.Router();
const User = require('../../models/User.js');

router.get('/', async (req, res) => {
    const useri = await User.findAll();
    res.status(200).json({
        message: 'Useri gasiti',
        useri
    })
})

router.post('/', async (req, res) => {
    const data = await User.create({
        id_user: req.body.id_user,
        nume_user: req.body.nume_user,
        prenume_user: req.body.prenume_user,
        mail: req.body.mail,
        parola: req.body.parola
    });
    res.status(201).json({
        message: "Userul este inserat",
        userCreat: data
    });
});

router.get('/:idUser', async (req, res) => {
    await User.findByPk(req.params.idUser).then(
        user => {
            res.status(202).json({
                user
            })
        }
    )
});

router.patch('/:idUser', async (req, res) => {
    const id = parseInt(req.params.idUser);
    const data = await User.findOne({
        where: {
            id_user: id
        }
    });

    if (req.body.nume_user != null && req.body.prenume_user != null && req.body.parola != null) {
        data.nume_user = req.body.nume_user;
        data.prenume_user = req.body.prenume_user;
        data.parola = req.body.parola;
        await data.save();
        res.status(205).json({
            message: "User updatat",
            data
        })
    } else if (req.body.nume_user != null && req.body.prenume_user != null) {
        data.nume_user = req.body.nume_user;
        data.prenume_user = req.body.prenume_user;
        await data.save();
        res.status(205).json({
            message: "Nume si prenume user updatate",
            data
        })
    } else if (req.body.nume_user != null && req.body.parola != null) {
        data.nume_user = req.body.nume_user;
        data.parola = req.body.parola;
        await data.save();
        res.status(205).json({
            message: "Nume si parola user updatate",
            data
        })
    } else if (req.body.prenume_user != null && req.body.parola != null) {
        data.prenume_user = req.body.prenume_user;
        data.parola = req.body.parola;
        await data.save();
        res.status(205).json({
            message: "Prenume si parola user updatate",
            data
        })
    } else if (req.body.nume_user != null) {
        data.nume_user = req.body.nume_user;
        await data.save();
        res.status(205).json({
            message: "Nume user updatat",
            data
        })
    } else if (req.body.prenume_user != null) {
        data.prenume_user = req.body.prenume_user;
        await data.save();
        res.status(205).json({
            message: "Prenume user updatat",
            data
        })
    } else {
        data.parola = req.body.parola;
        await data.save();
        res.status(205).json({
            message: "Parola user updatata",
            data
        })
    }
});

router.delete('/:idUser', async (req, res) => {
    id = req.params.idUser;
    us = User.findByPk(req.params.idUser);
    await User.destroy({
        where: {
            id_user: id
        }
    })
    res.status(204).json({
        message: "User sters",
        user: us
    })
});

module.exports = router;