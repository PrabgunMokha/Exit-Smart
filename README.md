# Exit-Smart: Stadium Crowd Management Simulation

Exit-Smart is a full-stack simulation platform that analyzes crowd density and queue lengths to provide real-time recommendations for optimal navigation in large-scale venues. The system helps attendees avoid crowded areas, reduces waiting times, and facilitates data-driven decision-making in real time by identifying the least congested gates and the most efficient service points.

## Core Features

1. **Venue Condition Simulation**: Generates real-time mock data reflecting crowd levels at stadium gates and queue lengths at food stalls.
2. **Decision Engine**: Calculates anticipated wait times based on queue length and average service time, identifying optimal routes and service points.
3. **Real-Time Recommendations**: Features a user-facing dashboard that automatically refreshes, continuously displaying the most efficient gate and service stall.
4. **Administrative Control Panel**: Provides a backend simulation interface for administrators to instantly adjust crowd counts and queue parameters, enabling the observation of system responses under varying conditions.

## Technology Stack

- **Frontend**: Next.js 15 (App Router), React, and custom CSS featuring a modern, responsive design.
- **Backend**: Next.js Serverless API routes handling state management and data processing.
- **Deployment Strategy**: Dockerized container architecture, optimized for deployment on Google Cloud Run to ensure zero server management and automatic scalability.

## Getting Started Locally

1. Install the required dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Access the application in your browser:
   - **User Dashboard**: [http://localhost:3000](http://localhost:3000)
   - **Admin Control Panel**: [http://localhost:3000/admin](http://localhost:3000/admin)

## System Architecture

The application operates on a continuous real-time data loop:
1. **Data Modification**: Administrators update queue lengths or crowd densities via the admin panel.
2. **State Management**: The backend instantaneously updates the in-memory state.
3. **Data Fetching**: The frontend interface polls the `/api/recommend` endpoint at regular intervals.
4. **Dynamic UI Updates**: The user dashboard automatically displays the optimal gate and food stall based on the latest calculated metrics.
