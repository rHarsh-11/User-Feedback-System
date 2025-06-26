import Feedback from "../models/Feedback.js";

export const submitFeedback = async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
};

export const getFeedback = async (req, res) => {
  try {
    const { sortBy = 'createdAt', category, search = '', page = 1, limit = 5 } = req.query;

    const query = {};
    
    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { feedback: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Feedback.countDocuments(query);

    const feedbacks = await Feedback.find(query)
      .sort({ [sortBy]: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      feedbacks,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
};


export const getFeedbackStats = async (req, res) => {
  try {
    const stats = await Feedback.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);
    const result = {};
    stats.forEach((s) => {
      result[s._id] = s.count;
    });
    res.json(result);
  } catch (err) {
    console.error('Error generating stats:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateFeedbackStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const validStatus = ['pending', 'reviewed', 'resolved'];

    if (!validStatus.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const updated = await Feedback.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    res.status(200).json({ message: 'Status updated successfully' });
  } catch (err) {
    console.error('Error updating status:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

