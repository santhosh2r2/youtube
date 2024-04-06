-- Define the function with IP address parameter
on findOpenPorts(ipAddress)
	try
		-- Define the output file path in the user's Documents folder
		set outputFilePath to "/tmp/output.txt"
		
		-- Define the shell command with the provided IP address
		set shellCommand to "nc -vz " & ipAddress & " 1-65534 > " & outputFilePath & " 2>&1"
		
		-- display dialog shellCommand
		
		try
			-- Execute the shell command
			set shellOutput to do shell script shellCommand
		on error
			-- this case happens, if there are no open ports on the machine
			return "No open ports"
		end try
		
		-- display dialog "shell: " & shellOutput
		
		set grepOutput to do shell script "grep succeeded " & outputFilePath
		
		-- display dialog "grep: " & grepOutput
		
		-- Check if grep output is not empty
		if grepOutput is equal to "" then
			
			-- if grep retuns emtpy string
			return "No open ports"
		else
			-- display dialog grepOutput
			
			-- Execute the awk command
			set awkCommand to "grep \"succeeded\" " & outputFilePath & " | awk '{print $5 \"  \"  $6}'"
			set awkOutput to do shell script awkCommand
			
			-- Return the output
			return awkOutput
			
		end if
		
	on error errMsg
		-- Handle errors
		return "Error: " & errMsg
	end try
end findOpenPorts

-- Example: Call the function with an IP address
-- set ipAddressToCheck to "0.0.0.0"
-- set resultText to findOpenPorts(ipAddressToCheck)

-- Display the result or handle it as needed
-- display dialog resultText