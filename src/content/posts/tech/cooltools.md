---
title: "Cool Terminal Tools You Should Know"
published: 2024-06-09T16:59:47+07:00
updated: 2026-06-05
draft: false
description: "Just a list of a couple of (funny) terminal tools"
image: "../images/cooltools/cover.png"
tags: ["tools", "cool", "terminal", "linux"]
category: "tools"
---

Yoo, jumpa lagi!

Saya mau berbagi sejumlah *tools* terminal yang sayang jika dilewatkan, apalagi bagi kalian guys, linux nerds. Sebagian besar (atau mungkin semuanya) *tools* yang akan saya *share* di artikel ini murni ***for fun***. Jadi, memang fungsinya hanya untuk *show off* kecantikan terminal. But, anyway, berikut adalah 9 terminal *tools* keren yang bisa kalian coba:

### 1. cava

Cava adalah *cross-platform audio visualizer*.

::github{repo="karlstav/cava"}

Instalasi (Archlinux) via repositori komunitas (AUR - *Arch User Repository*):
```shell
yay -Sy cava
```

![](../images/cooltools/gif1.gif)

Untuk mengganti ukuran bar-nya, kita bisa menggunakan *arrow key* di keybord: *`arrow left`* untuk memperbesar dan *`arrow right`* untuk memperkecil.  
Untuk mengganti warnanya, kita bisa menekan huruf **`f`** di keyboard.

Baca-baca `help`-nya di:
```shell
cava --help
```

### 2. pipes

Pipes adalah *animated pipes terminal screensaver*.

::github{repo="pipeseroni/pipes.sh"}

Instalasi (Archlinux) via repositori komunitas (AUR - *Arch User Repository*):
```shell
yay -Sy pipes.sh
```

![](../images/cooltools/gif2.gif)

Baca-baca `help`-nya di:
```shell
pipes.sh --help
```

### 3. cowsay

Cowsay adalah *a configurable talking cow*.

::github{repo="piuccio/cowsay"}

Instalasinya (Archlinux) bisa merujuk ke repositori official:
```shell
sudo pacman -Sy cowsay
```
![](../images/cooltools/gif3.gif)

File config untuk menampilkan berbagai objeknya tersimpan di direktori `/usr/share/cows/`.

![](../images/cooltools/ss1.png)

Baca-baca `help`-nya di:
```shell
cowsay --help
```

### 4. cbonsay

Cbonsai adalah *a bonsai tree generator*.

::github{repo="mhzawadi/homebrew-cbonsai"}

Instalasi (Archlinux) via repositori komunitas (AUR - *Arch User Repository*):
```shell
yay -Sy cbonsai
```

![](../images/cooltools/gif4.gif)

Baca-baca `help`-nya di:
```shell
cbonsai --help
```

### 5. cmatrix

Cmatrix adalah *terminal based "The Matrix"-like implementation*.

::github{repo="abishekvashok/cmatrix"}

Instalasinya (Archlinux) bisa merujuk ke repositori official:
```shell
sudo pacman -Sy cmatrix
```
![](../images/cooltools/gif5.gif)

Baca-baca `help`-nya di:
```shell
cmatrix --help
```

### 6. figlet

Figlet? *Claudia's FIGlet tree*.

::github{repo="cmatsuoka/figlet"}

Instalasinya (Archlinux) bisa merujuk ke repositori official:
```shell
sudo pacman -Sy figlet
```
![](../images/cooltools/gif6.gif)

File font-nya tersimpan di direktori `/usr/share/figlet/fonts`:
![](../images/cooltools/ss2.png)

Baca-baca `help`-nya di:
```shell
figlet --help
```

### 7. lolcat

Lolcat: *rainbow and unicorns*!

::github{repo="busyloop/lolcat"}

Instalasinya (Archlinux) bisa merujuk ke repositori official:
```shell
sudo pacman -Sy lolcat
```

![](../images/cooltools/gif7.gif)

Baca-baca `help`-nya di:
```shell
lolcat --help
```

### 8. asciiquarium

Asciiquairum: *Ascii aquarium in terminal*!

::github{repo="cmatsuoka/asciiquarium"}

Instalasinya (Archlinux) bisa merujuk ke repositori official:
```shell
sudo pacman -Sy asciiquarium
```

![](../images/cooltools/gif8.gif)

### 9. mapscii

Mapscii adalah *a Braille & ASCII world map renderer for your console*.

::github{repo="rastapasta/mapscii"}

![](../images/cooltools/gif9.gif)

### 10. hollywood

Hollywood adalah *a technical melodrama*.

::github{repo="dustinkirkland/hollywood"}

Instalasi (Archlinux) via repositori komunitas (AUR - Arch User Repository):
```shell
yay -Sy hollywood
```

![](../images/cooltools/gif10.gif)

:::note

`hollywood` sangat memakan _resource_ (terutama CPU) jika dijalankan. Jadi, jika komputer kalian memiliki _resource_ yang terbatas, jangan jalankan program ini terlalu lama.

:::

### 10. freechess

Kita dapat memainkan catur di CLI melalui layanan `ftp` dari [FreeChess](https://www.freechess.org).

Karena ini adalah layanan `telnet`, maka kita tidak perlu melakukan instalasi apapun, karena biasanya paket `telnet` sendiri di linux sudah terpasang secara default.

Untuk mengaksesnya, gunakan perintah berikut di terminal:

```shell
telnet freechess.org
```

atau via port 5000

```shell
telnet freechess.org 5000
```

atau dengan `nc`: 

```shell
nc -vv freechess.org 23
```

<script src="https://fast.wistia.com/player.js" async></script><script src="https://fast.wistia.com/embed/kbzp6df4mg.js" async type="module"></script><style>wistia-player[media-id='kbzp6df4mg']:not(:defined) { background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/kbzp6df4mg/swatch'); display: block; filter: blur(5px); padding-top:110.28%; }</style> <wistia-player media-id="kbzp6df4mg" seo="false" aspect="0.906801007556675"></wistia-player>

:::note
 
Untuk perintah-perintah yang dapat digunakan, misalnya bagaimana memulai game dan sebagainya silakan dibaca-baca sendiri di servernya. Oiya, satu lagi, karena di sini kita bermain catur via CLI, jadi, kita akan menuliskan notasi untuk menggerakkan buah-buah catur alih-alih menggesernya dengan mouse atau kursor. Sungguh menarik, bukan? Wkwkwk

:::

### 11. starwars

Mirip seperti freechess, starwars adalah program yang dapat kita jalankan setelah terhubung ke sebuah server (towel.blinkenlights.nl) menggunakan telnet. Program ini lebih dilihat sebagai "for fun" program.

Untuk mengaksesnya:

```shell
telnet towel.blinkenlights.nl
```

<script src="https://fast.wistia.com/player.js" async></script><script src="https://fast.wistia.com/embed/ogy4qv4ntn.js" async type="module"></script><style>wistia-player[media-id='ogy4qv4ntn']:not(:defined) { background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/ogy4qv4ntn/swatch'); display: block; filter: blur(5px); padding-top:62.71%; }</style> <wistia-player media-id="ogy4qv4ntn" seo="false" aspect="1.5946843853820598"></wistia-player>

### 12. wttr

`wttr` juga adalah _tool_ terminal yang dapat berjalan jika kita terhubung ke servernya. Tool ini sedikit lebih memiliki fungsi dibandingkan _tool-tool_ sebelumnya, yaitu memantau kondisi cuaca di suatu kota yang ada di negara tertentu.

Untuk mengaksesnya:

```shell
curl wttr.in
```

![](../images/cooltools/ss3.png)

### 13. rate

`rate` adalah _tool_ terminal berbasis server (kita perlu akses internet) yang berfungsi untuk melihat grafik cryptocurrency, seperti Bitcoin (BTC), dan lain sebagainya.

Untuk mengaksesnya:

```shell
curl rate.sx
```

![](../images/cooltools/ss4.png)

![](../images/cooltools/ss5.png)

### 14. ascii.live

`ascii.live` adalah _tool_ terminal yang mengharuskan kita terhubung ke internet. Tidak ada fungsi secara spesifik seperti 2 _tools_ sebelumnya.

Kita bisa melihat ascii live apa saja yang disupport dengan perintah:

```shell
curl ascii.live/list
```

<script src="https://fast.wistia.com/player.js" async></script><script src="https://fast.wistia.com/embed/9odion5dj3.js" async type="module"></script><style>wistia-player[media-id='9odion5dj3']:not(:defined) { background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/9odion5dj3/swatch'); display: block; filter: blur(5px); padding-top:68.75%; }</style> <wistia-player media-id="9odion5dj3" seo="false" aspect="1.4545454545454546"></wistia-player>




Artikel ini akan saya perbarui jika ada *tools* baru yang belum sempat ditulis.

