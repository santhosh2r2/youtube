#Folder in which the files to be deleted
$folderPath = (Get-Item .).FullName + "\ps_backup_files"
$fileExtension = "bak"

#Number of days to delete
$daysToDelete = 30 

#Constants
$createdDate = get-date -UFormat "%Y%m%d_%H%M%S"
$logFilePath = $folderPath + "\Logs" 
$logFilename = $logFilePath + "\" + $createdDate + "_delete.log"

#Check if the folder path exists
if(![System.IO.Directory]::Exists($folderPath)){
    $newName =  "C:\" + $createdDate + "_delete.log"
    $s="The path '" +$folderPath +"' does not exists"
    $s >> $newName
    exit
}

#Find the files
$files = Get-ChildItem -Path $folderPath -File |
    	 Where-Object { $_.Extension -eq "."+$fileExtension }

#Logic to delete
    $deletedFiles = @()
    foreach ($file in $files){
        $outfile = $file.FullName
        $lastWrite = (get-item $outfile).LastWriteTime
        $timespan = new-timespan -days $daysToDelete

        if(((get-date) - $lastWrite) -gt $timespan) {
            Remove-Item $outfile 
            $logLine = $createdDate + " '" + $outfile + "' is deleted."
            $deletedFiles += $logLine
        }    
    }

#Log folder check. if necessary create the folder
if(![System.IO.Directory]::Exists($logFilePath)){
    New-Item $logFilePath -ItemType directory
}
#Write the deleted files to the log file
if($deletedFiles.Count -gt 0){
    $stream = [System.IO.StreamWriter] $logFilename
    foreach($line in $deletedFiles){
        $stream.WriteLine($line)
    }
    $stream.close()
}
else
{
    $s="There were no files to delete.”
    $s >> $logFilename
}