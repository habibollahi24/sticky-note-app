const appContainer = document.getElementById("app");
const button = document.querySelector(".note-btn");

getNotes().forEach((item) => {
   const noteElement = createNoteElement(item.id, item.content);
   appContainer.insertBefore(noteElement, button);
});

button.addEventListener("click", () => addNotes());

function getNotes() {
   return JSON.parse(localStorage.getItem("notes")) || [];
}
function saveNotes(notes) {
   localStorage.setItem("notes", JSON.stringify(notes));
}

function createNoteElement(id, content) {
   const noteElement = document.createElement("textarea");
   noteElement.classList.add("note");

   noteElement.title = "remove by dubble click";

   noteElement.value = content;

   noteElement.addEventListener("change", () => {
      updateNote(id, noteElement.value);
   });
   noteElement.addEventListener("dblclick", () => {
      deleteNote(id, noteElement);
   });

   return noteElement;
}

function addNotes() {
   const notes = getNotes();

   const noteItem = {
      id: Math.floor(Math.random() * 100000),
      content: "",
   };

   const noteElement = createNoteElement(noteItem.id, noteItem.content);
   appContainer.insertBefore(noteElement, button);
   document.querySelectorAll(".note").forEach((item) => item.focus());
   document.querySelectorAll(".note").forEach((item) => {
      item.style.width = "200px";
      item.style.padding = "1rem";
   });

   notes.push(noteItem);
   saveNotes(notes);
}

function updateNote(id, newElement) {
   const notes = getNotes();

   const updatedNote = notes.filter((item) => item.id === id)[0];

   updatedNote.content = newElement;
   saveNotes(notes);
}
function deleteNote(id, element) {
   const filteredNotes = getNotes().filter((item) => item.id != id);

   appContainer.removeChild(element);
   saveNotes(filteredNotes);
}
