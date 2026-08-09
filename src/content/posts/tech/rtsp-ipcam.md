---
title: "Accessing RTSP IP CCTV From Media Player"
published: 2026-06-09T09:29:24+07:00
updated: 2026-06-14
draft: false
image: "../images/rtsp-ipcam/featured.png"
description: "RTSP stands for Real-time Streaming Protocol, which is a protocol capable of casting real-time CCTV streaming video. It does not rely on certain apps to do that. So, as long as the app supports RTSP (like MPV and VLC), it will work perfectly."
tags: ["rtsp", "onvif", "nvr", "cctv", "ipcam", "mpv", "vlc", "media", "streaming"]
category: "rtsp"
---

:::warning[Disclaimer!]

Artikel ini tidak membahas aktivasi atau cara menghubungkan CCTV ke Aplikasi dari awal, tapi hanya membahas cara mengaktifkan fitur RTSP dan menggunakannya saja. 

:::

## A Glimpse of RTSP

Pernah dengar RTSP?

RTSP adalah singkatan dari **_Real-Time Streaming Protocol_**, sebuah protokol jaringan yang berada di "Application Layer" yang berfungsi sebagai _remote control_ untuk media server. Jadi, intinya, protokol ini digunakan untuk membuat, mengontrol, dan mengatur _streaming_ audio dan video berbasis IP Address secara _real-time_ sehingga memungkinkan penggunanya untuk mengirim perintah-perintah seperti "play", "pause", dan "record".[^1]

Kalau kita sering atau pernah kenal dengan CCTV berbasis IP, maka RTSP biasanya ada di sana. Dengan adanya fitur ini, banyak CCTV dapat dikontrol dari jauh, terutama jika kita mengintegrasikannya dengan **NVR** dan **ONVIF**. Meskipun demikian, perlu diketahui juga bahwa tidak semua CCTV berbasis IP memiliki fitur ini. Sebab, kehadiran fitur ini bergantung pada kesediaan merek/perusahaan/produsen. Beberapa merek/perusahaan/produsen ada yang memang sengaja me-non-aktifkan fitur ini di firmware CCTV, sehingga terkadang untuk membuka fitur RTSP ini, kita perlu "menginjeksikan" kode konfigurasi tertentu melalui micro SD card,[^2] itupun jika konfigurasi firmwarenya tidak dienkripsi oleh merek/perusahaan/produsen terkait, jika dienkripsi artinya kita hampir mustahil untuk mendapatkan fitur tersebut.

>**NVR & ONVIF**
>
>> NVR (_Network Video Recorder_) adalah perangkat (_hardware_) sistem keamanan yang digunakan untuk menyimpan rekaman video CCTV.[^3] Jadi, NVR ini merupakan komputer khusus yang "ditempel" hardisk, sehingga CCTV berbasis IP bisa menyimpan rekamannya langsung ke hardisk tersebut dengan aman, baik via LAN (kabel) ataupun via WiFi (nirkabel), tanpa perlu bergantung pada microSD card.[^4] 
>
> [![NVR](../images/rtsp-ipcam/ss1.png)](https://www.blibli.com/p/nvr-hikvision-8-channel-ds-7608ni-q2-8p-nvr-8ch-poe-hikvision/ps--TOC-70003-01628)
> 
>> Sedangkan ONVIF (_Open Network Video Interface Forum_) adalah sebuah standard global untuk memastikan perangkat-perangat digital berbasis IP (CCTV IP) dapat saling berkomunikasi, meskipun berbeda merek/perusahaan/produsen.[^5] Standard ini diperlukan, terutama jika kita sudah menggunakan banyak CCTV berbeda di satu NVR. Jadi, dengan adanya standard ini, CCTV kita dapat saling berinteraksi meskipun berbeda manufaktur/pabrik. ONVIF juga jelas berbeda dengan RTSP, jadi tidak perlu diperbandingkan dan dibingungkan.[^6]

Nah, di artikel ini, saya akan menunjukkan cara mengaktifkan fitur RTSP di CCTV IP. Kebetulan, saya beli CCTV merek Yoosee (tidak di-_endorse_) di Shopee. CCTV ini menurut saya sudah memiliki banyak fitur lain yang cukup standard, seperti PTZ, Infrared, Motion Detection, Speaker, dan tentu saja NVR (yang otomatis akan mengaktifkan RTSP juga).

:::info

Link CCTV saya di Shopee: [Yoosee CCTV 1080p WiFi PTZ](https://shopee.co.id/Yoosee-CCTV-Full-HD-1080P-WIFI-355%C2%B0-PTZ-Deteksi-Gerakan-Al-Notifikasi-Real-time-Suara-Dua-Arah-i.1741198394.45957621722)

:::

## RTSP Activation

Persyaratan utama sebelum mengaktivasi RTSP adalah tentu aja: Sudah mengunduh aplikasi resmi Yoosee di smartphone (saya download dari _Play Store_ karena Android) dan CCTV sudah berhasil terkonfigurasi dan terhubung dengan aplikasi tersebut.

[![Yoosee Applicaion on Google Play Store](../images/rtsp-ipcam/ss7.png)](https://play.google.com/store/apps/details?id=com.yoosee&hl=id)

Berikut adalah langkah-langkah mengaktivasi fitur RTSP:

### 1. Tap Kamera CCTV.

Langkah pertama adalah meng-klik (tap) kamera CCTV yang muncul di aplikasi, seperti terlihat pada bagian yang diberi kotak merah. (Bisa juga langsung klik icon _settings_).

![Tap CCTV Camera](../images/rtsp-ipcam/ss2.png)

### 2. Tap Icon Settings

Kemudian, tap icon _settings_ yang berada di pojok kanan atas.

![Tap 'Settings' Icon](../images/rtsp-ipcam/ss3.png)

### 3. Tap "More Options" 

Di settings, pilih "**More Options**".

![Choose More Options](../images/rtsp-ipcam/ss4.png)

### 4. Tap "NVR Connection"

Pastikan di sana ada opsi "NVR Connection". Jika tidak ada, berarti kamera belum support NVR Connection (yang artinya juga kemungkinan besar belum support RTSP).

Tap "**NVR Connection**".

![Tap 'NVR Connection](../images/rtsp-ipcam/ss5.png)

### 5. Enable Connection

Aktifkan NVR Connection.

Setelah itu, kita akan diminta memasukkan password sebagai tambahan keamanan agar RTSP kita tidak sembarang bisa diakses oleh orang lain.

![Enable NVR](../images/rtsp-ipcam/ss6.png)

Selesai.

## Accessing RTSP

Secara praktis, sekarang, CCTV sudah dapat diakses melalui media player, seperti [VLC](https://www.videolan.org/vlc/) dan [MPV](https://mpv.io/).

### VLC 

Berikut adalah langkah-langkah mengakses CCTV melalui VLC:

#### 1. Media > Open Network Stream.

Buka VLC. Kemudian, klik menu "Media". Lalu pilih "Open Network Stream".

![VLC > Media > Open Network Stream](../images/rtsp-ipcam/ss8.png)

#### 2. Input RTSP URL

Masukkan URL RTSP berikut di kolom "Network", kemudian "Play".

```shell
rtsp://admin:<Password>@<IP_Address>:554/onvif1
```

![Input RTSP URL](../images/rtsp-ipcam/ss9.png)

:::tip

Stream Path pada CCTV yang umum digunakan biasanya ada "_**Main Stream**_" (`/onvif1`) dan _**Sub Strem**_ (`/onvif2`). 

Keduanya berbeda, tentu saja. "_**Main Stream**_" (`/onvif1`) digunakan untuk mendapatkan rekaman dengan resolusi tinggi atau tampilan maksimal. Sementara _**Sub Strem**_ (`/onvif2`) digunakan untuk mendapatkan rekaman dengan resolusi yang lebih rendah sehingga cocok untuk live CCTV (tampilan langsung) karena akan lebih lancar dan hemat bandwith.

:::

### MPV 

Untuk melakukan streaming video CCTV dari MPV, gunakan perintah berikut:

```shell
mpv rtsp://admin:YOOSEE123456@192.168.100.230:554/onvif2 --demuxer-lavf-o=rtsp_transport=udp
```

Atau jika tidak ingin selalu menyertakan opsi `--demuxer-lavf-o=rtsp_transport=udp`, maka kita bisa simpan opsi tersebut di konfigurasi MPV di `~/.mpv/mpv.conf` atau `~/.config/mpv/mpv.conf`. Dengan demikian, kita hanya mengetikkan perintah berikut ini saja tanpa harus menginputkan opsi apapun:

```shell
mpv rtsp://admin:YOOSEE123456@192.168.100.230:554/onvif2
```

> **Notes:**
>> Mengapa perlu opsi `--demuxer-lavf-o=rtsp_transport=udp` di MPV?
>
>> Jawabannya, karena secara default, MPV akan menggunakan TCP, sementara kamera CCTV saya menggunakan UDP. Akibatnya, MPV tidak dapat memutar _streaming_ CCTV. Oleh karena itu, opsi ini harus di-_include_-kan agar MPV bisa menjalankan _streaming_ CCTV dengan baik. 

:::tip

Stream Path pada CCTV yang umum digunakan biasanya ada "_**Main Stream**_" (`/onvif1`) dan _**Sub Strem**_ (`/onvif2`). 

Keduanya berbeda, tentu saja. "_**Main Stream**_" (`/onvif1`) digunakan untuk mendapatkan rekaman dengan resolusi tinggi atau tampilan maksimal. Sementara _**Sub Strem**_ (`/onvif2`) digunakan untuk mendapatkan rekaman dengan resolusi yang lebih rendah sehingga cocok untuk live CCTV (tampilan langsung) karena akan lebih lancar dan hemat bandwith.

:::

Sekian.  
Terima kasih sudah membaca.







[^1]: https://en.wikipedia.org/wiki/Real-Time_Streaming_Protocol
[^2]: https://gist.github.com/SolveSoul/9be5d9599c8b4b59f7cfa4cd0ce79c9c
[^3]: https://senstar.com/senstarpedia/what-is-nvr/
[^4]: https://www.hokione.id/blog/apa-itu-nvr
[^5]: https://www.pelco.com/blog/onvif-guide
[^6]: https://xdc-indonesia.com/kenali-apa-itu-onvif-manfaat-dan-cara-penggunaannya-untuk-kamera-ip/