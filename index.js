import express from "express";
import ejs from "ejs";

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log('Server listening on port: ' + port);
});

app.get('/', (req,res) => {
    res.render('index.js');
});

