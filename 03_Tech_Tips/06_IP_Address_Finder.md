# IP Address Finder

**Batch file code:**

```bash
@echo off
echo IPv4
echo ----

for /f "tokens=1-2 delims=:" %%a in ('ipconfig^|find "IPv4"') do echo IP Address: %%b

echo ---------------------------------------------------
echo.

echo IPv6
echo ----

for /f "tokens=2 delims=[]" %%a in ('ping %computername% -6 -n 1 ^| findstr "["') do echo IP Address: %%a

echo ---------------------------------------------------

pause
```
