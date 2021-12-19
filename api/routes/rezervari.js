const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Rezervarile au fost gasite!"
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: "Rezervare facuta."
    });
});

router.get('/:idRezervare', (req, res, next) => {
    res.status(200).json({
        message: "Detalii rezervare",
        idRezervare: req.params.idRezervare
    });
});

router.delete('/:idRezervare', (req, res, next) => {
    res.status(200).json({
        message: "Rezervare stearsa.",
        idRezervare: req.params.idRezervare
    });
});

module.exports = router;