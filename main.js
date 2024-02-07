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
        event.preventDefault(); // Предотвращаем стандартное поведение клавиши Enter

        // Получаем текущее выделение и диапазон
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        // Создаем элемент перевода строки
        const lineBreak = document.createElement('br');
        // Вставляем перевод строки в текущую позицию курсора
        range.deleteContents();
        range.insertNode(lineBreak);
        // Перемещаем курсор после вставленного перевода строки
        range.setStartAfter(lineBreak);
        range.setEndAfter(lineBreak);
        // Схлопываем выделение в конец диапазона
        selection.removeAllRanges();
        selection.addRange(range);
    }
});