import './globals.css';

export const metadata = {
  title: 'Smart Stadium Simulation',
  description: 'Real-time simulation system recommending least crowded gates and fastest service points in a stadium to improve attendee experience.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div className="container">
          <nav>
            <div className="flex items-center gap-2">
              <span className="live-indicator"></span>
              <h2 className="text-xl">Smart Stadium Live</h2>
            </div>
            <div className="nav-links">
              <a href="/" className="nav-link">User Dashboard</a>
              <a href="/admin" className="nav-link">Admin Control</a>
            </div>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
