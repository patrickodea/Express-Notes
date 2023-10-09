const express = require("express");
const path = require("path");
const noteData = require("./db/db.json");


const PORT = 3001;

const app = express();

app.use(express.static("public"));
app.use(express.json ());
app.use(express.urlencoded({ extended: true }));

//Calling Index.html (Homepage)
app.get("*", (req, res) =>
res.send()
);


//GET note route
app.get("/notes", (req, res) =>
res.sendFile(path.join(__dirname, "public/notes.html"))
);

//API?

app.get("/api/notes", (req, res) => res.json(noteData));

app.post("/api/notes", (req, res) => {
    let response;

    if (req.body && req.body.title){
        response = {
            status: "success",
            data: req.body,
        };
        res.json(`Note Title ${response.data.title} has been added!`);
    } else{
        res.json (`Note Title not found`);
    }
    console.log(req.body);
});

//Sending to PORT
app.listen(PORT, () => 
console.log(`SERVER LISTENING ON PORT ${PORT}`)
);