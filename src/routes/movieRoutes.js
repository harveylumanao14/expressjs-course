import express from 'express';

const router = express.Router();

router.get('/hello', (req, res) => {
    res.json({ message: "hello" })
});

router.get('/', (req, res) => {
    res.json({ message: "Get specific or all records " })
});

router.post('/', (req, res) => {
    res.json({ message: "To create the data" })
});

router.put('/', (req, res) => {
    res.json({ message: "To update the data" })
});

router.delete('/', (req, res) => {
    res.json({ message: "Tp delete the data" })
});

export default router;