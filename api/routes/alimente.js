const express = require('express');
const router = express.Router();
const Aliment = require('../../models/Aliment.js');

//metoda de get
//returneaza un response cu statusul 200(succes) si mesaj
router.get('/', (req, res, next) => {
    var jsonObj = [];
    Aliment.findAll().then(alimente => {
        for (al of alimente) {
            var alim = {
                id_aliment: al.id_aliment,
                nume_aliment: al.nume_aliment,
                categorie: al.categorie,
                data_expirare: al.data_expirare,
                id_user: al.id_user
            }
            let jsonAlim = JSON.stringify(alim);
            rez = jsonAlim.replace(/'\'/g, '');
            jsonObj.push(rez);
        }
        res.status(200).json({
            jsonObj
        })
    })
});

//metoda de post
//returneaza un response cu statusul 201(creare date), mesaj, elementul creat
router.post('/', async (req, res, next) => {
    const data = await Aliment.create({
        id_aliment: req.body.id_aliment,
        nume_aliment: req.body.nume_aliment,
        categorie: req.body.categorie,
        data_expirare: req.body.data_expirare,
        id_user: req.body.id_user
    });

    res.status(201).json({
        message: "Handling POST requests to /alimente",
        alimentCreat: data

    });
});

//metoda de get pentru un anumit id
//returneaza un response cu statusul 200(succes), mesaj si id-ul pe care l-am transmis
router.get('/:idAliment', (req, res, next) => {
    Aliment.findByPk(req.params.idAliment).then(
        aliment => {
            res.status(200).json({
                message: aliment
            })
        }
    )
});

//metoda de patch pentru un aliment
//returneaza un response cu statusul 200(succes) si mesaj
router.patch('/:idAliment', (req, res, next) => {
    const id = parseInt(req.body.idAliment);
    const data = {
        nume_aliment: req.body.nume_aliment,
        categorie: req.body.categorie,
        data_expirare: req.body.data_expirare,
    }
    if (data.nume_aliment != null) {
        Aliment.update(
            { nume_aliment: data.nume_aliment },
            {
                where: {
                    id_aliment: id
                }
            }
        )
    }
    res.status(200).json({
        message: "Aliment actualizat!",
        aliment: Aliment.findByPk(req.body.idAliment)
    })
    // if (data.categorie != null) {
    //     Aliment.update(
    //         { categorie: data.categorie },
    //         { where: { id_aliment: req.body.idAliment } }
    //     ).then(result => {
    //         res.status(200).json({
    //             message: "Aliment actualizat!",
    //             aliment: Aliment.findByPk(req.body.idAliment)
    //         })
    //     })
    // }
    // if (data.data_expirare != null) {
    //     Aliment.update(
    //         { data_expirare: data.data_expirare },
    //         { where: { id_aliment: req.body.idAliment } }
    //     ).then(result => {
    //         res.status(200).json({
    //             message: "Aliment actualizat!",
    //             aliment: Aliment.findByPk(req.body.idAliment)
    //         })
    //     })
    // }


    // res.status(200).json({
    //     message: 'Aliment actualizat!'
    // });
});

//metoda de delete pentru un aliment
//returneaza un response cu statusul 200(succes) si mesaj
router.delete('/:idAliment', (req, res, next) => {
    al = Aliment.findByPk(req.params.idAliment);
    Aliment.destroy({
        where: {
            id_aliment: req.params.idAliment
        }
    })
    res.status(200).json({
        message: 'Aliment sters!',
        aliment: al
    });
});

module.exports = router;