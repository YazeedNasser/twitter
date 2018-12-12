const express = require('express');
const Router = express.Router();
const upload = require('../helpers/file');

Router.get('/', function(req, res) {
    res.render('Upload');
});

Router.post('/upload', upload.upload(), async function(req, res){
    const uploaded =  await upload.upload();
    return res.redirect('/')
});

Router.get('/chat', function(req, res){
    res.render('Chat');
})
module.exports = Router;