const express = require('express');
const questionController = require('./controllers/QuestionController');
const RoomController = require('./controllers/RoomController');


const route = express.Router();

route.get('/', (req, res) => res.render("index", { page: 'enter-room' }));
route.get('/create-pass', (req, res) => res.render("index", { page: 'create-pass' }));

route.get('/room/:room', RoomController.open);

route.post('/question/:room/:question/:action', questionController.index);
route.post('/create-room', RoomController.create);

module.exports = route;