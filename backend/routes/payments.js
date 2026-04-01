const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const User = require('../models/User');

// POST /api/payments/unlock
router.post('/unlock', async (req, res) => {
  try {
    const { userId, code } = req.body;

    if (!userId || !code) {
      return res.status(400).json({ error: 'Missing userId or code' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Save payment attempt
    const payment = await Payment.create({ userId, code });

    // Check unlock code
    if (code === process.env.PAYMENT_UNLOCK_CODE) {
      payment.status = 'success';
      await payment.save();

      if (user.role === 'learner') {
        user.hasPaidAccess = true;
        user.subscriptionStatus = 'active';
        user.subscriptionExpiresAt = new Date(Date.now() + 30*24*60*60*1000); // 30 days
      }

      if (user.role === 'employer') {
        user.isEmployerVerified = true;
      }

      await user.save();
      return res.json({ message: 'Unlock successful', user });
    } else {
      payment.status = 'failed';
      await payment.save();
      return res.status(400).json({ error: 'Invalid code' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
