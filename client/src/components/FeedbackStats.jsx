import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const FeedbackStats = () => {
  const [data, setData] = useState({});

  const fetchStats = async () => {
    try {
      const res = await axios.get('http://localhost:5000/feedback/stats');
      const categories = Object.keys(res.data);
      const counts = Object.values(res.data);

      setData({
        labels: categories,
        datasets: [
          {
            label: 'Feedback Count',
            data: counts,
            backgroundColor: 'rgba(16, 185, 129, 0.8)',
            borderRadius: 6,
          },
        ],
      });
    } catch (err) {
      console.error('Error loading stats:', err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <section className="bg-slate-800 border border-slate-700 shadow-md rounded-xl p-6 sm:p-8">
      <h2 className="text-xl font-semibold text-gray-100 mb-4">Feedback Overview</h2>
      <div className="h-72">
        {data.labels ? (
          <Bar
            data={data}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  ticks: {
                    color: '#CBD5E1',
                  },
                  grid: {
                    color: '#334155',
                  },
                },
                x: {
                  ticks: {
                    color: '#CBD5E1',
                  },
                  grid: {
                    display: false,
                  },
                },
              },
            }}
          />
        ) : (
          <p className="text-gray-400">Loading chart...</p>
        )}
      </div>
    </section>
  );
};

export default FeedbackStats;
