@echo off
REM Navigate to the emulator directory
cd /d %USERPROFILE%\AppData\Local\Android\Sdk\emulator

REM Verifica se o diretório do SDK existe
if not exist "%USERPROFILE%\AppData\Local\Android\Sdk\emulator\" (
    echo "Android SDK não encontrado! Verifique se o Android SDK está instalado corretamente."
    pause
    exit /b
)

REM Executa o comando para listar os AVDs
for /f "tokens=* delims=\" %%i in ('emulator -list-avds ^| findstr /v "INFO"') do (
    set avd_found=true
    echo %%i
)

REM Verifica se algum AVD foi encontrado
if not defined avd_found (
    echo "Nenhum AVD encontrado."
)

exit /b