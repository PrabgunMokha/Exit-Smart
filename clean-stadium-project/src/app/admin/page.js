'use client';

import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchState = async () => {
    try {
      const res = await fetch('/api/state');
      const data = await res.json();
      setState(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching state:', error);
    }
  };

  useEffect(() => {
    fetchState();
    const interval = setInterval(fetchState, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdate = async (type, id, action) => {
    try {
      const res = await fetch('/api/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, id, action })
      });
      const data = await res.json();
      if (data.success) {
        setState(data.state);
      }
    } catch (error) {
      console.error('Error updating state:', error);
    }
  };

  if (loading || !state) {
    return (
      <div className="flex flex-col items-center justify-center mt-8 gap-4">
        <div className="spinner"></div>
        <p className="text-muted">Loading simulation state...</p>
      </div>
    );
  }

  return (
    <main>
      <div className="text-center mb-8">
        <h1 className="text-4xl mb-2">
          Admin <span className="text-gradient">Simulation Control</span>
        </h1>
        <p className="text-muted">
          Modify the simulation data here. Users will instantly see the system react.
        </p>
      </div>

      <div className="grid grid-cols-2">
        {/* Gates Control */}
        <div className="glass-panel">
          <h2 className="text-2xl mb-4 border-b pb-2 border-[rgba(255,255,255,0.1)]">Gates Configuration</h2>
          <div className="flex flex-col gap-2">
            {state.gates.map((gate) => (
              <div key={gate.id} className="data-row">
                <div>
                  <div className="font-bold">{gate.name}</div>
                  <div className="text-sm text-muted">Crowd: {gate.crowdCount}</div>
                </div>
                <div className="control-group">
                  <button 
                    className="btn-action" 
                    onClick={() => handleUpdate('gate', gate.id, 'decrement')}
                  >
                    -10
                  </button>
                  <button 
                    className="btn-action" 
                    onClick={() => handleUpdate('gate', gate.id, 'increment')}
                  >
                    +10
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stalls Control */}
        <div className="glass-panel">
          <h2 className="text-2xl mb-4 border-b pb-2 border-[rgba(255,255,255,0.1)]">Food Stalls Configuration</h2>
          <div className="flex flex-col gap-2">
            {state.stalls.map((stall) => (
              <div key={stall.id} className="data-row">
                <div>
                  <div className="font-bold">{stall.name}</div>
                  <div className="text-sm text-muted">Queue: {stall.queueLength} | Svc Time: {stall.serviceTimeMinutes}m</div>
                  <div className="text-sm text-warning mt-1">
                    Wait Time: {stall.queueLength * stall.serviceTimeMinutes} mins
                  </div>
                </div>
                <div className="control-group">
                  <button 
                    className="btn-action" 
                    onClick={() => handleUpdate('stall', stall.id, 'decrement')}
                  >
                    -1
                  </button>
                  <button 
                    className="btn-action" 
                    onClick={() => handleUpdate('stall', stall.id, 'increment')}
                  >
                    +1
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
