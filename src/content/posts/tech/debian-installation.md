---
title: "Debian Linux Installation in Virtualbox"
published: 2024-04-15T07:45:05+07:00
draft: false		
summary: "A baby guide to install Debian Linux distribution as virtual machine in Virtalbox."
image: "../images/debinstall/featured.png"
tags: ["debian", "linux", "instal"]
category: "debian"
---

# Pra Instalasi

Hola!

Kali ini saya akan memberikan tutorial instalasi salah satu distro linux legendaris, Debian. Saya akan menginstall Debian sebagai VM (*virtual machine*) di Virtualbox. Namun, sebelum saya melakukan instalasi, ada beberapa catatan berikut yang perlu diperhatikan:

1. Mengunduh & Menginstall Virtualbox ([di sini](https://www.virtualbox.org/wiki/Downloads))
2. Mengunduh file ISO debian ([di sini](https://www.debian.org/download))

# Instalasi
Sekarang, kita masuk ke tahap instalasi...

## Membuat VM di Virtualbox
### 1. Klik "New" di interface Virtualbox
![](../images/debinstall/ss1.png)

### 2. Isi bagian
- **Name**, bebas, bisa diisi dengan nama distronya. Saya namai VM ini dengan "Debian".
- **Folder**, dibiarkan *default* saja
- **ISO Image**, masukkan file ISO Debian yang sudah diunduh sebelumnya
- **Skip Unattended Installation**, diceklis
![](../images/debinstall/ss2.png)

Klik "Next".

### 3. Setting RAM & Prosesor (core)

Untuk RAM, 1 GB (1024 MB) cukup. Prosesornya juga dikasih 1 core juga cukup.
![](../images/debinstall/ss3.png)

"Next"

### 4. Mengalokasikan Hard Disk

*Setting* default untuk VM linux di 20 GB cukup.
![](../images/debinstall/ss4.png)

"Next"

### 5. Memastikan semua *setting* sudah benar.

Jika semua *setting*-nya sudah benar, klik "Finish".
![](../images/debinstall/ss5.png)

VM linux Debian kita sudah *ready*.
![](../images/debinstall/ss6.png)

Seharusnya, sekarang, proses instal VM linux Debian di Virtualbox sudah bisa dimulai. Tapi, ada satu *setting* lagi yang perlu kita sesuaikan. Saya akan mengganti *setting* jaringannya, dari "NAT" ke "Bridged Adapter" supaya *interface*-nya dapat terhubung langsung dengan router wifi, "wlan0". 

Nama *interface* ini (wlan0) belum tentu sama dengan nama *interface* wifi yang muncul di kalian, silakan disesuaikan saja.

### 6. Mengubah interface "NAT" ke "Bridged Adapter"

Klik bagian "Setting".
![](../images/debinstall/ss7.png)

Ke bagian "Network" dan ganti NAT ke "Bridged Adapter".
![](../images/debinstall/ss8.png)

Selesai.

## Install Debian di Virtualbox

Kita akan mulai proses instalasi Debian di Virtualbox dengan meng-klik "Start".
![](../images/debinstall/ss9.png)

Kita pilih yang "Graphical Install" supaya proses install Debian ini bisa lebih mudah.
![](../images/debinstall/ss10.png)

### 1. Pilih Bahasa
Pilih bahasa default (English).
![](../images/debinstall/ss11.png)

### 2. Set Lokasi
Karena lokasi saya sekarang di Indonesia, saya akan pilih Indonesia.

"other" -> "Asia" -> "Indonesia" 
![](../images/debinstall/ss12.png)

### 3. Set locale
Biarkan default saja di "en_US.UTF-8"
![](../images/debinstall/ss13.png)

### 4. Pilih keyboard
Default di "American English"
![](../images/debinstall/ss14.png)

### 5. Hostname
Hostname dimaksudkan untuk memberi nama komputer kita. Biarkan default di "Default".
![](../images/debinstall/ss15.png)

### 6. Domain Name 
Domain name dikosongkan saja...
![](../images/debinstall/ss16.png)

### 7. Set Root Password 
Masukkan password untuk root...
![](../images/debinstall/ss17.png)

### 8. Buat Akun
Buat Full Name akun user. Di sini saya hanya isi nama panggilan saja...
![](../images/debinstall/ss18-a.png)

Dan nama usernya, juga...
![](../images/debinstall/ss18-b.png)

### 9. Set User Password
Jangan lupa buat password untuk user yang sudah dibuat tadi...
![](../images/debinstall/ss19.png)

### 10. Clock
Karena saya ada di lokasi WIB (Waktu Indonesia Barat), maka saya pilih yang "Western".

### 11. Partisi
Untuk alasan kemudahan, pilih "Guided - use entire disk".
![](../images/debinstall/ss21.png)
![](../images/debinstall/ss22.png)
![](../images/debinstall/ss23.png)
![](../images/debinstall/ss24.png)

*Write The Changes to Disks?* **Yes**
![](../images/debinstall/ss25.png)

Kemudian, biarkan proses instalasi *base system* berjalan...
![](../images/debinstall/ss26.png)

### 12. Package Manager
*Scan extra installation media?* **No**
![](../images/debinstall/ss27.png)

Untuk mirror-nya, saya pilih server di Indonesia, supaya ketika install *package* bisa lebih cepat dan gak nge-lag.

"Indonesia" -> "mirror.poliwangi.ac.id"
![](../images/debinstall/ss28.png)

HTTP Proxy dikosongkan saja...
![](../images/debinstall/ss29.png)

Biarkan proses instalasi berjalan, proses ini mungkin akan memakan waktu yang cukup banyak, tergantung koneksi internet...
![](../images/debinstall/ss30.png)

*Participate in the package usage survey?* **No**
![](../images/debinstall/ss31.png)

### 13. Memilih *Desktop Environment* (DE)
Di tengah-tengah proses instalasi, kita akan disuguhkan pada list beberapa *Desktop Environment* (DE) yang dapat diinstall serta beberapa *software* lainnya. Di sini, saya akan menginstall Xfce dan SSH Server. Pastikan "*standard system utilities*" sudah terceklis...
![](../images/debinstall/ss32.png)

### 14. GRUB boot loader
Pastikan untuk menceklis **Yes** pada bagian "*Install the grub boot loader to your primary drive?*" untuk memastikan agar kita bisa *booting* Debian ini pasca instalasi.
![](../images/debinstall/ss33.png)

Dan pilih drive yang sudah kita set sebelumnya untuk menginstall linux Debian ini sebagai drive untuk *booting*...
![](../images/debinstall/ss34.png)

### 15. Finish The Installation
![](../images/debinstall/ss35.png)

Jika sudah berhasil sampai di sini, berarti kita sudah sampai di ujung proses instalasi. Tinggal dilanjutkan. Biarkan proses *booting*-nya berjalan hingga menampilkan *login screen* berikut, masukkan username dan password...
![](../images/debinstall/ss36.png)

Login...
![](../images/debinstall/ss37.png)

Dan kita berhasil menginstall linux Debian di Virtualbox.
![](../images/debinstall/ss38.png)

Oke. Saya cukupkan sampai di sini untuk tutorial instalasi linux Debian di Virtualbox kali ini.

Sampai jumpa di tutorial berikutnya! :)






