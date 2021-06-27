<?php

//Define the variables
$host = '127.0.0.1';
$port = 80;
$waitTimeoutInSeconds = 1;
$output = '';
$status = 'IDLE';

//Setup timezone and date
//https://www.php.net/manual/en/timezones
date_default_timezone_set("Europe/Berlin");
$date = date('Y-m-d H:i:s');

//Ping test using fsockopen
//fsockopen(): Initiates a socket connection to the resource specified by hostname.
//@: disables the Warning
$fp = @fsockopen($host, $port, $errCode, $errStr, $waitTimeoutInSeconds);
if ($fp) {
    $status = 'ONLINE';
} else {
    $status = 'OFFLINE';
}

//Write the output to a file
if (!file_exists("output.md")) {
    $output = "| Host           | Port | Status | Performed at        |\r\n";
    $output .= "| -------------- | ---- | ------ | ------------------- |\r\n";
}
$output .= sprintf("| %s | %s   | %s     | %s |\r\n", $host, $port, $status, $date   );

file_put_contents("output.md", $output, FILE_APPEND);

//save the file and execute in terminal
