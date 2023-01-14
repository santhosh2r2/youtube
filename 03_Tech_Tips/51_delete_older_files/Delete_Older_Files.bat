@echo off
REM get current date and time for log file
set YYYY=%DATE:~10,4%
set MM=%DATE:~4,2%
set DD=%DATE:~7,2%
set HH=%TIME: =0%
set HH=%HH:~0,2%
set MI=%TIME:~3,2%
set SS=%TIME:~6,2%
set FF=%TIME:~9,2%
set file_name=%YYYY%%MM%%DD%_%HH%%MI%%SS%_delete.log

REM set the source folder and file_extension
set folder_path=%~dp0bat_backup_files
set file_extension=*.bak*
set days_to_delete=-30

REM check if logs folder exists
if not exist "%folder_path%\Logs\" (
    mkdir "%folder_path%\Logs"
)

REM delete the files
forfiles /p "%folder_path%" /s /m %file_extension% /d %days_to_delete% /c "cmd /c del @path&echo @path >> \"%folder_path%\Logs\%file_name%\""
