// to do
// edit
// edit button

//buttons functions

function hideOrShow() {
  let button = document.querySelector('.completed-hide')
  let buttonText = button.textContent

  let goalsCompleted = document.querySelector('.goals-todo.completed')

  if (buttonText == 'Hide') {
    goalsCompleted.classList.add('hidden')
    button.textContent = 'Show'
  } else if (buttonText == 'Show') {
    goalsCompleted.classList.remove('hidden')
    button.textContent = 'Hide'
  }
}
// show input to insert todo items
function showInput() {
  document.querySelector('.goals-input').classList.remove('hidden')
  document.querySelector('.goals-confirm').classList.remove('hidden')
}

function editButton(item) {
  let newItem = document.querySelector(`.todo-item[value='${item}']`)

  todoList.forEach(currentItem => {
    if (currentItem.item == item) {
      currentItem.item = newItem.value
    }
  })

  clearContent()
  loop()
}

function insertButton() {
  let input = document.querySelector('.goals-input')
  let item = input.value

  if (!item) {
    // red outline
    input.classList.add('error')
    return
  }

  input.classList.remove('error')

  todoList.push({ item: item, checked: false })

  document.querySelector('.goals-input').classList.add('hidden')
  document.querySelector('.goals-confirm').classList.add('hidden')

  clearContent()
  loop()
}
function deleteButton(item) {
  let deleteIndex

  todoList.forEach(currentItem => {
    if (currentItem.item == item) {
      deleteIndex = todoList.indexOf(currentItem)
    }
  })

  todoList.splice(deleteIndex, 1)

  clearContent()
  loop()
}

function checkButton(item) {
  todoList.forEach(currentItem => {
    if (currentItem.item == item) {
      currentItem.checked = !currentItem.checked
    }
  })

  clearContent()
  loop()
}

let todoList = [
  {
    item: 'Lavar a louça',
    checked: false
  },
  {
    item: 'Cortar o cabelo',
    checked: true
  },

  {
    item: 'Varrer a casa',
    checked: false
  }
]

function clearContent() {
  document.querySelector('.goals-todo').innerHTML = null
  document.querySelector('.goals-todo.completed').innerHTML = null
}

function itemWrapperTemplate(item) {
  let span = null
  let checkButton = null
  if (item.checked == false) {
    span = 'todo-item'
    checkButton = 'item-check'
  } else if (item.checked == true) {
    span = 'todo-item completed'
    checkButton = 'item-check uncheck'
  }

  return `<div class="item-wrapper">
          
          
          <input type="text" class="${span}" value="${item.item}" onchange="editButton('${item.item}')" />
          <div class="group-items">
            <button class="${checkButton}" onclick="checkButton('${item.item}')"></button>
            
            <button class="item-delete" onclick="deleteButton('${item.item}')"></button>
          </div>
          
    </div>
    <hr class="line" />`
}

function render(item) {
  let listArea = null

  if (item.checked == false) {
    listArea = document.querySelector('.goals-todo')
  } else if (item.checked == true) {
    listArea = document.querySelector('.goals-todo.completed')
  }

  listArea.innerHTML = listArea.innerHTML + itemWrapperTemplate(item)
}

function loop() {
  todoList.map(function (item) {
    return render(item)
  })
}

loop()
