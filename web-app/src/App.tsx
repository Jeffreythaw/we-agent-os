import { useState } from 'react';
import './App.css';

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

function ServiceReportView() {
  const [jsonInput, setJsonInput] = useState('{\n  "workflowId": "wf-hbl-routine-svc",\n  "workflowName": "HarbourLink Routine Contract Service Report",\n  "facts": {\n    "referenceNo": "SVC/HBL/072026/001",\n    "projectCode": "HBL",\n    "reportCategory": "ROUTINE_CONTRACT_SERVICE",\n    "client": "HarbourLink Marine Services",\n    "serviceDate": "2026-07-08",\n    "technicianName": "John Doe",\n    "equipment": "FCU/AHU",\n    "workDescription": "Routine monthly maintenance on main deck FCU.",\n    "findings": "Filter was clogged. Coils were dirty but intact. No leaks detected.",\n    "recommendations": "Recommend replacing belt next quarter.",\n    "photoCaptions": "1. Filter before cleaning\\n2. Filter after replacement",\n    "finalOperatingCondition": "Unit operating within normal parameters. Cooling restored.",\n    "preparedBy": "John Doe",\n    "checkedBy": "Jane Smith",\n    "clientRepresentative": "Alice Johnson",\n    "clientAcknowledgementDate": "2026-07-08"\n  },\n  "variables": {\n    "referenceNo": "SVC/HBL/072026/001",\n    "projectCode": "HBL",\n    "reportCategory": "ROUTINE_CONTRACT_SERVICE",\n    "client": "HarbourLink Marine Services",\n    "serviceDate": "2026-07-08",\n    "technicianName": "John Doe",\n    "equipment": "FCU/AHU",\n    "workDescription": "Routine monthly maintenance on main deck FCU.",\n    "findings": "Filter was clogged. Coils were dirty but intact. No leaks detected.",\n    "recommendations": "Recommend replacing belt next quarter.",\n    "photoCaptions": "1. Filter before cleaning\\n2. Filter after replacement",\n    "finalOperatingCondition": "Unit operating within normal parameters. Cooling restored.",\n    "preparedBy": "John Doe",\n    "checkedBy": "Jane Smith",\n    "clientRepresentative": "Alice Johnson",\n    "clientAcknowledgementDate": "2026-07-08"\n  }\n}');
  const [htmlOutput, setHtmlOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setHtmlOutput('');
    try {
      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: jsonInput
      });
      
      if (!response.ok) {
        throw new Error(await response.text());
      }
      
      const html = await response.text();
      setHtmlOutput(html);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    if (printWindow) {
      printWindow.document.write(htmlOutput);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  return (
    <div className="card" style={{ display: 'flex', gap: '20px' }}>
      <div style={{ flex: 1 }}>
        <h3>Service Report Payload (JSON)</h3>
        <textarea 
          style={{ width: '100%', height: '500px', fontFamily: 'monospace', padding: '10px' }}
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
        />
        <br/><br/>
        <button className="primary-btn" onClick={handleGenerate} disabled={loading}>
          {loading ? 'Generating...' : 'Generate HTML Report'}
        </button>
        {error && <div style={{ color: 'red', marginTop: '10px', whiteSpace: 'pre-wrap' }}>{error}</div>}
      </div>
      <div style={{ flex: 1 }}>
        <h3>Preview</h3>
        {htmlOutput ? (
          <div>
            <div style={{ border: '1px solid #ccc', padding: '10px', height: '460px', overflowY: 'auto' }} dangerouslySetInnerHTML={{ __html: htmlOutput }} />
            <br/>
            <button className="primary-btn" onClick={handlePrint} style={{ background: '#28a745' }}>Print / Save PDF</button>
          </div>
        ) : (
          <div style={{ padding: '20px', color: '#666', border: '1px dashed #ccc', height: '460px' }}>No report generated yet.</div>
        )}
      </div>
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
