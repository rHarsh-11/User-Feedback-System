import FeedbackForm from './components/FeedbackForm';
import FeedbackDashboard from './components/FeedbackDashboard';
import FeedbackStats from './components/FeedbackStats';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 font-sans">
      <Toaster position="top-right" />
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-emerald-400">User Feedback System</h1>
          <p className="text-sm text-gray-400 mt-2 sm:mt-0">Effortless User Feedback Management</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-12">
        <FeedbackForm />
        <FeedbackStats />
        <FeedbackDashboard />
      </main>

      <footer className="text-center text-xs text-gray-500 py-6">
        &copy; {new Date().getFullYear()} Feedback System. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
