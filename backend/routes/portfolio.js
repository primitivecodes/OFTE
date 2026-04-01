const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Submission = require('../models/Submission');
const Certificate = require('../models/Certificate');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/portfolio/:id - view learner portfolio
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const learner = await User.findByPk(req.params.id);
    if (!learner || learner.role !== 'learner') {
      return res.status(404).json({ error: 'Learner not found' });
    }

    const submissions = await Submission.findAll({ where: { userId: learner.id } });
    const certificates = await Certificate.findAll({ where: { userId: learner.id } });

    res.json({
      learner: {
        id: learner.id,
        name: learner.name,
        email: learner.email
      },
      submissions,
      certificates
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/portfolio - employers view all learners
router.get('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'employer') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const learners = await User.findAll({ where: { role: 'learner' } });
    res.json(learners);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
