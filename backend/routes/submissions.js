const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/submissions - learner submits work
router.post('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'learner') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const { moduleId, content } = req.body;
    const submission = await Submission.create({
      userId: req.user.id,
      moduleId,
      content
    });
    res.json({ message: 'Submission created', submission });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/submissions/:id/grade - admin grades submission
router.put('/:id/grade', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const submission = await Submission.findByPk(req.params.id);
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    submission.grade = req.body.grade;
    await submission.save();
    res.json({ message: 'Submission graded', submission });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
