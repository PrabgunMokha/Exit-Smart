'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');

  const fetchRecommendations = async () => {
    try {
      const res = await fetch('/api/recommend');
      const data = await res.json();
      setRecommendations(data);
      setLastUpdated(new Date().toLocaleTimeString());
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  useEffect(() => {
    fetchRecommendations();
    // Update every 3 seconds
    const interval = setInterval(fetchRecommendations, 3000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center mt-8 gap-4">
        <div className="spinner"></div>
        <p className="text-muted">Loading live recommendations...</p>
      </div>
    );
  }

  const { bestGate, bestStall } = recommendations;

  return (
    <main>
      <div className="text-center mb-8">
        <h1 className="text-4xl mb-2">
          Your <span className="text-gradient">Optimized Route</span>
        </h1>
        <p className="text-muted">
          Based on real-time stadium traffic. Last updated: {lastUpdated}
        </p>
      </div>

      <div className="grid grid-cols-2">
        {/* Best Gate Card */}
        <div className="glass-panel text-center">
          <div className="badge badge-success mb-4">Fastest Entry</div>
          <h2 className="text-2xl mb-2 text-muted">Best Gate</h2>
          <div className="stat-value text-gradient">{bestGate.name}</div>
          <p className="text-muted mb-4">
            Currently the least crowded entry point.
          </p>
          <div className="flex justify-center items-center gap-2">
            <span className="text-sm">Current Crowd:</span>
            <span className="badge badge-warning">{bestGate.crowdCount} people</span>
          </div>
        </div>

        {/* Best Stall Card */}
        <div className="glass-panel text-center">
          <div className="badge badge-success mb-4">Fastest Service</div>
          <h2 className="text-2xl mb-2 text-muted">Best Food Stall</h2>
          <div className="stat-value text-gradient">{bestStall.name}</div>
          <p className="text-muted mb-4">
            Estimated Wait Time: <strong className="text-lg text-main">{bestStall.waitTime} mins</strong>
          </p>
          <div className="flex justify-center items-center gap-4">
            <div className="flex flex-col items-center">
              <span className="text-sm text-muted">Queue</span>
              <span className="badge badge-warning">{bestStall.queueLength} people</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm text-muted">Service Time</span>
              <span className="badge badge-success">{bestStall.serviceTimeMinutes} min/person</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-muted text-sm">
          System automatically refreshes every 3 seconds to provide the best real-time guidance.
        </p>
      </div>
    </main>
  );
}
