-- Function to get hostname from IP address using nslookup
on getHostNameUsingNsLookup(ipAddress)
    try
        -- Use the "do shell script" command to run a shell command
        set command to "nslookup " & ipAddress
        set nslookupOutput to do shell script command
        
        -- Use regex to extract the hostname
        set regexPattern to "name\\s*=\\s*(\\S+)"
        set hostName to do shell script "echo " & quoted form of nslookupOutput & " | grep -o -E \"" & regexPattern & "\" | awk '{print $NF}'"
        
        if hostName is not equal to "" then
            return hostName
        else
            return "NOT OK"
        end if
        
    on error errMsg
        return "Error: " & errMsg
    end try
end getHostNameUsingNsLookup

-- Example usage
-- set ipAddress to "192.168.0.144" -- Replace with the IP address you want to look up
-- set resultMessage to getHostNameUsingNsLookup(ipAddress)
-- display dialog resultMessage


-- Function to get hostname from IP address using dig
on getHostNameUsingDig(ipAddress)
    try
        -- Use the "do shell script" command to run a shell command
        set command to "dig +short -x " & ipAddress
        set digOutput to do shell script command
        
        -- Trim leading and trailing whitespace
        set hostName to do shell script "echo " & quoted form of digOutput & " | xargs"
        
        if hostName is not equal to "" then
            return hostName
        else
            return "NOT OK"
        end if
        
    on error errMsg
        return "Error: " & errMsg
    end try
end getHostNameUsingDig

-- Example usage
-- set ipAddress to "192.168.0.144" -- Replace with the IP address you want to look up
-- set resultMessage to getHostNameUsingDig(ipAddress)
-- display dialog resultMessage
