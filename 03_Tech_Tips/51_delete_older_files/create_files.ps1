$sourceFolder1 = (Get-Item .).FullName + "\bat_backup_files"
$sourceFolder2 = (Get-Item .).FullName + "\ps_backup_files"

$sourceFolders = @($sourceFolder1, $sourceFolder2)

$daysToCreate = 40
$fileExtension = "bak"
$fileToCreate = 15

foreach ($sourceFolder in $sourceFolders)
{
    if(![System.IO.Directory]::Exists($sourceFolder)){
        New-Item $sourceFolder -ItemType directory
    }
    $counter = $daysToCreate
    while($counter -gt $daysToCreate - $fileToCreate){
        $createdDate = (Get-Date).AddDays(-$counter).ToString("yyyy-MM-dd")
        $filename = $sourceFolder+"\"+$createdDate + "." + $fileExtension
        New-Item $filename

        $file = Get-Item $filename
        $file.LastWriteTime = (Get-Date).AddDays(-$counter)
        $counter -= 1
    }
}


