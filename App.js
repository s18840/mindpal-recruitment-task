let notes = [];

document.addEventListener("DOMContentLoaded", function () {
  const addNoteButton = document.getElementById("add-note-button");
  const addNoteAboveButton = document.createElement("button");
  addNoteAboveButton.classList.add("add-note-above-button");
  addNoteAboveButton.textContent = "Add New";
  addNoteAboveButton.style.display = "none";

  const emptyNotesDiv = document.getElementById("empty-notes");
  const newNoteContainer = document.querySelector(".new-note-container");
  const notesListContainer = document.querySelector(".notes-list-container");
  const notesContainer = document.querySelector(".notes-container");
  notesContainer.style.display = "none";
  newNoteContainer.style.display = "none";
  const cancelButton = document.querySelector(".cancel-button");

  const saveNoteButton = document.querySelector(".save-note-button");
  saveNoteButton.style.display = "none";

  const inputNoteTitle = document.getElementById("input-note-title");
  const inputNoteBody = document.getElementById("input-note-body");

  const deletePopup = document.getElementById("delete-popup");
  const confirmDeleteButton = document.getElementById("confirm-delete");
  const cancelDeleteButton = document.getElementById("cancel-delete");

  let noteIndexToDelete = null;

  const searchInput = document.getElementById("search-input");

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



  searchInput.addEventListener("input", function () {
    const query = searchInput.value;
    const filteredNotes = searchNotes(query);
    displayNotes(filteredNotes);
  });

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

    notes.splice(index, 1);
    updateNotesList();
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
  });

  inputNoteBody.addEventListener("focus", function () {
    saveNoteButton.style.display = "block";
  });

  inputNoteTitle.addEventListener("focus", function () {
    saveNoteButton.style.display = "block";
  });

  inputNoteTitle.addEventListener("input", function () {
    if (inputNoteTitle.value.trim() !== "") {
      inputNoteTitle.style.backgroundColor = "#fff";
      inputNoteTitle.style.border = "1px solid #1b1c1e";
    } else {
      inputNoteTitle.style.backgroundColor = "#eeeff0";
      inputNoteTitle.style.border = "none";
    }
  });

  inputNoteBody.addEventListener("input", function () {
    if (inputNoteBody.value.trim() !== "") {
      inputNoteBody.style.backgroundColor = "#fff";
      inputNoteBody.style.border = "1px solid #1b1c1e";
    } else {
      inputNoteBody.style.backgroundColor = "#eeeff0";
      inputNoteBody.style.border = "none";
    }
  });

  saveNoteButton.addEventListener("click", function () {
    const title = inputNoteTitle.value;
    const body = inputNoteBody.value;

    if (title || body) {
      const note = {
        title: title || "Untitled Note",
        body: body,
      };
      notes.push(note);

      inputNoteTitle.value = "";
      inputNoteBody.value = "";
      inputNoteTitle.style.backgroundColor = "#eeeff0";
      inputNoteBody.style.backgroundColor = "#eeeff0";
      inputNoteTitle.style.border = "none";
      inputNoteBody.style.border = "none";

      newNoteContainer.style.display = "none";
      emptyNotesDiv.style.display = notes.length === 0 ? "flex" : "none";
      updateNotesList();
      saveNoteButton.style.display = "none";
    }
  });

  if (notes.length > 0) {
    notesContainer.style.display = "none";
  }

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
});
