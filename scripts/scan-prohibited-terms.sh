#!/bin/bash

# QUEST Legal - Prohibited Terms Scanner
# This script verifies that educational disclaimers are present and prevents
# unauthorized claims of providing actual legal services
#
# Note: This script uses grep (file system tool) and does not require Node.js dependencies
# It scans source files directly and validates legal compliance

set -e

echo "========================================"
echo "Prohibited Terms Scanner"
echo "========================================"
echo ""

FAILED=0

# Verify educational disclaimers are present in required files
# These disclaimers protect against legal liability by stating this is a demo/template
echo "1. Verifying educational disclaimers are present..."
DISCLAIMER_FILES=(
  "client/src/components/Footer.tsx"
  "client/src/pages/ContactPage.tsx"
  "client/src/pages/AboutPage.tsx"
)

MISSING_DISCLAIMERS=0
for file in "${DISCLAIMER_FILES[@]}"; do
  if [ -f "$file" ]; then
    if ! grep -q "educational\|demonstration\|template\|demo" "$file" 2>/dev/null; then
      echo "   ⚠️  Missing disclaimer in: $file"
      MISSING_DISCLAIMERS=1
    fi
  fi
done

if [ $MISSING_DISCLAIMERS -eq 1 ]; then
  echo "❌ FAIL: Educational disclaimers not found in required files"
  FAILED=1
else
  echo "✅ PASS: Educational disclaimers present in all required files"
fi

echo ""

# Check for unauthorized service claims (excluding demo data and disclaimers)
echo "2. Checking for unauthorized legal service claims..."
if grep -r "실제 법률 서비스를 제공\|법률 자문을 제공\|변호사 선임\|법률 대리" \
  --include='*.tsx' --include='*.ts' \
  --exclude="*storage.ts" --exclude="*Footer.tsx" --exclude="*AboutPage.tsx" --exclude="*ContactPage.tsx" \
  client/src/pages/ client/src/components/ 2>/dev/null | grep -v "제공하지 않습니다" | grep -q .; then
  echo "❌ FAIL: Unauthorized legal service claims found"
  FAILED=1
else
  echo "✅ PASS: No unauthorized legal service claims"
fi

echo ""

# Check for direct service offering in English (excluding demo data and disclaimers)
echo "3. Checking for direct legal service offerings in English..."
if grep -r "we provide legal advice\|we offer legal representation\|hire an attorney\|legal counsel services" \
  --include='*.tsx' --include='*.ts' \
  --exclude="*storage.ts" --exclude="*Footer.tsx" --exclude="*AboutPage.tsx" --exclude="*ContactPage.tsx" \
  client/src/pages/ client/src/components/ 2>/dev/null | grep -v "does not constitute" | grep -q .; then
  echo "❌ FAIL: Direct legal service offerings found"
  FAILED=1
else
  echo "✅ PASS: No direct legal service offerings"
fi

echo ""
echo "========================================"

if [ $FAILED -eq 1 ]; then
  echo "❌ Scan FAILED: Issues found"
  echo "========================================"
  exit 1
else
  echo "✅ Scan PASSED: All checks successful"
  echo "========================================"
  exit 0
fi
