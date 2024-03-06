---
slug: install-vagrant-2021
title: Install Vagrant (2021)
authors: sramesh
tags: [install, vagrant]
sidebar_position: 1
---

## How to download in Windows

This is pretty straight forward. Just navigate to the following link [https://developer.hashicorp.com/vagrant/install](https://developer.hashicorp.com/vagrant/install)

Select the installer from windows option. And from there it is pretty much straight forward

## How to download in Ubuntu (Linux)

Below you will find the instructions for Ubuntu

### install the virtualbox package

```bash
sudo apt install virtualbox
```

### download __*.deb__ 

Save the __*.deb__ file from the link [https://developer.hashicorp.com/vagrant/install](https://developer.hashicorp.com/vagrant/install)

### update the apt-repository

```bash
sudo apt update
```

### install the downloaded *.deb file (sample file for version 2.4.1)

```bash
sudo apt install vagrant_2.4.1-1_i686.deb
```

### check if vagrant is installed in the OS

```bash
vagrant version
```
