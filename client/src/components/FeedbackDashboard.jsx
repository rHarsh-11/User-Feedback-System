import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const FeedbackDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [sortBy, setSortBy] = useState('createdAt');
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchFeedback = async () => {
    try {
      const query = `?sortBy=${sortBy}&page=${page}&search=${search}${category ? `&category=${category}` : ''}`;
      const { data } = await axios.get(`http://localhost:5000/feedback${query}`);
      setFeedbacks(data.feedbacks);
      setTotalPages(data.totalPages);
    } catch (err) {
      toast.error('Failed to fetch feedback');
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, [sortBy, category, page, search]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/feedback/${id}`, { status: newStatus });
      toast.success('Status updated');
      fetchFeedback();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'reviewed': return 'bg-blue-500';
      case 'resolved': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <section className="bg-slate-800 border border-slate-700 shadow-md rounded-xl p-6 sm:p-8">
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        <div>
          <label className="text-sm font-medium text-gray-300 mb-1 block">Search</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-700 text-gray-100 border border-slate-600 px-3 py-2 rounded-md focus:ring-2 focus:ring-emerald-500"
            placeholder="Search feedback..."
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-300 mb-1 block">Sort By</label>
          <select
            className="w-full bg-slate-700 text-gray-100 border border-slate-600 px-3 py-2 rounded-md focus:ring-2 focus:ring-emerald-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="createdAt">Newest</option>
            <option value="name">Name</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-300 mb-1 block">Filter Category</label>
          <select
            className="w-full bg-slate-700 text-gray-100 border border-slate-600 px-3 py-2 rounded-md focus:ring-2 focus:ring-emerald-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All</option>
            <option value="suggestion">Suggestion</option>
            <option value="bug report">Bug Report</option>
            <option value="feature request">Feature Request</option>
            <option value="ui improvement">UI Improvement</option>
            <option value="performance">Performance</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="flex items-end justify-start">
          <button
            onClick={() => setSearch('')}
            className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-md"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {feedbacks.length === 0 ? (
          <p className="text-center text-gray-400">No feedback found.</p>
        ) : (
          feedbacks.map((f) => (
            <div key={f._id} className="bg-slate-700 border border-slate-600 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-100">{f.name}</h3>
                <time className="text-xs text-gray-400">{new Date(f.createdAt).toLocaleString()}</time>
              </div>
              <p className="text-sm text-gray-400 italic">{f.email}</p>
              <p className="mt-2 text-gray-200">{f.feedback}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="bg-emerald-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                  {f.category}
                </span>
                <span className={`text-white text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(f.status)}`}>
                  {f.status}
                </span>
                <select
                  value={f.status}
                  onChange={(e) => handleStatusChange(f._id, e.target.value)}
                  className="ml-auto text-sm bg-slate-600 border border-slate-500 px-2 py-1 rounded-md text-white"
                >
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-4">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-slate-600 text-white rounded-md disabled:opacity-40"
        >
          Prev
        </button>
        <span className="text-gray-300">Page {page} of {totalPages}</span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-slate-600 text-white rounded-md disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default FeedbackDashboard;
