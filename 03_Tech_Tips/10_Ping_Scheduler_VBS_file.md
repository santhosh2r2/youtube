# Build your own Ping Tester #3 | Automate using Windows Task Scheduler

### Checkout my other videos:

- Build your own Ping Tester #1 | Ping to multiple devices using Excel: https://youtu.be/kbcKiL9Uks8
- Build your own Ping Tester #2 | Ping Monitor & Ping Scheduler: https://youtu.be/J6vAPjDEDfQ

### Automate using Windows Task Scheduler

> Checkout out the video:
>
> `Build your own Ping Tester #3 | Automate using Windows Task Scheduler:` https://youtu.be/R2RXYCONe00

#### Instructions to convert the code into VBS script file

1. Copy below code to a text file.
2. Change the `ExcelFilePath` variable according to where the excel file is saved.
3. If necessary, change `MacroPath`. (if you followed my other videos, it usually, `Module1.Ping`)
4. Rename the text file extension to \*.vbs
5. Setup a task in the windows task scheduler (follow the instructions along from the video)

```vb
'Input Excel File's Full Path
ExcelFilePath = "C:\Users\basdemo\Desktop\09_Ping_Tester_with_scheduler_monitor.xlsm"

'Input Module/Macro name within the Excel File
MacroPath = "Module1.Ping"

'Create an instance of Excel
Set ExcelApp = CreateObject("Excel.Application")

'Do you want this Excel instance to be visible?
ExcelApp.Visible = False

'Prevent any App Launch Alerts
ExcelApp.DisplayAlerts = False

'Open Excel File
Set wb = ExcelApp.Workbooks.Open(ExcelFilePath)

'Execute Macro Code
ExcelApp.Run MacroPath

'Save Excel File (if applicable)
wb.Save

'Reset Display Alerts before closing
ExcelApp.DisplayAlerts = True

'Close Excel File
wb.Close

'End instance of Excel
ExcelApp.Quit

'If you would like, Leaves an onscreen message!
'MsgBox "Your Automated Task successfully ran at " & TimeValue(Now), vbInformation
```

#### Creating a Task in windows task scheduler

1. Goto `Start Menu` and select `Windows Task Scheduler`
2. On the right panel, select `Create Task`
3. Goto `Triggers` section and add a new trigger. Set the following for a daily scheduling

   - Begin Task: `On a schedule`
   - Settings: `Daily`
   - Make sure under Advanced Settings: `Enabled` is checked.
   - If required, Advanced Settings: Repeat task every `15 minutes` for a duration of `1 day`. This way the ping testing occurs every 15 minutes.

4. Goto `Actions` sections and set the following:
   - Select an action: `Start a program`
   - Settings -> Programs/Script: `C:\Windows\System32\cscript.exe`
   - Add arguments (optional): Select the path to the `*.vbs` file.
5. Press `OK` and close the task creation.