export function validateServiceReport(formData: Record<string, string>, photos: string[]): Record<string, string> {
  const newErrors: Record<string, string> = {};
  const requiredFields = [
    'referenceNo', 'projectCode', 'reportCategory', 'client', 'serviceDate', 'technicianName', 
    'equipment', 'workDescription', 'findings', 'finalOperatingCondition'
  ];
  
  for (const field of requiredFields) {
    if (!formData[field]) {
      newErrors[field] = 'This field is required';
    }
  }

  if (formData.referenceNo && !/^SVC\/HBL\/\d{6}\/\d{3}$/.test(formData.referenceNo)) {
    newErrors['referenceNo'] = 'Format must be SVC/HBL/MMYYYY/NNN (e.g. SVC/HBL/072026/001)';
  }

  if (formData.serviceDate) {
    const selectedDate = new Date(formData.serviceDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate > today) {
      newErrors['serviceDate'] = 'Service date cannot be in the future';
    }
  }

  if (photos.length === 0 || photos.some(p => p.trim() === '')) {
    newErrors['photos'] = 'All photos must have a caption';
  }

  return newErrors;
}
