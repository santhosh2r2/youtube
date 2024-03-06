---
slug: install-docker-2021
title: Install Docker (2021)
authors: sramesh
tags: [install, docker]
sidebar_position: 1
---

## How to download in Ubuntu (Linux)

Below you will find the instructions for Ubuntu

### Step 1: Preparation

```bash
sudo apt get remove docker docker engine docker.io containerd runc
```

```bash
sudo apt get update
```

```bash
sudo apt get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
```

### Step 2: Setup Repository [recommended]

```bash
curl fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt key add
```

```bash
sudo apt key fingerprint 0EBFCD88
```

```bash
sudo add apt repository deb [arch=amd64] https://download.docker.com/linux/ubuntu $( lsb_release cs ) stable
```

### Step 3: Install Docker Engine

```bash
sudo apt get update
```

```bash
sudo apt get install docker ce docker ce cli containerd.io
```

### Step 4: Add docker to give non root user access

```bash
sudo groupadd docker
```

```bash
sudo usermod aG docker USER
```

### Step 5: Logout session or use command 

```bash
su s ${USER}
```

### Step 6: Verify the installation

```bash
docker run d p 80:80 docker getting started
```

