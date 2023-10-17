const express = require("express");
const path = require("path");
const fs = require ("fs");
const { v4: uuidv4 } = require("uuid");
const PORT = 3001;
const db = require("./db/db.json")

const app = express();

app.use(express.static("public"));
app.use(express.json ());
app.use(express.urlencoded({ extended: true }));

//GET note request
app.get("/notes", (req, res) => {
res.sendFile(path.join(__dirname, "public/notes.html"))
});

//GET API request
app.get("/api/notes", (req, res) => {
  console.log("hit")
  //const noteData = db//(fs.readFile("db/db.json"));
  //console.log(noteData)
  res.json(db);
});

//API POST
app.post("/api/notes", (req, res) => {
  if (req.body) {
    const newNote = {
      title: req.body.title,
      text: req.body.text,
      id:  uuidv4(), //generating unique id
    };
    // Read the existing notes from the JSON file
    const noteData = JSON.parse(fs.readFileSync("./db/db.json"));

    // Adds the new note to the existing notes?
    noteData.push(newNote);

    // Writing the updated notes back to the JSON file
    fs.writeFileSync("./db/db.json", JSON.stringify(noteData));

    res.json(newNote);
  } else {
    res.json("Note Title or Text not found");
  }
});

//GET homepage request
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

//Sending to PORT
app.listen(PORT, () => 
console.log(`SERVER LISTENING ON PORT ${PORT}`)
);

