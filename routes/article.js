var express = require("express");
var router = express.Router();

const {Article} = require('../models')


router.get('/', (req,res) => {
    Article.findAll().then(articles => {
        res.header('Content-Type', 'application/json')
        res.send(JSON.stringify(articles,null,"\t"))
    })
})

router.get('/:id', (req,res) => {
    Article.findOne({
        where : {id: req.params.id}
    }).then(articles => {
        res.header('Content-Type', 'application/json')
        res.send(JSON.stringify(articles,null, "\t"))
    })
})

router.post('/', (req,res) => {
    Article.create({
        title   : req.body.title,
        body    : req.body.body,
        approved : req.body.approved
    }).then(articles => {
        res.header('Content-Type', 'application/json')
        res.status(201).send(JSON.stringify(articles,null, "\t"))
    }).catch(err => {
        res.status(422).send("Cant create article")
    })

    //console.log(req.body.approved)
})

router.put('/:id', (req,res) => {
    Article.update({
        title   : req.body.title,
        body    : req.body.body,
        approved : req.body.approved
    }, {where : {id: req.params.id}}).then(articles => {
        res.header('Content-Type', 'application/json')
        res.status(201).send(JSON.stringify(articles,null, "\t"))
    }).catch(err => {
        res.status(422).send("Cant update article")
    })

    //console.log(req.body.approved)
})

router.delete('/:id', (req,res) => {
    Article.destroy({where : {id: req.params.id}}).then(articles => {
        res.status(422).send("Article deleted succesfully")
    }).catch(err => {
        res.status(422).send("Cant update article")
    })

    //console.log(req.body.approved)
})


module.exports = router;