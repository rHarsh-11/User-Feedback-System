import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: '',
    category: 'suggestion',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/feedback', formData);
      toast.success('Feedback submitted!');
      setFormData({ name: '', email: '', feedback: '', category: 'suggestion' });
    } catch (err) {
      toast.error('Failed to submit feedback');
    }
  };

  return (
    <section className="bg-slate-800 border border-slate-700 shadow-md rounded-xl p-6 sm:p-8">
      <h2 className="text-xl font-semibold text-gray-100 mb-4">Submit Feedback</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-slate-700 text-gray-100 border border-slate-600 px-4 py-2 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-slate-700 text-gray-100 border border-slate-600 px-4 py-2 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
            required
          />
        </div>

        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full bg-slate-700 text-gray-100 border border-slate-600 px-4 py-2 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
        >
          <option value="suggestion">Suggestion</option>
          <option value="bug report">Bug Report</option>
          <option value="feature request">Feature Request</option>
          <option value="ui improvement">UI Improvement</option>
          <option value="performance">Performance</option>
          <option value="other">Other</option>
        </select>

        <textarea
          placeholder="Write your feedback here..."
          value={formData.feedback}
          onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
          className="w-full bg-slate-700 text-gray-100 border border-slate-600 px-4 py-2 h-32 resize-none rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
          required
        />

        <button
          type="submit"
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-6 rounded-md transition duration-200"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default FeedbackForm;