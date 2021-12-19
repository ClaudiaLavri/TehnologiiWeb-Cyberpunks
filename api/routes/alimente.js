const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling GET requests to /alimente"
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: "Handling POST requests to /alimente"
    });
});

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

router.patch('/:idAliment', (req, res, next) => {
    res.status(200).json({
        message: 'Aliment actualizat!'
    });
});

router.delete('/:idAliment', (req, res, next) => {
    res.status(200).json({
        message: 'Aliment sters!'
    });
});

module.exports = router;