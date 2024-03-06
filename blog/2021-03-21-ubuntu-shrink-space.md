---
slug: ubuntu-shrink-space
title: How to retrieve unused space from Ubuntu VM using vmware player
authors: [sramesh]
tags: [ubuntu, virtualization, vmware]
---

## Steps to retrieve unused space

* Defragment (no need to un/remount anything). Ignore any errors. Some files like symlinks and device files can't be defragmented.

<!-- truncate -->

```bash
sudo e4defrag /
```

* Zero-fill all unused space so VMware knows it's indeed unused:

```bash
dd if=/dev/zero of=wipefile bs=1M; sync; rm wipefile
```

* Run the shrink operation:

```bash
sudo vmware-toolbox-cmd disk shrinkonly
```


<iframe width="560" height="315" src="https://www.youtube.com/embed/-k4WNjemK5I?si=GBZwwNTsPdksNcXm" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
