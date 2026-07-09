import React, { useState, useEffect } from 'react';
import { validateServiceReport } from './validation';

type SaveState = 'Saved' | 'Unsaved changes' | 'Saving...' | 'Save failed';

interface Toast {
  message: string;
  type: 'error' | 'success';
  id: number;
}

export default function ServiceReportView() {
  const [formData, setFormData] = useState({
    referenceNo: 'SVC/HBL/072026/001',
    projectCode: 'HBL',
    reportCategory: 'ROUTINE_CONTRACT_SERVICE',
    client: 'HarbourLink Marine Services',
    serviceDate: '2026-07-08',
    technicianName: 'John Doe',
    equipment: 'FCU/AHU',
    workDescription: 'Routine monthly maintenance on main deck FCU.',
    findings: 'Filter was clogged. Coils were dirty but intact. No leaks detected.',
    recommendations: 'Recommend replacing belt next quarter.',
    finalOperatingCondition: 'Unit operating within normal parameters. Cooling restored.',
    preparedBy: 'John Doe',
    checkedBy: 'Jane Smith',
    clientRepresentative: 'Alice Johnson',
    clientAcknowledgementDate: '2026-07-08',
  });

  const [photos, setPhotos] = useState<string[]>(['1. Filter before cleaning', '2. Filter after replacement']);
  const [photoConfirmDelete, setPhotoConfirmDelete] = useState<number | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saveState, setSaveState] = useState<SaveState>('Saved');
  const [htmlOutput, setHtmlOutput] = useState('');
  const [generating, setGenerating] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Simple auto-save simulation
  useEffect(() => {
    if (saveState === 'Unsaved changes') {
      const timer = setTimeout(() => {
        setSaveState('Saving...');
        setTimeout(() => setSaveState('Saved'), 500);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [formData, photos, saveState]);

  const addToast = (message: string, type: 'error' | 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { message, type, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setSaveState('Unsaved changes');
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handlePhotoChange = (index: number, value: string) => {
    const newPhotos = [...photos];
    newPhotos[index] = value;
    setPhotos(newPhotos);
    setSaveState('Unsaved changes');
  };

  const handlePhotoDelete = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    if (photoConfirmDelete === index) {
      setPhotos((prev) => prev.filter((_, i) => i !== index));
      setPhotoConfirmDelete(null);
      setSaveState('Unsaved changes');
    } else {
      setPhotoConfirmDelete(index);
      setTimeout(() => setPhotoConfirmDelete(null), 3000);
    }
  };

  const validate = () => {
    const newErrors = validateServiceReport(formData, photos);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGenerate = async () => {
    if (!validate()) {
      addToast('Validation failed. Please check the highlighted fields.', 'error');
      return;
    }

    setGenerating(true);
    setHtmlOutput('');

    const payload = {
      workflowId: 'wf-hbl-routine-svc',
      workflowName: 'HarbourLink Routine Contract Service Report',
      facts: {
        ...formData,
        photoCaptions: photos.join('\n')
      },
      variables: {
        ...formData,
        photoCaptions: photos.join('\n')
      }
    };

    try {
      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error(await response.text());
      }
      
      const html = await response.text();
      setHtmlOutput(html);
      addToast('Report generated successfully.', 'success');
    } catch (err: any) {
      addToast(err.message, 'error');
    } finally {
      setGenerating(false);
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

  const getSaveStateClass = (state: SaveState) => {
    switch (state) {
      case 'Saved': return 'saved';
      case 'Unsaved changes': return 'unsaved-changes';
      case 'Saving...': return 'saving';
      case 'Save failed': return 'save-failed';
    }
  };

  return (
    <div className="sr-layout">
      {/* Toast Container */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            {toast.message}
          </div>
        ))}
      </div>

      <div className="sr-left-panel">
        <div className="sr-header">
          <h3>Edit Service Report</h3>
          <div className={`save-state ${getSaveStateClass(saveState)}`}>{saveState}</div>
        </div>

        <div className="sr-form-section">
          <h4>1. Job Info</h4>
          <div className="form-row">
            <div className="form-group">
              <label>Reference No *</label>
              <input type="text" value={formData.referenceNo} onChange={e => handleFieldChange('referenceNo', e.target.value)} className={errors.referenceNo ? 'error-input' : ''} />
              {errors.referenceNo && <span className="error-text">{errors.referenceNo}</span>}
            </div>
            <div className="form-group">
              <label>Project Code *</label>
              <input type="text" value={formData.projectCode} onChange={e => handleFieldChange('projectCode', e.target.value)} className={errors.projectCode ? 'error-input' : ''} />
              {errors.projectCode && <span className="error-text">{errors.projectCode}</span>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Report Category *</label>
              <select value={formData.reportCategory} onChange={e => handleFieldChange('reportCategory', e.target.value)} className={errors.reportCategory ? 'error-input' : ''}>
                <option value="ROUTINE_CONTRACT_SERVICE">Routine Contract Service</option>
              </select>
              {errors.reportCategory && <span className="error-text">{errors.reportCategory}</span>}
            </div>
          </div>
        </div>

        <div className="sr-form-section">
          <h4>2. Client / Contractor Info</h4>
          <div className="form-row">
            <div className="form-group">
              <label>Client *</label>
              <input type="text" value={formData.client} onChange={e => handleFieldChange('client', e.target.value)} className={errors.client ? 'error-input' : ''} />
              {errors.client && <span className="error-text">{errors.client}</span>}
            </div>
            <div className="form-group">
              <label>Service Date *</label>
              <input type="date" value={formData.serviceDate} onChange={e => handleFieldChange('serviceDate', e.target.value)} className={errors.serviceDate ? 'error-input' : ''} />
              {errors.serviceDate && <span className="error-text">{errors.serviceDate}</span>}
            </div>
          </div>
        </div>

        <div className="sr-form-section">
          <h4>3. Service Details</h4>
          <div className="form-row">
            <div className="form-group">
              <label>Technician Name *</label>
              <input type="text" value={formData.technicianName} onChange={e => handleFieldChange('technicianName', e.target.value)} className={errors.technicianName ? 'error-input' : ''} />
              {errors.technicianName && <span className="error-text">{errors.technicianName}</span>}
            </div>
            <div className="form-group">
              <label>Equipment *</label>
              <select value={formData.equipment} onChange={e => handleFieldChange('equipment', e.target.value)} className={errors.equipment ? 'error-input' : ''}>
                <option value="">Select Equipment</option>
                <option value="FCU/AHU">FCU/AHU</option>
                <option value="Chiller">Chiller</option>
                <option value="VRV/VRF">VRV/VRF</option>
                <option value="Cooling Tower">Cooling Tower</option>
                <option value="Pump">Pump</option>
                <option value="MV Fan">MV Fan</option>
                <option value="Exhaust Fan">Exhaust Fan</option>
                <option value="Fresh Air Fan">Fresh Air Fan</option>
                <option value="Pressurization Fan">Pressurization Fan</option>
                <option value="Motorized Volume Control Damper">Motorized Volume Control Damper</option>
                <option value="VSD">VSD</option>
                <option value="Control Panel">Control Panel</option>
                <option value="BMS Panel">BMS Panel</option>
                <option value="Split Unit">Split Unit</option>
                <option value="Package Unit">Package Unit</option>
                <option value="Other ACMV Equipment">Other ACMV Equipment</option>
              </select>
              {errors.equipment && <span className="error-text">{errors.equipment}</span>}
            </div>
          </div>
        </div>

        <div className="sr-form-section">
          <h4>4. Work & Findings</h4>
          <div className="form-group">
            <label>Work Description *</label>
            <textarea value={formData.workDescription} onChange={e => handleFieldChange('workDescription', e.target.value)} className={errors.workDescription ? 'error-input' : ''} />
            {errors.workDescription && <span className="error-text">{errors.workDescription}</span>}
          </div>
          <div className="form-group">
            <label>Findings *</label>
            <textarea value={formData.findings} onChange={e => handleFieldChange('findings', e.target.value)} className={errors.findings ? 'error-input' : ''} />
            {errors.findings && <span className="error-text">{errors.findings}</span>}
          </div>
          <div className="form-group">
            <label>Recommendations</label>
            <textarea value={formData.recommendations} onChange={e => handleFieldChange('recommendations', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Final Operating Condition *</label>
            <textarea value={formData.finalOperatingCondition} onChange={e => handleFieldChange('finalOperatingCondition', e.target.value)} className={errors.finalOperatingCondition ? 'error-input' : ''} />
            {errors.finalOperatingCondition && <span className="error-text">{errors.finalOperatingCondition}</span>}
          </div>
        </div>

        <div className="sr-form-section">
          <h4>5. Photos {errors.photos && <span className="error-text"> - {errors.photos}</span>}</h4>
          {photos.map((photo, i) => (
            <div key={i} className="photo-row">
              <input 
                type="text" 
                value={photo} 
                onChange={(e) => handlePhotoChange(i, e.target.value)} 
                placeholder="Enter photo caption..."
              />
              <button 
                type="button" 
                className={`btn-icon ${photoConfirmDelete === i ? 'btn-danger' : ''}`}
                onClick={(e) => handlePhotoDelete(e, i)}
                aria-label="Delete photo caption"
              >
                {photoConfirmDelete === i ? 'Sure?' : '✕'}
              </button>
            </div>
          ))}
          <button type="button" className="secondary-btn" onClick={() => { setPhotos([...photos, '']); setSaveState('Unsaved changes'); }}>+ Add Photo Caption</button>
        </div>

        <div className="sr-form-section">
          <h4>6. Acknowledgment</h4>
          <div className="form-row">
            <div className="form-group">
              <label>Prepared By</label>
              <input type="text" value={formData.preparedBy} onChange={e => handleFieldChange('preparedBy', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Checked By</label>
              <input type="text" value={formData.checkedBy} onChange={e => handleFieldChange('checkedBy', e.target.value)} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Client Representative</label>
              <input type="text" value={formData.clientRepresentative} onChange={e => handleFieldChange('clientRepresentative', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Ack Date</label>
              <input type="date" value={formData.clientAcknowledgementDate} onChange={e => handleFieldChange('clientAcknowledgementDate', e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      <div className="sr-right-panel">
        <div className="sticky-preview">
          <button className="primary-btn full-width" onClick={handleGenerate} disabled={generating}>
            {generating ? 'Generating...' : 'Preview & Export'}
          </button>
          
          <div className="preview-container">
            {htmlOutput ? (
              <div className="html-preview" dangerouslySetInnerHTML={{ __html: htmlOutput }} />
            ) : (
              <div className="empty-preview">No preview available. Fill out the form and generate.</div>
            )}
          </div>

          <button className="primary-btn full-width bg-success" onClick={handlePrint} disabled={!htmlOutput}>
            Print / Save as PDF
          </button>
          <p className="preview-note">PDF generation uses the native browser print dialog.</p>
        </div>
      </div>
    </div>
  );
}
