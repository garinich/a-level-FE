function updateView(list, DATA) {
    let html = '';

    DATA.forEach(function (element, i) {
        html += getTemplete('', element);
    });

    list.innerHTML += html;
}

function addEventsToElement(el) {
    let wrapper = document.querySelector('#wrapper');
    let removeBtn = el.querySelector('.delete');
    let editBtn = el.querySelector('.edit');
    let input = el.querySelector('input');
    let text = el.querySelector('.text');

    removeBtn.addEventListener('click', function () {
        if(!wrapper.classList.contains('disabled')) {
            el.remove();
        }
    });

    editBtn.addEventListener('click', function () {
        if(!wrapper.classList.contains('disabled')) {
            if (el.classList.contains('edit')) {
                editBtn.innerText = 'Edit';
                el.classList.remove('edit');
                text.innerText = input.value;
            } else {
                editBtn.innerText = 'Save';
                el.classList.add('edit');
                el.querySelector('input').focus();
            }
        }
    });
}

function addEventsToAllElements(list) {
    let elements = list.querySelectorAll('li');

    elements.forEach(function (el) {
        addEventsToElement(el);
    });
}

function getTemplete(className, value) {
    return `<li class="${className}"> 
                <span class="text">${value}</span>  
                <input type="text" value="${value}"> 
                <button class="delete">Delete</button> 
                <button class="edit">${className.length > 0 ? 'Save' : 'Edit'}</button> 
            </li>`;
}

function start() {
    let wrapper = document.querySelector('#wrapper');
    let getBtn = document.querySelector('#get');
    let list = document.querySelector('#list');
    let clearBtn = document.querySelector('#clear');
    let addBtn = document.querySelector('#add');
    let busy = false;

    getBtn.addEventListener('click', function () {
        if(!busy) {
            busy = true;
            list.classList.add('preloader');
            wrapper.classList.add('disabled');
            setTimeout(function(){
                updateView(list, DATA);
                addEventsToAllElements(list);
                busy = false;
                list.classList.remove('preloader');
                wrapper.classList.remove('disabled');
            }, 3000);
        }
    });

    clearBtn.addEventListener('click', function () {
        if(!busy) {
            list.innerHTML = '';
        }
    });

    addBtn.addEventListener('click', function () {
        if(!busy) {
            list.innerHTML += getTemplete('edit', '');
            addEventsToAllElements(list);
            list.querySelector('li:last-child input').focus();
        }
    });
}

window.addEventListener('load', start);


