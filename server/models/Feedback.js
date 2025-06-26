import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    feedback: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'suggestion',
        'bug report',
        'feature request',
        'ui improvement',
        'performance',
        'other',
      ],
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'resolved'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;
