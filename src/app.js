// app.js - API Express pour Task Queue
const express = require('express');
const bodyParser = require('body-parser');
const { getAllTasks, addTask, updateTask, deleteTask } = require('./taskQueue');
const app = express();
app.use(bodyParser.json());

// Lister toutes les tâches
app.get('/tasks', (req,res) => {
  res.json(getAllTasks());
});
// Créer une tâche
app.post('/tasks', (req,res) => {
  const newTask = addTask(req.body);
  res.status(201).json(newTask);
});
// Modifier une tâche
app.put('/tasks/:id', (req,res) => {
  const updated = updateTask(Number(req.params.id), req.body);
  if (!updated) return res.status(404).json({ error: 'Tâche non trouvée' });
  res.json(updated);
});
// Supprimer une tâche
app.delete('/tasks/:id', (req,res) => {
  const ok = deleteTask(Number(req.params.id));
  res.json({ success: ok });
});

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Task Queue API running on port', PORT));
