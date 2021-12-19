const express = require('express');
const router = express.Router();

//metoda de get
//returneaza un response cu statusul 200(succes) si mesaj
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling GET requests to /alimente"
    });
});

//metoda de post
//returneaza un response cu statusul 201(creare date), mesaj, elementul creat
router.post('/', (req, res, next) => {
    const aliment = {
        id_aliment: req.body.id_aliment,
        nume_aliment: req.body.nume_aliment,
        categorie: req.body.categorie,
        data_expirare: req.body.data_expirare,
        id_user: req.body.id_user
    }
    res.status(201).json({
        message: "Handling POST requests to /alimente",
        alimentCreat: aliment
    });
});

//metoda de get pentru un anumit id
//returneaza un response cu statusul 200(succes), mesaj si id-ul pe care l-am transmis
router.get('/:idAliment', (req, res, next) => {
    const id = req.params.idAliment;
    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
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