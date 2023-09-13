import express from "express";
import ejs from "ejs";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const d = new Date();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

let day = days[d.getDay()];
let date = d.getDate();
let month = months[d.getMonth()];

mongoose.connect("mongodb//127.0.0.1:27017");

const itemsSchema = {
    name: String
};

const completedSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);
const Completed = mongoose.model("Completed", completedSchema);
const item1 = new Item({
    name: "Welcome to your todo list!"
});
const item2 = new Item({
    name: "Hit the + button to add a new item"
});
const item3 = new Item({
    name: "Check the box to delete an item"
});

const defaultItems = [item1, item2, item3];

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    //activities = {};
    console.log('Server listening on port: ' + port);
});

app.get('/', (req,res) => {
    Item.find({}
    ).then(function(foundItems){
        //console.log(foundItems);
        if(foundItems.length === 0){
            Item.insertMany(defaultItems
                ).then(function(){
                    console.log("Data inserted");
                }).catch(function(error){
                    console.log(error);
            });
            res.redirect("/");
        }
        res.render("index.ejs", {
            day: day, 
            date: date,
            month: month,
            activities: foundItems,
        });
    }).catch(function(err){
        console.log(err);
    });
});

app.get('/completed', (req,res) => {
    Completed.find({}
    ).then(function(foundItems){
        res.render("completed.ejs", {
            activities: foundItems
        });
    }).catch(function(err){
        console.log(err);
    })

});

app.post('/submit', (req,res) => {
    const newItem  =  new Item({ name: req.body["activity"] });
    Item.create(newItem);

    res.redirect('/');
    
});

app.post('/delete', (req,res) => {
    const checkedItemid = req.body.checkbox;
    Item.findByIdAndRemove(checkedItemid
    ).then(function(item){
        const task = new Completed({name: item.name});
        Completed.create(task);
        res.redirect('/');
    }).catch(function(err){
        console.log(err);
    });
});
