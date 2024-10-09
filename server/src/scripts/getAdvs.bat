@echo off
REM Navigate to the emulator directory
cd %USERPROFILE%\AppData\Local\Android\Sdk\emulator

REM Run the commando to list all Android Virtual Devices
emulator -list-avds

pause