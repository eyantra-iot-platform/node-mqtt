let express = require('express'),
    app = express(),
    mqtt = require('mqtt'),
    mosca = require('mosca');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

module.exports = app;

//this will go inside broker.js
// app.listen('3000', () => {
//     console.log('Server running on 3000!');
// });