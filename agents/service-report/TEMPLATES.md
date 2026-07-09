# Templates

This template is rendered by the `TemplateEngine` during `step-3-render` of the workflow.

```html
<!DOCTYPE html>
<html>
<head>
<style>
body { font-family: 'Helvetica', sans-serif; color: #333; }
.header { border-bottom: 2px solid #005f99; padding-bottom: 10px; }
.section-title { color: #005f99; margin-top: 20px; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 8px; border: 1px solid #ddd; text-align: left; }
.signature-block { margin-top: 40px; width: 100%; }
.sig-box { width: 30%; display: inline-block; padding-top: 50px; border-top: 1px solid #333; text-align: center; margin-right: 3%; }
</style>
</head>
<body>
<div class="header">
<h1>HarbourLink Service Report</h1>
<p><strong>Reference Number:</strong> {{referenceNo}}</p>
</div>
<table>
<tr><th>Project</th><td>{{projectCode}}</td><th>Client</th><td>{{client}}</td></tr>
<tr><th>Date</th><td>{{serviceDate}}</td><th>Technician</th><td>{{technicianName}}</td></tr>
<tr><th>Equipment</th><td colspan="3">{{equipment}}</td></tr>
</table>

<h2 class="section-title">Work Description</h2>
<p>{{workDescription}}</p>

<h2 class="section-title">Findings</h2>
<p>{{findings}}</p>

<h2 class="section-title">Recommendations</h2>
<p>{{recommendations}}</p>

<h2 class="section-title">Photos</h2>
<p>{{photoCaptions}}</p>

<h2 class="section-title">Final Operating Condition</h2>
<p>{{finalOperatingCondition}}</p>

<h2 class="section-title">Signatures & Acknowledgement</h2>
<div class="signature-block">
<div class="sig-box"><p>Prepared By:<br>{{preparedBy}}</p></div>
<div class="sig-box"><p>Checked By:<br>{{checkedBy}}</p></div>
<div class="sig-box"><p>Client Representative:<br>{{clientRepresentative}}<br>Date: {{clientAcknowledgementDate}}</p></div>
</div>
</body>
</html>
```

## Pending Requirements
**Note:** All pending requirements regarding signatures have been implemented.
