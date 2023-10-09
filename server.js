const express = require("express");
const path = require("path");
const noteData = require("./db/db.json");
const fs = require ("fs");


const PORT = 3001;

const app = express();

app.use(express.static("public"));
app.use(express.json ());
app.use(express.urlencoded({ extended: true }));

//GET homepage request
app.get("/", (req, res) =>
res.send("index.html")
);


//GET note request
app.get("/notes", (req, res) =>
res.sendFile(path.join(__dirname, "public/notes.html"))
);

//API?

app.get("/api/notes", (req, res) => {
    res.json(noteData)
});

app.post("/api/notes", (req, res) => {

    if (req.body) {
    const newNote = {
        title: req.body[0].title,
        text: req.body[0].text,
    };

      // Read the existing notes from the JSON file
    const noteData = JSON.parse(fs.readFileSync("./db/db.json"));

      // Add the new note to the existing notes
    noteData.push(newNote);

      // Write the updated notes back to the JSON file
    fs.writeFileSync("./db/db.json", JSON.stringify(noteData));

    res.json(`Note Title ${newNote.title} has been added!`);
    } else {
    res.json("Note Title or Text not found");
    }
});

//Sending to PORT
app.listen(PORT, () => 
console.log(`SERVER LISTENING ON PORT ${PORT}`)
);

