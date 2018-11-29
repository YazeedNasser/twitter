const express = require('express');
const Router = express.Router();
const fileHelper = require('../helpers/file');

Router.get('/', function(req, res) {
    res.render('Upload');
});

Router.post('/upload', async function(req, res){
    const uploaded =  await fileHelper.upload(req, res);
    console.log(uploaded)
    return res.redirect('/')
});

module.exports = Router;