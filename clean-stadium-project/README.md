# Smart Stadium Simulation

A real-time simulation system designed to improve the attendee experience in large-scale sporting venues. The system helps people avoid crowded areas, reduce waiting time, and make better decisions in real time by recommending the least crowded gates and fastest service points.

## 🎯 Core Features

1. **Simulates Venue Conditions**: Real-time mock data for crowd levels at stadium gates and queue lengths at food stalls.
2. **Decision Engine**: Calculates wait times (queue × service time) and identifies the optimal routes and service points.
3. **Real-time Recommendations**: A frontend dashboard that automatically updates every 3 seconds, displaying the best gate and fastest stall.
4. **Admin Control**: A backend simulation control panel that allows instant adjustments to crowd counts and queue lengths to see how the system reacts.

## 🛠️ Technology Stack

- **Frontend**: Next.js 15 (App Router), React, Vanilla CSS with a premium dark-mode glassmorphism design.
- **Backend**: Next.js Serverless API routes (State management and processing).
- **Deployment Strategy**: Dockerized container ready for Google Cloud Run (zero server management, automatic scaling).

## 🚀 Getting Started Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open your browser:
   - **User Dashboard**: [http://localhost:3000](http://localhost:3000)
   - **Admin Control**: [http://localhost:3000/admin](http://localhost:3000/admin)

## 💡 How it Works

The system operates on a continuous real-time loop:
1. **Admin/Simulation changes data**: Update queues or crowd counts via the admin panel.
2. **Backend updates state**: The in-memory state is updated instantly.
3. **Frontend fetches updates**: The UI polls the `/api/recommend` endpoint.
4. **UI updates automatically**: The best gate and food stall are dynamically displayed to the user.
