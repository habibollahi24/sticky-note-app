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

   wrapper.append(noteElement);
   wrapper.classList.add("wrapper");
   noteElement.classList.add("note");

   const closeBtn = document.createElement("div");
   wrapper.append(closeBtn);
   closeBtn.innerText = "+";
   closeBtn.classList.add("close-btn");

   noteElement.title = "remove by dubble click";

   noteElement.value = content;

   noteElement.addEventListener("change", () => {
      // noteElement.style.height = calcHeight(noteElement.value) + "px";
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
   //
   let textareas = document.querySelectorAll("textarea");
   console.log(textareas);
   if (textareas) {
      textareas.forEach((textarea) => {
         textarea.addEventListener("keyup", () => {
            console.log("chom");
            textarea.style.height = calcHeight(textarea.value + 5) + "px";
         });
      });
   }

   //
   //
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

document.addEventListener("DOMContentLoaded", () => {
   let textareas = document.querySelectorAll("textarea");
   console.log(textareas);
   textareas.forEach((textarea) => {
      textarea.style.height = calcHeight(textarea.value) + "px";
   });
   // if (textareas) {
   //    console.log("mount");
   //    document.querySelector("textarea").style.height =
   //       calcHeight(document.querySelector("textarea").value) + "px";
   // }
});

function calcHeight(value) {
   let numberOfLineBreaks = (value.match(/\n/g) || []).length;
   // min-height + lines x line-height + padding + border
   let newHeight = 100 + numberOfLineBreaks * 20 + 12 + 2;
   return newHeight;
}
