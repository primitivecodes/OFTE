const cron = require('node-cron');
const User = require('../models/User');

// Run daily at midnight
cron.schedule('0 0 * * *', async () => {
  try {
    const now = new Date();
    const learners = await User.findAll({ where: { role: 'learner', subscriptionStatus: 'active' } });

    for (const learner of learners) {
      if (learner.subscriptionExpiresAt && learner.subscriptionExpiresAt < now) {
        learner.subscriptionStatus = 'inactive';
        learner.hasPaidAccess = false;
        await learner.save();
        console.log(`Subscription expired for learner ${learner.email}`);
      }
    }
  } catch (err) {
    console.error('Cron job error:', err);
  }
});
