const express = require('express');
const server = require('./server');
const db = require('./questModels');

const questHandler = {};

questHandler.addQuest = (req, res, next) => {
    // console.log(req.body); //if we send data through 'body' use req.body
    const questName = req.body.questName;
    const qDescription = req.body.description;
    const defaultDate = new Date(); //setting default date to the current day
    const qDueDate = defaultDate.toDateString();;//adding default value for due date instead of: req.body.dueDate;
    const qRarity = 'Normal'; //adding default value for quest rarity

    //may need to edit based on the table header names from DB
    const dbPhrase = 'INSERT INTO dailies (quest_name, quest_description, quest_rarity, due_date) VALUES($1, $2, $3, $4) RETURNING *';
    const dbValues = [questName, qDescription, qRarity, qDueDate];

    //Appends info to the table
    db.query(dbPhrase, dbValues)
    .then(() => {
        res.locals.quest = req.body;
        // res.locals.quest.description = qDescription;
        res.locals.quest.dueDate = qDueDate;
        res.locals.quest.rarity = qRarity;
        console.log('After adding quest, send quest object back', res.locals.quest);
        return next();
    });


}

questHandler.questList = (req, res, next) => {
    //console.log(req.query); //if we send data through 'params' use req.query

    const dbPhrase = 'SELECT * FROM dailies';
    const dbValues = [];
    db.query(dbPhrase)
    .then((data) => {
        console.log('Test of GET request');
        res.locals.allQuests = data.rows;
        //console.log(res.locals.allQuests);
        return next();
    })

}

module.exports = questHandler;


/*

Below are queries used to create tables. Not all tables were used.

CREATE TABLE IF NOT EXISTS dailies (
dailies_id BIGSERIAL PRIMARY KEY,
quest_name CHARACTER VARYING(255) NOT NULL,
quest_description CHARACTER VARYING(255),
quest_rarity CHARACTER VARYING(255),
due_date DATE,
completion_date TIMESTAMP,
expired BOOLEAN
);

CREATE TABLE IF NOT EXISTS due_dates (
due_dates_id BIGSERIAL PRIMARY KEY,
display_name INTEGER,
display_conversion DATE UNIQUE
);

CREATE TABLE IF NOT EXISTS users (
users_id BIGSERIAL PRIMARY KEY,
username CHARACTER VARYING(50) UNIQUE NOT NULL,
current_xp BIGINT,
signup_date DATE,
cookies CHARACTER VARYING
);

CREATE TABLE IF NOT EXISTS quest_rarity (
quest_rarity_id BIGSERIAL PRIMARY KEY,
rarity_type CHARACTER VARYING(50) UNIQUE,
rarity_value INTEGER
);

CREATE TABLE IF NOT EXISTS quest_progress (
quest_progress_id BIGSERIAL PRIMARY KEY,
from_user INTEGER,
daily INTEGER
);



INSERT INTO users (username, current_xp, signup_date)
VALUES ('Person312', '12', '2022-05-31')

INSERT INTO users (username, current_xp, signup_date)
VALUES ('Player45', '8', '2022-05-30')

INSERT INTO dailies (quest_name, quest_description, quest_rarity, due_date)
VALUES ('WATER!', 'Drink at least 64oz of water', 'Normal', '2022-05-31')

INSERT INTO dailies (quest_name, quest_description, quest_rarity, due_date)
VALUES ('You gotta exercise man', 'Do 45 minutes of some sort of exercise', 'Normal', '2022-05-31')

SELECT * FROM dailies
*/