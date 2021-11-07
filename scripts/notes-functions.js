

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
    const noteEl = document.createElement('a');
    const textEl = document.createElement('p');
    const statusEl = document.createElement('p')

    //set up the note title text
    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Unnamed Note'
    }
    textEl.classList.add('list-items__title')
    noteEl.appendChild(textEl)

    //setup  the link
    noteEl.setAttribute('href', `./edit.html#${note.id}`)
    noteEl.classList.add('list-item')

    //setup status message
    statusEl.textContent = generateLastEdited(note.updatedAt);
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl);

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
            if(a.title.toLowerCase() < b.title.toLowerCase()) return -1
            else if(a.title.toLowerCase() > b.title.toLowerCase()) return 1
            else return 0
        })
    }
}

//render application
const renderNotes = (notes, filters) => {
    const notesEl =     document.querySelector('#notes')
    note = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    )

    notesEl.innerHTML = ''


    if (filteredNotes.length > 0) {
        filteredNotes.forEach(note => {
            const noteEl = generateNotesDom(note)
            notesEl.appendChild(noteEl);
        })
    } else{
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'No Notes to show'
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }

  
}

//generated Last edited
const generateLastEdited = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`

