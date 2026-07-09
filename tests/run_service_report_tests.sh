#!/bin/bash
# tests/run_service_report_tests.sh
# Regression tests for the Service Report Agent

echo "Running Service Report Agent Regression Tests..."
mkdir -p output

# 1. Success Case
echo "Test 1: Success Case"
node ./dist/cli/index.js service-report generate \
  --input examples/service-report/harbourlink-routine-service.input.json \
  --output output/harbourlink-report.md > /dev/null

if [ $? -eq 0 ]; then
    echo "✅ Success Case Passed"
else
    echo "❌ Success Case Failed"
    exit 1
fi

# 2. Failure Case: Missing Photo Caption
echo "Test 2: Missing Photo Caption"
node ./dist/cli/index.js service-report generate \
  --input examples/service-report/fail-missing-photo-caption.input.json \
  --output output/fail1.md > /dev/null 2>&1

if [ $? -ne 0 ]; then
    echo "✅ Failure Case (Missing Photo Caption) Passed (correctly halted)"
else
    echo "❌ Failure Case (Missing Photo Caption) Failed (did not halt)"
    exit 1
fi

# 3. Failure Case: Missing Reference
echo "Test 3: Missing Reference Number"
node ./dist/cli/index.js service-report generate \
  --input examples/service-report/fail-missing-reference.input.json \
  --output output/fail2.md > /dev/null 2>&1

if [ $? -ne 0 ]; then
    echo "✅ Failure Case (Missing Reference) Passed (correctly halted)"
else
    echo "❌ Failure Case (Missing Reference) Failed (did not halt)"
    exit 1
fi

# 4. Failure Case: Wrong Project
echo "Test 4: Wrong Project Code"
node ./dist/cli/index.js service-report generate \
  --input examples/service-report/fail-wrong-project.input.json \
  --output output/fail3.md > /dev/null 2>&1

if [ $? -ne 0 ]; then
    echo "✅ Failure Case (Wrong Project) Passed (correctly halted)"
else
    echo "❌ Failure Case (Wrong Project) Failed (did not halt)"
    exit 1
fi

echo "All Service Report Agent Regression Tests Passed!"
exit 0
