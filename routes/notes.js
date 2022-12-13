const notes = require("express").Router();
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");
const fs = require("fs");

notes.get("/", (req, res) => {
  // GET Route for retrieving all the notes
  console.log(`${req.method} request received for notes`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});
notes.post("/", (req, res) => {
  // POST Route for a new note
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");
    const response = {
      status: "success",
      body: newNote,
    };

    res.json(response);
  } else {
    res.json("Error in posting note");
  }
});

// DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete.
notes.delete("/:id", (req, res) => {
  const { id } = req.params;
  readFromFile("./db/db.json").then((data) => {
    const parsedNotes = JSON.parse(data);
    const deleteNote = parsedNotes.filter((note) => note.id !== id);
    fs.writeFile("./db/db.json", JSON.stringify(deleteNote), (err) =>
      err ? console.err(err) : console.info(`\nNote ${id} has been deleted\n`)
    );
    res.json(deleteNote);
  });
});

module.exports = notes;
