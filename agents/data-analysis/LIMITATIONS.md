# Limitations

- **Offline Only**: Cannot connect to SCADA or BMS systems to pull live data.
- **Structured JSON Only**: Cannot parse raw CSV or Excel files natively. The data must be transformed into the strict JSON schema first.
- **No Predictive AI**: The agent only flags deterministic threshold violations; it does not predict future equipment failure.
