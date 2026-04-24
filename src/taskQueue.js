// taskQueue.js - Gestion basique en mémoire et fichier JSON
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/tasks.json');

function loadTasks() {
  if (!fs.existsSync(DATA_FILE)) return [];
  const data = fs.readFileSync(DATA_FILE, 'utf8');
  return data ? JSON.parse(data) : [];
}

function saveTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

function getAllTasks() {
  return loadTasks();
}

function addTask(task) {
  const tasks = loadTasks();
  const newTask = { id: Date.now(), status: 'pending', ...task };
  tasks.push(newTask);
  saveTasks(tasks);
  return newTask;
}

function updateTask(id, fields) {
  const tasks = loadTasks();
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return null;
  tasks[idx] = { ...tasks[idx], ...fields };
  saveTasks(tasks);
  return tasks[idx];
}

function deleteTask(id) {
  let tasks = loadTasks();
  const preLen = tasks.length;
  tasks = tasks.filter(t => t.id !== id);
  saveTasks(tasks);
  return tasks.length < preLen;
}

module.exports = { getAllTasks, addTask, updateTask, deleteTask };