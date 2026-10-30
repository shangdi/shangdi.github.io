---
title: "Reflector for Arch Linux"
published: 2026-10-22T20:55:48+07:00
image: "../images/reflector/featured.avif"
draft: false
description: "Reflector is a Python script for finding, selecting the fastest Arch Linux mirror list and eventually overwriting /etc/pacman.d/mirrorlist"
tags: ["reflector", "linux", "archlinux", "cli", "mirrorlist", "pacman"]
category: "reflector"
---

:::warning[AI Usage]

Some of these article contents are derived from Google Gemini.

:::

## What is `reflector`?

`reflector` is a Python script that can retrieve the latest mirror list from the [**Arch Linux Mirror Status**](https://archlinux.org/mirrors/status/) page, filter the most up-to-date mirrors, sort them by speed and overwrite the file `/etc/pacman.d/mirrorlist`.[^1]

:::info

If your main concern is download speed, [pacman's default mirrorlist](https://gitlab.archlinux.org/archlinux/packaging/packages/pacman-mirrorlist/-/blob/main/mirrorlist) should be enough, as the first (prioritized) entries are worldwide locations, which automatically pick a content delivery network (CDN) server close to your location to provide fast download speeds.

:::

:::tip[Exclusivity]

Currently, `reflector` is available only in archlinux. 

:::

## Installation

::: code-group labels=[archlinux]

```shell
sudo pacman -Sy reflector
```

:::

### Usage

:::warning

Running `reflector` leads to the overwrittance of `/etc/pacman.d/mirrorlist` file. So, it's always a good idea to back it up before everything else:

```shell
sudo cp /etc/pacman.d/mirrorlist /etc/pacman.d/mirrorlist.bak
```

:::

Run:

```shell
reflector --help
```

to see its available options.  
These are the common used ones:[^2]

- `--save <path>`: Write the resulting mirror list to a specified file (usually /etc/pacman.d/mirrorlist).  
- `--country <country>`: Filter mirrors by country name or ISO 2-letter country code (e.g., United States, Germany, ID).  
- `--protocol <protocol>`: Filter mirrors by protocol type, such as https or http.  
- `--latest <number>`: Select the specified number of the most recently synchronized mirrors (-l).  
- `--fastest <number>`: Select the specified number of the fastest mirrors (-f).  
- `--sort <criteria>`: Sort the filtered mirrors by rate (download speed), score, age, or country.  
- `--verbose`: Show detailed progress and status output (-v).  
- `--download-timeout <seconds>`: Set a custom timeout for mirror speed tests (default is usually 5 seconds).

#### Preview mirrors without saving

```shell
reflector --latest 20 --sort rate --fastest 10
```

#### Fetch the fastest HTTPS mirrors

```shell
sudo reflector --latest 20 --protocol https --sort rate --save /etc/pacman.d/mirrorlist
```

#### Filter by country and protocol

```shell
sudo reflector --country "Indonesia" --protocol rsync --latest 30 --sort rate --save /etc/pacman.d/mirrorlist
```

### Automation (`reflector-timer`)

You can automate Reflector to update your mirrorlist periodically in the background using systemd units.[^1]

#### 1. Configure default options

Edit `/etc/xdg/reflector/reflector.conf` to specify your preferred flags (like `--country`, `--protocol`, `--sort rate`, and `--save`).

#### 2. Enable and start the timer 

```shell
sudo systemctl enable --now reflector.timer
```

#### 3. Check timer status

```shell
systemctl list-timers
```

#### 4. Run and immediate update manually

```shell
sudo systemctl start reflector.service
```




[^1]: https://wiki.archlinux.org/title/Reflector
[^2]: https://gemini.google.com
