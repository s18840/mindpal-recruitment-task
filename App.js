let notes = [];

document.addEventListener("DOMContentLoaded", function () {
  const addNoteButton = document.getElementById("add-note-button");
  const addNoteAboveButton = document.createElement("button");
  addNoteAboveButton.classList.add("add-note-above-button");
  addNoteAboveButton.textContent = "Add New";
  addNoteAboveButton.style.display = "none";

  const emptyNotesDiv = document.getElementById("empty-notes");
  const newNoteContainer = document.querySelector(".new-note-container");
  newNoteContainer.style.display = "none";

  const notesListContainer = document.querySelector(".notes-list-container");
  const notesContainer = document.querySelector(".notes-container");
  notesContainer.style.display = "none";

  const cancelButton = document.querySelector(".cancel-button");
  const saveNoteButton = document.querySelector(".save-note-button");
  saveNoteButton.style.display = "none";

  const inputNoteTitle = document.getElementById("input-note-title");
  const inputNoteBody = document.getElementById("input-note-body");
  const deletePopup = document.getElementById("delete-popup");
  const confirmDeleteButton = document.getElementById("confirm-delete");
  const cancelDeleteButton = document.getElementById("cancel-delete");
  const searchComponent = document.querySelector(".search-component");
  const searchInput = document.getElementById("search-input");
  let noteIndexToDelete = null;
  let editNoteIndex = null;

  function formatDate(date) {
    const options = { month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  function searchNotes(query) {
    const lowerCaseQuery = query.toLowerCase();
    const filteredNotes = notes.filter((note) => {
      const titleMatches = note.title.toLowerCase().includes(lowerCaseQuery);
      const bodyMatches = note.body.toLowerCase().includes(lowerCaseQuery);
      const dateMatches = formatDate(new Date())
        .toLowerCase()
        .includes(lowerCaseQuery);
      return titleMatches || bodyMatches || dateMatches;
    });
    return filteredNotes;
  }

  function displayNotes(notesToDisplay) {
    notesListContainer.innerHTML = "";

    if (notesToDisplay.length > 0) {
      notesContainer.style.display = "none";
      addNoteAboveButton.style.display = "block";
      notesListContainer.appendChild(addNoteAboveButton);
    } else {
      notesContainer.style.display = "block";
      addNoteAboveButton.style.display = "none";
    }

    notesToDisplay.forEach((note, index) => {
      const noteDiv = document.createElement("div");
      noteDiv.classList.add("note");

      noteDiv.innerHTML = `
        <div class="notes-list-header">
          <div class="notes-title-bold">${note.title}</div>
          <div class="notes-buttons-wrapper">
            <button class="edit-button" data-index="${index}">
              <img class="note-edit-icon" src="assets/note_edit.svg" alt="Note Edit Icon" />
            </button>
            <button class="remove-button" data-index="${index}">
              <img class="note-remove-icon" src="assets/note_remove.svg" alt="Note Remove Icon" />
            </button>
          </div>
        </div>
        <div class="notes-list-body">${note.body}</div>
        <div class="notes-date">${formatDate(new Date())}</div>
      `;

      notesListContainer.appendChild(noteDiv);
    });

    document.querySelectorAll(".edit-button").forEach((button) => {
      button.addEventListener("click", function () {
        const noteIndex = this.getAttribute("data-index");
        editNote(noteIndex);
      });
    });

    document.querySelectorAll(".remove-button").forEach((button) => {
      button.addEventListener("click", function () {
        const noteIndex = this.getAttribute("data-index");
        removeNoteWithConfirmation(noteIndex);
      });
    });
  }

  function updateNotesList() {
    notesListContainer.innerHTML = "";

    if (notes.length > 0) {
      notesContainer.style.display = "none";
      addNoteAboveButton.style.display = "block";
      notesListContainer.appendChild(addNoteAboveButton);
    } else {
      notesContainer.style.display = "block";
      addNoteAboveButton.style.display = "none";
    }

    notes.forEach((note, index) => {
      const noteDiv = document.createElement("div");
      noteDiv.classList.add("note");

      noteDiv.innerHTML = `
        <div class="notes-list-header">
          <div class="notes-title-bold">${note.title}</div>
          <div class="notes-buttons-wrapper">
            <button class="edit-button" data-index="${index}">
              <img class="note-edit-icon" src="assets/note_edit.svg" alt="Note Edit Icon" />
            </button>
            <button class="remove-button" data-index="${index}">
              <img class="note-remove-icon" src="assets/note_remove.svg" alt="Note Remove Icon" />
            </button>
          </div>
        </div>
        <div class="notes-list-body">${note.body}</div>
        <div class="notes-date">${formatDate(new Date())}</div>
      `;

      notesListContainer.appendChild(noteDiv);
    });

    document.querySelectorAll(".edit-button").forEach((button) => {
      button.addEventListener("click", function () {
        const noteIndex = this.getAttribute("data-index");
        editNote(noteIndex);
      });
    });

    document.querySelectorAll(".remove-button").forEach((button) => {
      button.addEventListener("click", function () {
        const noteIndex = this.getAttribute("data-index");
        removeNoteWithConfirmation(noteIndex);
      });
    });
  }

  updateNotesList();

  function editNote(index) {
    const note = notes[index];
    inputNoteTitle.value = note.title;
    inputNoteBody.value = note.body;

    newNoteContainer.style.display = "flex";
    emptyNotesDiv.style.display = "none";
    addNoteAboveButton.style.display = "none";

    editNoteIndex = index;
  }

  function removeNoteWithConfirmation(index) {
    noteIndexToDelete = index;
    deletePopup.style.display = "flex";
  }

  addNoteButton.addEventListener("click", function () {
    newNoteContainer.style.display = "flex";
    emptyNotesDiv.style.display = "none";
    addNoteAboveButton.style.display = "none";
  });

  addNoteAboveButton.addEventListener("click", function () {
    newNoteContainer.style.display = "flex";
    emptyNotesDiv.style.display = "none";
    addNoteAboveButton.style.display = "none";
  });

  cancelButton.addEventListener("click", function () {
    newNoteContainer.style.display = "none";
    emptyNotesDiv.style.display = notes.length === 0 ? "flex" : "none";
    if (notes.length > 0) {
      addNoteAboveButton.style.display = "block";
    }

    inputNoteTitle.value = "";
    inputNoteBody.value = "";
    editNoteIndex = null;
  });

  inputNoteBody.addEventListener("focus", function () {
    saveNoteButton.style.display = "block";
  });

  inputNoteTitle.addEventListener("focus", function () {
    saveNoteButton.style.display = "block";
  });

  saveNoteButton.addEventListener("click", function () {
    const title = inputNoteTitle.value;
    const body = inputNoteBody.value;

    if (title || body) {
      const note = {
        title: title || "Untitled Note",
        body: body,
      };

      if (editNoteIndex !== null) {
        notes[editNoteIndex] = note;
        editNoteIndex = null;
      } else {
        notes.push(note);
      }

      inputNoteTitle.value = "";
      inputNoteBody.value = "";

      newNoteContainer.style.display = "none";
      emptyNotesDiv.style.display = notes.length === 0 ? "flex" : "none";
      updateNotesList();
      saveNoteButton.style.display = "none";
    }
  });

  searchInput.addEventListener("input", function () {
    const query = searchInput.value;
    const filteredNotes = searchNotes(query);
    displayNotes(filteredNotes);
  });

  searchComponent.addEventListener("click", function () {
    searchInput.focus();
  });

  cancelDeleteButton.addEventListener("click", function () {
    deletePopup.style.display = "none";
  });

  confirmDeleteButton.addEventListener("click", function () {
    if (noteIndexToDelete !== null) {
      notes.splice(noteIndexToDelete, 1);
      updateNotesList();
      deletePopup.style.display = "none";
      noteIndexToDelete = null;
      if (notes.length <= 0) {
        emptyNotesDiv.style.display = "flex";
      }
    }
  });

  if (notes.length > 0) {
    notesContainer.style.display = "none";
  }
});
