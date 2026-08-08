---
title: FFmpeg - Convert Any Video Format to MP4
published: 2024-10-07T15:00:53.000Z
image: ../images/convertvideoformat/featured.png
description: If you have ffmpeg installed on your Linux machine, then it actually could help you to convert any video format to MP4!
tags: ["ffmpeg", "tutorial", "video format"]
category: ffmpeg
---

Sebetulnya, perintahnya sangat mudah, tapi supaya saya lebih mudah mengingatnya, maka saya akan abadikan dalam artikel ini[^1]:

```shell
ffmpeg -i inputfile.ogv -c:v libx264 -c:a aac outputfile.mp4
```

> **Keterangan:**  
> 1. <mark> -i inputfile.ogv</mark> adalah file video yang akan kita ubah formatnya, bisa video berformat .ogv, .mkv, .avi, .mov, dan lain-lain.
> 2. <mark> -c:v libx264</mark> setting video codec ke **libx264** untuk MP4 (video encoding H.264).
> 3. <mark> -c:a aac</mark> setting audio codec ke **aac (advanced audio codec)** yang umumnya digunakan untuk MP4.
> 4. <mark> outputfile.mp4</mark> output file MP4 yang diharapkan.

[^1]: ChatGPT

