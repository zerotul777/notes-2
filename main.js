const notesContainer = document.querySelector('.notes-container')
const createBtn = document.querySelector('.btn')
let notes = document.querySelectorAll('.input-box')

function showNotes() {
    notesContainer.innerHTML = localStorage.getItem('notes');
}
showNotes();

function updateStorage() {
    localStorage.setItem('notes', notesContainer.innerHTML);
}

createBtn.addEventListener('click', () => {
    let inputBox = document.createElement('p');
    let img = document.createElement('img');
    inputBox.className = 'input-box';
    inputBox.setAttribute('contenteditable', 'true');
    img.src = 'images/delete.png';
    notesContainer.appendChild(inputBox).appendChild(img);
})

notesContainer.addEventListener('click', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.parentElement.remove();
        updateStorage();
    } else if (e.target.tagName === 'P') {
        notes = document.querySelectorAll('.input-box');
        notes.forEach(nt => {
            nt.onkeyup = function() {
                updateStorage();
            }
        })
    }
})

// document.addEventListener('keydown', event => {
//     if (event.key === 'Enter') {
//         document.execCommand('insertLineBreak');
//         event.preventDefault();
//     }
// })


document.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        event.preventDefault();

        const range = window.getSelection().getRangeAt(0);
        const lineBreak = document.createElement('br');

        range.deleteContents();
        range.insertNode(lineBreak);

        range.setStartAfter(lineBreak);
        range.setEndAfter(lineBreak);

        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    }
});