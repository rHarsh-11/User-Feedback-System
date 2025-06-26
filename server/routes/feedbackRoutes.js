import express from 'express';
import {
  submitFeedback,
  getFeedback,
  getFeedbackStats,
  updateFeedbackStatus,
} from '../controllers/feedbackController.js';

const router = express.Router();

router.post('/', submitFeedback);
router.get('/', getFeedback);
router.get('/stats', getFeedbackStats);
router.patch('/:id', updateFeedbackStatus); // admin status update

export default router;
