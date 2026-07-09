import { useState } from 'react';
import './App.css';
import ServiceReportView from './ServiceReportView';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <div className="app-container">
      <nav className="sidebar">
        <div className="logo">WE Engineering</div>
        <ul className="nav-links">
          <li className={currentView === 'dashboard' ? 'active' : ''} onClick={() => setCurrentView('dashboard')}>Dashboard</li>
          <li className={currentView === 'service-report' ? 'active' : ''} onClick={() => setCurrentView('service-report')}>Service Report</li>
          <li className={currentView === 'data-analysis' ? 'active' : ''} onClick={() => setCurrentView('data-analysis')}>Data Analysis</li>
          <li className={currentView === 'history' ? 'active' : ''} onClick={() => setCurrentView('history')}>History</li>
          <li className={currentView === 'templates' ? 'active' : ''} onClick={() => setCurrentView('templates')}>Templates</li>
          <li className={currentView === 'settings' ? 'active' : ''} onClick={() => setCurrentView('settings')}>Settings</li>
        </ul>
      </nav>
      
      <main className="content-area">
        <header className="topbar">
          <h2>{currentView.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</h2>
        </header>
        
        <div className="view-content">
          {currentView === 'dashboard' && <DashboardView />}
          {currentView === 'service-report' && <ServiceReportView />}
          {currentView === 'data-analysis' && <DataAnalysisView />}
          {/* Other views omitted for brevity */}
        </div>
      </main>
    </div>
  );
}

function DashboardView() {
  return (
    <div className="card">
      <h3>Welcome back, Engineer</h3>
      <p>Select a task from the sidebar to begin.</p>
    </div>
  );
}

function DataAnalysisView() {
  return (
    <div className="card">
      <h3>Analyze Engineering Data</h3>
      <div className="form-group">
        <label>Analysis Type</label>
        <select>
          <option>Temperature Logger</option>
          <option>Chiller Trend</option>
          <option>Water Test</option>
          <option>Excel Summary</option>
        </select>
      </div>
      <div className="form-group">
        <label>Upload Dataset</label>
        <input type="file" />
      </div>
      <button className="primary-btn" onClick={() => alert("Executing Business Agent Pack: Data Analysis (Simulation)")}>Run Analysis</button>
    </div>
  );
}

export default App;
