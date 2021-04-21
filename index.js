const express = require('express');
const exphbs  = require('express-handlebars');
const fetch = require('node-fetch');
const fs = require('fs');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const apiUrl = {
    base: 'https://api.giphy.com/v1/gifs/search',
    key: 'RowCuvnkiP1yew6ix6ogw7ckHTUOJMwS',
    query: 'ball',
    limit: 25
}


app.get('/', (req, res) => {
    async function getImages() {
        const images = await fetch(
            `${apiUrl.base}?api_key=${apiUrl.key}&q=${apiUrl.query}&limit=${apiUrl.limit}&offset=0&lang=en`
        );
        let response = await images.json();
        let sortedData = response["data"].sort(function (a, b) {
            return a.rating.localeCompare(b.rating);
        });
        saveDataToFile(sortedData, function(err) {
            if (err) {
                throw err;
            }
            console.log("JSON data is saved.");
        });
    }
    getImages();

    readFile('./images.json', (err, data) => {
        if (err) {
            throw err;
        }
        const gifs = JSON.parse(data);
        res.render('home', {gifs: gifs});
    });
});

function saveDataToFile(data, callback) {
    firstTenElements = data.slice(0,10)
    fs.writeFile('./images.json', JSON.stringify(firstTenElements, null, 2), callback);
}

function readFile(path, callback) {
    fs.readFile(path, 'utf-8', callback);
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)});