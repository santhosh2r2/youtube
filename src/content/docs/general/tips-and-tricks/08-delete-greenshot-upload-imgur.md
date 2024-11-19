---
title: Delete `imgur` uploaded image from Greenshot
authors: sramesh
tags: [greenshot]
date: 2024-09-16
lastUpdated: 2024-09-16
---

## Introduction

Accidently, uploaded image to the `imgur` website anonymously and wondering how to delete it ?

Below are the steps to delete the file from `imgur` website permanently.

| Action                                                                                                             |               Screenshot                |
| ------------------------------------------------------------------------------------------------------------------ | :-------------------------------------: |
| Accidental upload                                                                                                  |  ![accidental_upload](./img/08/1.png)   |
| File uploaded                                                                                                      |    ![file_uploaded](./img/08/2.png)     |
| Find the link - open `Imgur > History`                                                                             |     ![open_history](./img/08/3.png)     |
| Using `hash` or **Open** button, the image can be viewed <br> link: `https://imgur.com/JzMS6J4`                    |      ![open_image](./img/08/4.png)      |
| Open image link.                                                                                                   |      ![image_url](./img/08/5.png)       |
| Delete hash (__mLkC71Ou9jHmsBj__) gives the link for permanent deletion `https://imgur.com/delete/mLkC71Ou9jHmsBj` |    ![deletion_link](./img/08/6.png)     |
| Successfull deletion                                                                                               | ![successfull_deletion](./img/08/7.png) |
| Recheck the image link, following toast should be generated                                                        |   ![not_found_toast](./img/08/8.png)    |


## Troubleshoot

Somehow, before retrieving the `deleteHash`, if the **Clear history** action is performed, still there is a trick, where we can retrieve the `deleteHash`

- Navigate to `C:\Users\<username>\AppData\Local\Greenshot`
- Open the file **Greenshot.log**
- Search for `hashes`
- and you can find `JzMS6J4` and its delete hash in the same log line 
  
    ```log "JzMS6J4" "mLkC71Ou9jHmsBj"
    --- [GreenshotImgurPlugin.ImgurPlugin] Storing imgur upload for hash JzMS6J4 and delete hash mLkC71Ou9jHmsBj
    ```