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
   const wrapper = document.createElement("div");
   const noteElement = document.createElement("textarea");
   noteElement.contentEditable = true;
   wrapper.append(noteElement);
   wrapper.classList.add("wrapper");
   noteElement.classList.add("note");

   const closeBtn = document.createElement("div");
   wrapper.append(closeBtn);
   closeBtn.innerText = "+";
   closeBtn.classList.add("close-btn");

   noteElement.title = "remove by dubble click";

   noteElement.value = content;

   noteElement.addEventListener("keydown", () => {
      updateNote(id, noteElement.value);
   });
   closeBtn.addEventListener("click", () => {
      deleteNote(id, wrapper);
   });

   return wrapper;
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
