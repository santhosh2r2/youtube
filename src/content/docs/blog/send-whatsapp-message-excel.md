---
title: Send WhatsApp message using Excel the right way!!!
excerpt: Using any unauthorized request like https://wa.me/send... or https://web.whatsapp.com/send... or https://api.whatsapp.com/send... might lead to account bans.
authors: [sramesh]
tags: [excel, vba, whatsapp]
date: 2024-03-04
lastUpdate: 2024-04-14
---

## Research about WhatsApp automated messages

Checkout the WhatsApp link **[Unauthorized use of automated or bulk messaging on WhatsApp](https://faq.whatsapp.com/5957850900902049)**

:::note
According to the `Terms of Service` by Whatsapp, it is not allowed to the use the whatsapp api in an unauthorized form. 
:::

:::danger
... beginning on `December 7, 2019` , WhatsApp will take legal action against those we determine are engaged in or assisting others in abuse that violates our Terms of Service, such as automated or bulk messaging, or non-personal use, even if that determination is based on information solely available to us off our platform. ....
:::

:::tip
If you intend to use bulk messaging for business case, checkout [WhatsApp Business App](https://www.whatsapp.com/business/) or [WhatsApp Business Platform](https://www.whatsapp.com/business/api)
:::

## Takeaway

* Using any unauthorized request like `https://wa.me/send...` or `https://web.whatsapp.com/send...` or `https://api.whatsapp.com/send...` might lead to account bans.
* Choose a solution approved by Whatsapp (mentioned above), for bulk message solutions or 3rd party Omnichannel CRM solutions like [Mekari Qontak](https://qontak.com/intl/)

## Then is it not possible to send WhatsApp message via Excel ?

A quick internet research revealed that there are many solution proposing that messages could be sent via Excel formula or __Selenium__ based approaches. Today I would like to discuss with you an Excel **VBA** approach.
* Excel formula based approach accesses the WhatsApp api
* Selenium based approach requires installation of additional software
I guess, however these approach may not lead to account ban.

## Solution

So I propose a solution to feed the data in WhatsApp Desktop application via __AppActivate__ and __SendKeys__ functions.

### Requirements

The following softwares are required
* MS Excel (obvisously)
* WhatsApp Deskop

:::note
1. The phone number should be connected to the WhatsApp Desktop.
2. WhatsApp Desktop software should be running
:::

### Sample solution

```vb title="SendMessage"

' Column 1 = contains phone including country code, sample format: 009172---
' Column 2 = contains the message to be sent

Sub WhatsAppMsg()

Dim LastRow As Long
Dim i As Integer

Dim strPhoneNumber As String
Dim strMessage As String

LastRow = Range("A" & Rows. Count). End(xlUp). Row

For i = 2 To LastRow

    strPhoneNumber = Sheets("Data"). Cells(i, 1). Value
    strMessage = Sheets("Data"). Cells(i, 2). Value

    AppActivate "WhatsApp"

    'create new chat
    Application. Wait (Now + TimeValue("00:00:01"))
    SendKeys "^n", True

    'send phone number
    Application. Wait (Now + TimeValue("00:00:01"))
    SendKeys strPhoneNumber, True

    'tab to select phone number
    Application. Wait (Now + TimeValue("00:00:01"))
    SendKeys "{Tab}", True

    'hit enter to select the number
    Application. Wait (Now + TimeValue("00:00:01"))
    SendKeys "{Enter}", True

    'paste the message
    Application. Wait (Now + TimeValue("00:00:01"))
    SendKeys strMessage, True

    'hit enter to send the message
    Application. Wait (Now + TimeValue("00:00:01"))
    SendKeys "{Enter}", True

    'To clear the input and go back to app start, if the number is not found
    Application. Wait (Now + TimeValue("00:00:02"))
    SendKeys "{Esc}", True

Next

End Sub
```

## Further Takeaway

The function can be extended to open the WhatsApp Desktop software automatically using __Shell__ object.
