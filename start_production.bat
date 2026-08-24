@echo off
title NEXUS Outcome Intelligence Platform - Production Server
echo ==============================================================================
echo  Launching NEXUS Platform (Production Mode)
echo ==============================================================================
cd /d "%~dp0"

echo Building frontend static assets...
cd frontend
call npm run build
cd ..

echo Starting Production Server...
python start_production.py
pause
