const express = require('express');
const router = express.Router();
const Aliment = require('../../models/Aliment.js');
const User = require('../../models/User.js');

//metoda de get
//returneaza un response cu statusul 200(succes) si mesaj
router.get('/', async (req, res) => {
    const alimente = await Aliment.findAll();
    res.status(200).json({
        message: 'Alimente gasite',
        alimente
    })
});

//metoda de post
//returneaza un response cu statusul 201(creare date), mesaj, elementul creat
router.post('/', async (req, res) => {
    const data = await Aliment.create({
        id_aliment: req.body.id_aliment,
        nume_aliment: req.body.nume_aliment,
        categorie: req.body.categorie,
        data_expirare: req.body.data_expirare,
        id_user: req.body.id_user
    });

    res.status(201).json({
        message: "Alimentul este inserat",
        alimentCreat: data

    });
});

//metoda de get pentru un anumit id
//returneaza un response cu statusul 202(succes), mesaj si id-ul pe care l-am transmis
router.get('/:idAliment', async (req, res) => {
    await Aliment.findByPk(req.params.idAliment).then(
        aliment => {
            res.status(202).json({
                aliment
            })
        }
    )
});

//metoda de patch pentru un aliment
//returneaza un response cu statusul 205(succes) si mesaj
router.patch('/:idAliment', async (req, res) => {
    const id = parseInt(req.params.idAliment);
    const data = await Aliment.findOne({
        where: {
            id_aliment: id
        }
    });

    if (req.body.nume_aliment != null && req.body.categorie != null && req.body.data_expirare != null) {
        data.nume_aliment = req.body.nume_aliment;
        data.categorie = req.body.categorie;
        data.data_expirare = req.body.data_expirare;
        await data.save();
        res.status(205).json({
            message: "Aliment updatat",
            data
        })
    } else if (req.body.data_expirare != null && req.body.categorie != null) {
        data.categorie = req.body.categorie;
        data.data_expirare = req.body.data_expirare;
        await data.save();
        res.status(205).json({
            message: "Data expirare si categorie aliment updatate",
            data
        })
    } else if (req.body.data_expirare != null && req.body.nume_aliment != null) {
        data.data_expirare = req.body.data_expirare;
        data.nume_aliment = req.body.nume_aliment;
        await data.save();
        res.status(205).json({
            message: "Data expirare si nume aliment updatate",
            data
        })
    } else if (req.body.nume_aliment != null && req.body.categorie != null) {
        data.data_expirare = req.body.data_expirare;
        data.nume_aliment = req.body.nume_aliment;
        await data.save();
        res.status(205).json({
            message: "Nume si categorie aliment updatate",
            data
        })
    } else if (req.body.nume_aliment != null) {
        data.nume_aliment = req.body.nume_aliment;
        await data.save();
        res.status(205).json({
            message: "Nume aliment updatat",
            data
        })
    } else if (req.body.categorie != null) {
        data.categorie = req.body.categorie;
        await data.save();
        res.status(205).json({
            message: "Categorie aliment updatata",
            data
        })
    } else {
        data.data_expirare = req.body.data_expirare;
        await data.save();
        res.status(205).json({
            message: "Data expirare aliment updatata",
            data
        })
    }
});

//metoda de delete pentru un aliment
//returneaza un response cu statusul 204(succes) si mesaj
router.delete('/:idAliment', async (req, res) => {
    id = req.params.idAliment;
    al = Aliment.findByPk(req.params.idAliment);
    await Aliment.destroy({
        where: {
            id_aliment: id
        }
    })
    res.status(204).json({
        message: 'Aliment sters!',
        aliment: al
    });
});

module.exports = router;