const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate');
const Submission = require('../models/Submission');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/certificates - issue certificate (admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const { userId, title } = req.body;
    const certificate = await Certificate.create({ userId, title });
    res.json({ message: 'Certificate issued', certificate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/certificates/my - learner views own certificates
router.get('/my', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'learner') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const certificates = await Certificate.findAll({ where: { userId: req.user.id } });
    res.json(certificates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
