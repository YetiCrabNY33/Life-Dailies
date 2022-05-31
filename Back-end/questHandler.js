const express = require('express');
const server = require('./server');
const db = require('./questModels');

const questHandler = {};

questHandler.addQuest = (req, res, next) => {
    console.log(req.body); //if we send data through 'body' use req.body
    const questName = req.body.questName;
    const qDescription = req.body.description;
    const qDueDate = req.body.dueDate;

    //may need to edit based on the table header names from DB
    const dbPhrase = 'INSERT INTO (questname, description, duedate) VALUES($1, $2, $3) RETURNING *';
    const dbValues = [questName, qDescription, qDueDate];

    //Appends info to the table
    // db.query(dbPhrase, dbValues)
    // .then(() => {
    //     return next();
    // });


}

questHandler.questList = (req, res, next) => {
    console.log(req.query); //if we send data through 'params' use req.query

    const dbPhrase = '';
    const dbValues = [];
    db.query(dbPhrase, dbValues)
    .then((data) => {
        console.log(data);
        
        return next();
    })

}

module.exports = questHandler;