const express = require('express')

const router = express.Router()

router.get('/',(req,res) => {
    res.json({mssg:'Get all movies'})
})
router.get('/:id',(req,res) => {
    res.json({mssg:'Get one movie'})
})
router.post('/:id',(req,res) => {
    res.json({mssg:'Post one movie'})
})
router.delete('/:id',(req,res) => {
    res.json({mssg:'Delete one movie'})
})
router.patch('/:id',(req,res) => {
    res.json({mssg:'Update one movie'})
})

module.exports = router