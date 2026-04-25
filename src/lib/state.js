// In-memory state for the simulation
export const simulationState = {
  gates: [
    { id: 1, name: 'North Gate', crowdCount: 120 },
    { id: 2, name: 'South Gate', crowdCount: 45 },
    { id: 3, name: 'East Gate', crowdCount: 85 },
    { id: 4, name: 'West Gate', crowdCount: 200 }
  ],
  stalls: [
    { id: 1, name: 'Burger Station', queueLength: 15, serviceTimeMinutes: 2 },
    { id: 2, name: 'Pizza Corner', queueLength: 8, serviceTimeMinutes: 3 },
    { id: 3, name: 'Drinks Stand 1', queueLength: 5, serviceTimeMinutes: 1 },
    { id: 4, name: 'Hot Dog Cart', queueLength: 22, serviceTimeMinutes: 1.5 }
  ]
};

// Helper function to calculate recommendations
export const getRecommendations = () => {
  // Find least crowded gate
  let bestGate = simulationState.gates[0];
  for (const gate of simulationState.gates) {
    if (gate.crowdCount < bestGate.crowdCount) {
      bestGate = gate;
    }
  }

  // Calculate wait times and find fastest stall
  let bestStall = simulationState.stalls[0];
  let minWaitTime = bestStall.queueLength * bestStall.serviceTimeMinutes;

  const stallsWithWaitTime = simulationState.stalls.map(stall => {
    const waitTime = stall.queueLength * stall.serviceTimeMinutes;
    if (waitTime < minWaitTime) {
      minWaitTime = waitTime;
      bestStall = stall;
    }
    return { ...stall, waitTime };
  });

  return {
    bestGate,
    bestStall: { ...bestStall, waitTime: minWaitTime },
    timestamp: new Date().toISOString()
  };
};
