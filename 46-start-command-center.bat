@echo off
setlocal
cd /d "%~dp0"
where java >nul 2>nul || (echo Java JDK not found. Install a JDK 17+ and ensure java is on PATH.&pause&exit /b 1)
where javac >nul 2>nul || (echo javac not found. A JDK is required for real Java Compile/Run.&pause&exit /b 1)
set "PORT=4173"
start "TanTitan2010 Java Bridge" /min cmd /c "java -jar "%~dp0tools\command-center-bridge.jar" "%~dp0" %PORT%"
timeout /t 1 /nobreak >nul
start "" "http://127.0.0.1:%PORT%/index.html"
echo TanTitan2010 Command Center started on http://127.0.0.1:%PORT%/
echo Close the Java Bridge window to stop the local server.
