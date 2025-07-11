import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const task = new Task({ ...req.body, user: req.userId });
    await task.save();
    res.status(201).json(task);
  } catch {
    res.status(500).json({ error: 'Create task failed' });
  }
});

router.put('/:id', async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    req.body,
    { new: true }
  );
  task ? res.json(task) : res.status(404).json({ error: 'Not found' });
});

router.patch('/:id/complete', async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    { completed: req.body.completed },
    { new: true }
  );
  task ? res.json(task) : res.sendStatus(404);
});

router.delete('/:id', async (req, res) => {
  const resDel = await Task.deleteOne({ _id: req.params.id, user: req.userId });
  resDel.deletedCount ? res.sendStatus(204) : res.status(404).json({ error: 'Not found' });
});

export default router;
