'use strict';

const $taskForm = document.querySelector('.task-form');
const $taskInput = document.querySelector('.task-input');
const $taskList = document.querySelector('.task-list');
const $deleteAllBtn = document.querySelector('.delete-all-button');
const $number = document.querySelector('.number');
let taskList = [];

loadTask();

function loadTask() {
  if (localStorage.getItem('task-list')) {
    taskList = JSON.parse(localStorage.getItem('task-list')) || [];
  }
  $taskList.innerHTML = ``;
  taskList.forEach(task => {
    createTask(task.title, task.id);
  });
}

$taskForm.addEventListener('submit', e => {
  e.preventDefault();
  createTask($taskInput.value);
  $taskInput.value = '';
  $taskInput.focus();
});

function createTask(title, id) {
  const $li = document.createElement('li');
  $li.classList.add('task-item');
  $li.dataset.id = id || Date.now();

  const $deleteBtn = document.createElement('button');
  $deleteBtn.setAttribute('type', 'button');
  $deleteBtn.classList.add('delete-button');
  $deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  $deleteBtn.addEventListener('click', e => {
    const id = e.currentTarget.parentNode.dataset.id;
    e.currentTarget.parentNode.remove();
    const index = taskList.findIndex(task => task.id == id);
    taskList.splice(index, 1);
    localStorage.setItem('task-list', JSON.stringify(taskList));
    updateCount();
  });

  $li.innerHTML = `<span class="task-title">${title}</span>`;
  $li.appendChild($deleteBtn);
  $taskList.appendChild($li);
  if (!id) {
    taskList.push({ id: $li.dataset.id, title });
    localStorage.setItem('task-list', JSON.stringify(taskList));
  }
  updateCount();
}

$deleteAllBtn.addEventListener('click', deleteAll);

function deleteAll() {
  $taskList.innerHTML = ``;
  localStorage.setItem('task-list', '');
  taskList = [];
  updateCount();
}

function updateCount() {
  $number.textContent = $taskList.childElementCount;
}
