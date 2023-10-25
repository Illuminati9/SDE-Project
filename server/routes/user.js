const express = require('express');
const {signin ,signup } = require('../controllers/user.js');

const router = express.Router();

router.get('/hello',(req,res)=>{
    res.send('Hello world');
})
router.post('/signup',signup);
router.post('/signin',signin);

module.exports = router;