const inp = document.querySelector("#inp");
const addBtn = document.querySelector("#addBtn");
const saveBtn = document.querySelector("#saveBtn");
const deleteBtn = document.querySelector("#deleteBtn");
const list = document.querySelector("#list");

// Local Storage Functions start
function getTodo() {
  let listItmes = localStorage.getItem("items");
  listItmes = listItmes ? JSON.parse(listItmes) : [];
  return listItmes;
}

function saveTodo(listItems) {
  const listItemsString = JSON.stringify(listItems);
  localStorage.setItem("items", listItemsString);
}

function insertItem(itemToInsert) {
  const listItmes = getTodo();
  listItmes.push(itemToInsert);
  saveTodo(listItmes);
}

function deleteAllTodoList() {
  localStorage.removeItem("items");
  inp.value = "";
  addBtn.style.display = "block";
  saveBtn.style.display = "none";
  refreshList();
}

function deleteTodoList(item) {
  let listItems = getTodo();

  listItems = listItems.filter((element) => element !== item.trim());

  saveTodo(listItems);
}
// Local Storage Functions end

function deleteTodo(liElement) {
  // console.log(liElement);
  liElement.children[1].addEventListener("click", () => {
    const item = liElement.innerText;

    deleteTodoList(item);

    refreshList();
  });
  return;
}


function checkedTodo(liElement) {
  // console.log(liElement.firstChild);
  liElement.firstChild.addEventListener("click", () => {
    liElement.classList.toggle("done");
  });
  return;
}

function editTodo(liElement) {
  liElement.lastChild.addEventListener("click", () => {
    inp.name = liElement.innerText;
    // console.log(text);
    inp.value = liElement.innerText;
    addBtn.style.display = "none";
    saveBtn.style.display = "block";
  });
  return;
}

saveBtn.addEventListener("click", () => {
  let listItems = getTodo();
  const idx = listItems.indexOf(inp.name);
  // console.log(idx);
  listItems[idx] = inp.value;
  saveTodo(listItems);
  inp.value = "";
  addBtn.style.display = "block";
  saveBtn.style.display = "none";
  refreshList();
});

function insertItemOnClick(e) {
  if (inp.value != "") {
    const val = inp.value;
    insertItem(val);
    refreshList();
    inp.value = "";
  }
  return;
}

function insertItemOnPress(e) {
  if (e.keyCode == 13 && e.target.value != "") {
    const val = inp.value;
    insertItem(val);
    refreshList();
    inp.value = "";
  }
  return;
}

addBtn.addEventListener("click", insertItemOnClick);

inp.addEventListener("keypress", insertItemOnPress);
deleteBtn.addEventListener("click", deleteAllTodoList);

function refreshList() {
  list.innerHTML = "";

  const todos = getTodo();

  todos.forEach((element) => {
    const liElement = document.createElement("li");
    liElement.innerHTML = `<span>${element}</span> <span class="trash"><i class="fa-solid fa-trash-can"> </i></span> <span class="edit"><i class="fa-solid fa-pen-to-square"> </i></span>`;

    deleteTodo(liElement);
    // Mark todo done
    checkedTodo(liElement);

    // edit todo
    console.log(liElement);
    editTodo(liElement);

    list.appendChild(liElement);
  });
}

refreshList();
