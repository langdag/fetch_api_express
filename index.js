const express = require('express');
const exphbs  = require('express-handlebars');
const fetch = require('node-fetch');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    async function getImages() {
        const images = await fetch(
            "https://api.giphy.com/v1/gifs/search?api_key=RowCuvnkiP1yew6ix6ogw7ckHTUOJMwS&q=cheese&limit=25&offset=0&lang=en"
        );
        let response = await images.json();
        console.log(response);
    }

    getImages();
    res.render('home');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)});