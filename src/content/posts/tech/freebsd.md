---
title: "FreeBSD: Unix-like Operating System"
published: 2026-05-02T13:42:02+07:00
updated: 2026-05-07
draft: false
image: "../images/freebsd/featured.png"
description: "They said FreeBSD was the most secure Operating System in the world. Is the claim true? Do you even know what truely FreeBSD is? Let's get acquainted with it!"
tags: ["freebsd", "unix"]
category: "freebsd"
---

## Getting to Know

### FreeBSD At a Glance

**FreeBSD** adalah sebuah sistem operasi untuk berbagai platform (server, desktop, dan embedded platform lainnya) yang berasal dari **BSD (_Berkeley Software Distribution_)**, sebuah versi dari **UNIX** yang dikembangkan di Universitas California, Berkeley.[^1] 

UNIX adalah sistem operasi yang didesain untuk menyediakan lingkungan komputasi yang stabil, aman, dan efisien. Sistem operasi UNIX ini dikembangkan pertama kali oleh [AT&T Bell Labs](https://en.wikipedia.org/wiki/Bell_Labs) (sebuah pusat penelitian) oleh [Ken Thompson](https://en.wikipedia.org/wiki/Ken_Thompson), [Dennis Ritchie](https://en.wikipedia.org/wiki/Dennis_Ritchie), dan kawan-kawannya,[^2] yang kemudian menjadi basis dari sistem operasi modern saat ini, seperti Linux, FreeBSD, dan MacOS.[^3]

:::note

{{< lead >}}
Singkatnya, **FreeBSD** adalah sistem operasi berbasis **UNIX** yang dikembangkan oleh **BSD** dan bersifat _open source_.
{{< /lead >}}

:::note

Berikut adalah diagram UNIX _operating system_:

[![UNIX operating system.](../images/freebsd/unix.webp)](https://www.stromasys.com/resources/all-about-the-unix-operating-system/)

### FreeBSD vs Linux

Jadi, meskipun terinspirasi dari sumber yang sama (UNIX), FreeBSD dan Linux berbeda. Selain beda pengembangnya (FreeBSD dikembangkan oleh BSD, Linux dikembangkan oleh Linus Torvald), perbedaan mendasar lainnya juga ada di kernel: FreeBSD punya kernelnya sendiri yang dikembangkan oleh FreeBSD project, sementara Linux menggunakan satu sumber kernel yang sama, yaitu kernel Linux.

Berikut adalah perbandigan FreeBSD dan Linux secara spesifik:[^4]

| Aspek                     | FreeBSD                                               | Linux                                                      |
|--------------------------|--------------------------------------------------------|------------------------------------------------------------|
| Kernel & OS              | OS lengkap (kernel + userland dikembangkan bersama)   | Hanya kernel, distro menggabungkan userland (GNU, dll)     |
| Lisensi                  | BSD License (lebih permisif)                          | GPL (copyleft, lebih ketat)                                |
| Struktur Sistem          | Lebih konsisten & terintegrasi                        | Bervariasi tergantung distro                               |
| Manajemen Paket          | pkg, ports collection                                 | apt, dnf, pacman, zypper, dll                              |
| Ports vs Repo            | Ports: compile dari source + opsi fleksibel           | Binary package lebih umum, source opsional                 |
| Dokumentasi              | Sangat rapi & terpusat (FreeBSD Handbook)             | Sangat banyak, tapi tersebar per distro                    |
| Stabilitas               | Sangat stabil (fokus server)                          | Stabil, tapi tergantung distro (Debian vs Arch, dll)       |
| Performa                 | Konsisten, efisien untuk server/networking            | Sangat baik, sering unggul di hardware terbaru             |
| Dukungan Hardware        | Lebih terbatas                                        | Sangat luas                                                |
| Driver                   | Lebih sedikit                                         | Lebih banyak & cepat update                                |
| Sistem File              | ZFS native support kuat                               | ZFS ada, tapi tidak native (lisensi conflict)              |
| Security                 | Fitur kuat (jail, secure design)                      | Kuat (SELinux, AppArmor)                                   |
| Virtualisasi             | Jails (ringan & efisien)                              | Docker, LXC, KVM, dll                                      |
| Containerization         | Jails                                                 | Docker, Kubernetes, Podman                                 |
| Update Sistem            | Terintegrasi (base system + packages terpisah)        | Bergantung distro                                          |
| Komunitas                | Lebih kecil                                           | Sangat besar                                               |
| Penggunaan Umum          | Server, networking, firewall                          | Server, desktop, embedded, cloud, dll                      |
| Kemudahan Penggunaan     | Lebih teknis                                          | Banyak distro user-friendly (Ubuntu, Mint, dll)            |
| Customization            | Tinggi (ports system)                                 | Sangat tinggi (tergantung distro)                          |
| Boot System              | rc.d                                                  | systemd (umumnya), juga alternatif                         |

Dengan perbandingan ini, maka keputusan untuk menggunakan FreeBSD atau Linux diserahkan kepada kalian masing-masing.

> Btw, saya kira "bacaan tambahan" yang cukup lengkap tentang **UNIX** bisa kalian jumpai di artikel ini: https://www.stromasys.com/resources/all-about-the-unix-operating-system/

## Installation

Pada skenario ini, saya hanya akan meng-_install_ FreeBSD sebagai VM (_virtual machine_) saja menggunakan KVM (_kernel-based virtual machine_) di Archlinux. Berikut adalah langkah-langkanya:

### Pre-Installation

#### 1. Downloading ISO file

Download file ISO terbaru dari FreeBSD di sini: https://www.freebsd.org/where/  
Terdapat 3 pilihan file di sana, dengan berbagai arsitektur:[^5]
1. **Installer:** File ISO (.iso) untuk instalasi FreeBSD di desktop, laptop, atau server. 
2. **VM:** File image VM (.qcow, .vmdk, vhd) yang sudah ter-_install_ FreeBSD, bukan file instalasi.  
3. **SD Card:** Untuk _embedded systems_ seperti Raspberry Pi yang biasanya menggunakan SD Card.

> **Notes:** Saya pilih file ISO (.iso) yang DVD.  
> Ini adalah file ISO (.iso) yang saya gunakan dalam tutorial ini (FreeBSD 15.0):  
> https://download.freebsd.org/releases/amd64/amd64/ISO-IMAGES/15.0/FreeBSD-15.0-RELEASE-amd64-dvd1.iso

#### 2. Creating a VM

:::note

**Attention!**

Tutorial ini hanya mendemonstrasikan instalasi FreeBSD di KVM dengan Virt-Manager dan QEMU. Jika kalian ingin meng-_install_ FreeBSD di Hypervisor yang lain seperti VMWare atau VirtualBox, silakan. 

:::

Artikel ini tidak menjelaskan secara detail cara instalasi Virt-Manager. Untuk meng-_install_ Virt-Manager di Linux, kalian bisa baca artikel saya yang lain:

{{< article link="/tech/virt-manager/" showSummary=true compactSummary=true >}}

Untuk membuat VM dengan KVM dan QEMU:
1. Hidupkan _service_ `libvirtd` dan aktifkan VM _network_.

```shell
sudo systemctl start libvirtd
sudo systemctl status libvirtd

sudo virsh net-start default
sudo virsh net-list --all 
```

2. Buat VM dengan di `virt-manager`.

```shell
virt-manager --connect qemu:///system --show-domain-creator
```

- Pilih "Local install media (ISO image or CDROM)".
- Pilih file ISO (.iso) FreeBSD yang sudah kalian _download_.
- Alokasikan CPU & RAM.
- Alokasikan _storage_ (penyimpanan).
- Sesuaikan nama VM & _network_ (jika perlu).
- Selesai.

### Installation Process

Setelah proses membuat VM selesai, akan muncul window baru, yang menandakan VM FreeBSD tersebut berhasil dibuat dan sedang berjalan. Berikut adalah tahapan-tahapan instalasinya:

> Dokumentasi instalasi FreeBSD sudah dijelaskan dengan jelas dan detail di:
> https://docs.freebsd.org/en/books/handbook/bsdinstall/

#### 1. Boot Installer

Pilih "1. Boot Installer [Enter]"

![FreeBSD first UI](../images/freebsd/ss1.png)

#### 2. Install

Pilih "Install".

![Install](../images/freebsd/ss2.png)

#### 3. Keymap Selection

Pilih "default" pada keymap selection.

![Keymap selection: default](../images/freebsd/ss3.png)

#### 4. Hostname

Buat Hostname (nama mesin FreeBSD kalian).

![Hostname](../images/freebsd/ss4.png)

#### 5. Installation Type

Pilih "Distribution Sets" pada Installation Type, karena lebih stabil.[^6]

![Installation type: Distribution Sets](../images/freebsd/ss5.png)

#### 6. Selecting Components

Pilih 3 komponen: "kernel-dbg", "lib32", dan "ports".

![Selecting components to install](../images/freebsd/ss6.png)

#### 7. Partitioning

Pilih "Auto (ZFS): Guided Root-on-ZFS" pada Partitioning.

![Partitioning](../images/freebsd/ss7.png)

#### 8. ZFS Configuration
- Pada Configure Options, pilih "Install: Proceed with Installation"

![ZSF: Configure Options](../images/freebsd/ss8.png)

- Pada Virtual Device Type, pilih "stripe: Stripe - No Redundancy"

![ZFS: Virtual Devie Type](../images/freebsd/ss9.png)

- Ceklis disk yang akan kita gunakan. Akan ada window "warning", pilih "Yes". Proses ekstraksi berjalan, tunggu hingga selesai.

![Setup Disk](../images/freebsd/ss10.png)

#### 9. Root Password

Buat Password Root

![Set Root Password](../images/freebsd/ss11.png)

#### 10. Network Manager

Pilih "Auto" pada Network Manager yang tersedia. Tunggu hingga mesin mendapatkan DHCP IP.

![Network Manager](../images/freebsd/ss12.png)

#### 11. Timezone Selector

Pada "Timezone Selector", pilih Asia > Indonesia > Java, Sumatera. Akan muncul bagian konfirmasi (WIB), pilih "Yes".

![Timezone](../images/freebsd/ss13.png)

#### 12. Time & Date

Time & Date biarkan default (di-skip saja).

![Time & Date](../images/freebsd/ss14.png)

#### 13. System Configuration

Selain sshd & dumpdev (default), pilih juga moused sebagai _service_ yang akan dijalankan ketika _booting_.

![System configuration](../images/freebsd/ss15.png)

#### 14. System Hardening

System hardening biarkan default.

![System hardening](../images/freebsd/ss16.png)

#### 15. Add User Account

Pada Add User Account, kita hanya perlu membuat "username", "full name", dan jangan lupa menambahkan user group-nya ke "wheel". Sisanya biarkan default. Pilih "Yes" pada kolom konfirmasi.

![Add User Account](../images/freebsd/ss17.png)

#### 16. Final Configuration

Pilih "Finish" jika sudah tidak ada yang ingin diubah lagi.

![Final Configuration](../images/freebsd/ss18.png)

Dan inilah pertanda bahwa instlasi kita selesai:

![Installation Finished](../images/freebsd/ss19.png)

Dengan demikian, proses instalasi FreeBSD sudah berakhir! Kita bisa mengabaikan "Manual Configuration" tersebut jika memang sudah tidak ada yang perlu dimodifikasi/diganti/diubah lagi. 

Setelah itu, kita dapat me-_reboot_ sistem FreeBSD kita.

#### 17. Login

Saya berhasil login ke FreeBSD!  
Jangan khawatir, tampilannya (_interface_) memang masing berbasis CLI (_Command Line Interface_), karena kita belum meng-_install_ DE (_Desktop Environment_) atau WM (_Window Manager_) apapun. 

![Login](../images/freebsd/ss20.png)

### Post-Installation

#### 1. Update System

Setelah instalasi berhasil, hal pertama yang perlu kita lakukan adalah meng-update sistem:

```shell
su - # login ke user root
freebsd-update fetch
freebsd-update install
```

#### 2. Install sudo

Kita akan meng-_install_ `sudo`. Tujuannya jelas, agar ketika kita memerlukan akses root (misalnya untuk meng-_install_ package), kita tidak perlu selalu login ke user root, karena bisa menggunakan `sudo`. 

Karena baru pertama kali menggunakan `pkg` sebagai _package manager_, kita akan diminta meng-_install_ `pkg` terlebih dahulu.

```shell
su - # login ke root shell
pkg install sudo 
```

Setelah instalasi berhasil, jangan lupa mengaktifkan akses "wheel" ke sudo:

```shell
visudo # masuk ke konfigurasi sudoers
%wheel ALL=(ALL:ALL) NOPASSWD: ALL # uncomment
```

Untuk memastikan sudo sudah berhasil ter-_install_ dan terkonfigurasi:

```shell
sudo su
```





[^1]: https://www.freebsd.org/about/
[^2]: https://en.wikipedia.org/wiki/Unix
[^3]: https://www.geeksforgeeks.org/linux-unix/introduction-to-unix-system/
[^4]: https://www.chatgpt.com
[^5]: https://docs.freebsd.org/en/books/handbook/bsdinstall/#bsdinstall-synopsis
[^6]: https://docs.freebsd.org/en/books/handbook/bsdinstall/#bsdinstall-start