const express = require('express');
const router = express.Router();
const Rezervare = require('../../models/Rezervare.js')

//metoda de get
//returneaza un response cu statusul 200(succes) si mesaj
router.get('/', async (req, res) => {
    const rezervari = await Rezervare.findAll();
    res.status(200).json({
        message: 'Rezervari gasite',
        rezervari
    })
});

//metoda de post
//returneaza un response cu statusul 201(creare date), mesaj, elementul creat
router.post('/', async (req, res) => {
    const data = await Rezervare.create(req.body);
    res.status(201).json({
        message: 'Rezervarea este inserata',
        rezervare: data
    });
});

//metoda de get pentru un id
//returneaza un response cu statusul 200(succes), mesaj, id-ul rezervarii
router.get('/:idRezervare', async (req, res) => {
    await Rezervare.findByPk(req.params.idRezervare).then(
        rezervare => {
            res.status(202).json({
                rezervare
            })
        }
    )
});

//metoda de delete
//returneaza un response cu statusul 200(succes), mesaj, id-ul rezervarii
router.delete('/:idRezervare', async (req, res) => {
    id = req.params.idRezervare;
    rez = Rezervare.findByPk(req.params.idRezervare);
    await Rezervare.destroy({
        where: {
            id_rezervare: id
        }
    })
    res.status(204).json({
        message: "Rezervare stearsa!",
        rez
    });
});

module.exports = router;