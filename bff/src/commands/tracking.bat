@echo off
REM Navigate to the emulator directory
cd /d %USERPROFILE%\AppData\Local\Android\sdk\platform-tools.

if "%~1"=="" (
  adb logcat
) else (
  adb logcat | findstr /C:"%~1"
)