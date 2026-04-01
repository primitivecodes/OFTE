const express = require('express');
const router = express.Router();
const LearningModule = require('../models/LearningModule');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/modules - list all modules
router.get('/', authMiddleware, async (req, res) => {
  try {
    const modules = await LearningModule.findAll();
    res.json(modules);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/modules - create new module (admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const { title, description, lessonsCount } = req.body;
    const module = await LearningModule.create({ title, description, lessonsCount });
    res.json({ message: 'Module created', module });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
