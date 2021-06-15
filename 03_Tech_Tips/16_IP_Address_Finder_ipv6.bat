
@echo off
echo IPv6
echo ----
for /f "delims=[] tokens=2" %%a in ('ping %computername% -6 -n 1 ^| findstr "["') do echo IP Address: %%a
echo.
echo ---------------------------------------------------
echo.
pause