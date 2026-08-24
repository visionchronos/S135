#!/usr/bin/env bash
set -e

echo "=============================================================================="
echo " Launching NEXUS Platform (Production Mode)"
echo "=============================================================================="

# Resolve directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

echo "Building frontend..."
cd frontend
npm run build
cd ..

echo "Starting unified production server..."
python3 start_production.py
