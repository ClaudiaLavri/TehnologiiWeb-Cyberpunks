const express = require('express');
const router = express.Router();
const Rezervare = require('../../models/Aliment.js')

//metoda de get
//returneaza un response cu statusul 200(succes) si mesaj
router.get('/', (req, res, next) => {
    // res.status(200).json({
    //     message: "Rezervari"
    // })
    Rezervare.findAll()
        .then(rezervare => {
            console.log(rezervare);
            res.sendStatus(200);
        })
        .catch(err => console.log(err));
    // res.status(200).json({
    //     message: "Rezervarile au fost gasite!"
    console.log(Rezervare);
});

//metoda de post
//returneaza un response cu statusul 201(creare date), mesaj, elementul creat
router.post('/', (req, res, next) => {
    // const rezervare = {
    //     id_rezervare: req.body.id_rezervare,
    //     id_user: req.body.id_user,
    //     id_aliment: req.body.id_alimentz
    // }

    res.status(201).json({
        message: "Rezervare facuta.",
        // rezervare: rezervare
    });
});

//metoda de get pentru un id
//returneaza un response cu statusul 200(succes), mesaj, id-ul rezervarii
router.get('/:idRezervare', (req, res, next) => {
    res.status(200).json({
        message: "Detalii rezervare",
        idRezervare: req.params.idRezervare
    });
});

//metoda de delete
//returneaza un response cu statusul 200(succes), mesaj, id-ul rezervarii
router.delete('/:idRezervare', (req, res, next) => {
    res.status(200).json({
        message: "Rezervare stearsa.",
        idRezervare: req.params.idRezervare
    });
});

module.exports = router;