import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var activities = {};

const d = new Date();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

let day = days[d.getDay()];
let date = d.getDate();
let month = months[d.getMonth()];

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log('Server listening on port: ' + port);
});

app.get('/', (req,res) => {
    res.render("index.ejs", {
        day: day, 
        date: date,
        month: month,
    });
});

app.post('/submit', (req,res) => {
    var activity = req.body["activity"];
    //console.log(activity);
    
    activities[activity] = true;

    res.render("index.ejs", {
        day: day, 
        date: date,
        month: month,
        activities: activities,
    });
    
});
