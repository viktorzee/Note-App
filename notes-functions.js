

const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes');
    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch (error) {
        return []
    }
    
}

const savedNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes));
}

//remove note from the list
const removeNotes = (id) => {
    const noteIndex = notes.findIndex(note => note.id === id
    )
    
    if(noteIndex > -1){
        notes.splice(noteIndex, 1)
    }
}

//generate note dom
const generateNotesDom = (note) => {
    const noteEl = document.createElement('div');
    const textEl = document.createElement('a');
    const removeButton = document.createElement('button');

    //set up the delete button
    removeButton.textContent = 'x'
    noteEl.appendChild(removeButton)
    removeButton.addEventListener('click', function () {
        removeNotes(note.id);
        savedNotes(notes)
        renderNotes(notes, filters)
    })

    //set up the note title text
    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Unnamed Note'
    }
    textEl.setAttribute('href', `./edit.html#${note.id}`)
    noteEl.appendChild(textEl)

    return noteEl
}

//sort note by either of the three methods
const sortNotes = (notes, sortBy) => {
    if(sortBy === 'byEdited'){
        return notes.sort((a, b) => {
            if(a.updatedAt > b.updatedAt) return -1
            else if(a.updatedAt < b.updatedAt) return 1
            else return 0
        })
    } else if( sortBy === 'byCreated'){
        return notes.sort((a, b) => {
            if(a.createdAt > b.createdAt) return -1
            else if(a.createdAt < b.createdAt) return 1
            else return 0
        })
    } else if(sortBy === 'alphabetical'){
        return notes.sort((a, b) => {
            if(a.title.toLowerCase() > b.title.toLowerCase()) return -1
            else if(a.title.toLowerCase() < b.title.toLowerCase()) return 1
            else return 0
        })
    }
}

//render application
const renderNotes = (notes, filters) => {
    note = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    )

    document.querySelector('#notes').innerHTML = ''

    filteredNotes.forEach(note => {
        const noteEl = generateNotesDom(note)
        document.querySelector('#notes').appendChild(noteEl);
    })
}

//generated Last edited
const generateLastEdited = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`