const express = require("express");
const path = require("path");
const termData = require("./api/notes")
const PORT = 3001;

const app = express();

app.use(express.static("public"));


//Calling Index.html (Homepage)
app.get("*", (req, res) =>
res.send()
);


//API?

app.get("/api/notes", (req, res) => res.json(termData));

//GET note route
app.get("/notes", (req, res) =>
res.sendFile(path.join(__dirname, "public/notes.html"))
);



//Sending to PORT
app.listen(PORT, () => 
console.log(`SERVER LISTENING ON PORT ${PORT}`)
);