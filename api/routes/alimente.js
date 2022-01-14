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
            // let alime = JSON.parse(alim);
            let jsonAlim = JSON.stringify(alim);
            rez = jsonAlim.replace(/'\'/g, '');
            // let alim = JSON.parse(al);
            jsonObj.push(rez);
        }
        res.status(200).json({
            jsonObj
        })
    })
    // Aliment.findAll()
    //     .then(alimente => {
    //         console.log(alimente);
    //         res.sendStatus(200).json({
    //             message: alimente
    //         })
    //     })
    //     // res.status(200).json({
    //     //     message: "Handling GET requests to /alimente"
    //     .catch(err => console.log(err));
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
    // res.status(200).json({
    //     message: 'You passed an ID',
    // id: id,
    // text: req.params.idAliment
    // });

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
    res.status(200).json({
        message: 'Aliment actualizat!'
    });
});

//metoda de delete pentru un aliment
//returneaza un response cu statusul 200(succes) si mesaj
router.delete('/:idAliment', (req, res, next) => {
    res.status(200).json({
        message: 'Aliment sters!'
    });
});

module.exports = router;