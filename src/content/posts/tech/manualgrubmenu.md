---
title: "Manual GRUB Boot Menu Entry"
published: 2026-09-27T10:23:17+07:00
updated: 2026-09-29
# slug: "grub2"
image: "../images/manualgrubmenu/featured.avif"
draft: false
description: "How to create manual GRUB boot menu entry in Linux"
tags: ["grub", "boot", "entry", "efi", "linux"]
category: "grub"
series: "GRUB configuration"
seriesOrder: 2
---

:::warning[AI Usage]

This article uses AI agent (Anthropic Claude) to elaborate on some details.

:::


## Preface

Ketika kita melakukan _dual boot_ di PC/Laptop kita (terutama dengan Linux), maka umumnya kita mengandalkan `os-prober` untuk mencari dan mendaftarkan OS yang ada ke _bootloader_ (dalam konteks ini GRUB - _Grand Unified Bootloader_). Namun, beberapa masalah dapat terjadi dan tidak dapat diatasi dengan hanya menggunakan `os-prober`. Misalnya, jika kita meng-_install_ 2 (atau lebih) sistem operasi dengan ***entry*** yang tidak dapat terdeteksi otomatis (via `os-prober`), maka solusinya adalah menambahkan _entry_ tersebut secara manual. 

### Real use case

Sebagai referensi kasus nyata, saya akan ceritakan masalah yang saya alami. Beberapa waktu lalu, saya meng-_install_ NixOS sebagai "OS secondary" setelah Archlinux (dan Windows) di SSD yang sama. Setelah selesai memasang NixOS, saya ingin memastikan bahwa NixOS tersebut dapat terdaftar sebagai _boot entry_ di GRUB Archlinux, sehingga saya jalankan `os-prober`. Benar saja, NixOS dapat terdaftar di GRUB Archlinux. TAPI, sayangnya, ketika saya mencoba masuk ke NixOS dari _entry_ tersebut di GRUB, saya "terlempar" ke Archlinux. Dengan kata lain, _entry_ NixOS yang terdaftar di GRUB tersebut **tidak benar-benar menyertakan file _bootloader_-nya** sehingga saya tidak bisa masuk (login).

Setelah mencari tahu penyebabnya, saya menemukan fakta bahwa `os-prober` memang "ngaco" karena tidak bisa mendeteksi kernel/initrd/root NixOS yang memang "dinamis" bergantung ***generation***-nya di `systemd-boot` _bootloader_. Jadi, salah satu solusi yang paling "waras" adalah dengan meng-_input_-kan secara manual file EFI-nya ke konfigurasi GRUB.

## Practical Guide

Berikut adalah langkah-langkah praktis untuk memasukkan _entry_ boot ke GRUB.

### How GRUB config works

Sebelum memulai, kita perlu tahu cara kerja konfigurasi GRUB ketika kita menjalankan `grub-mkconfig`.  
Berikut adalah isi direktori `/etc/grub.d/` saya di Archlinux:

```shell title="/etc/grub.d"
Permissions Size User Date Modified Name
.rwxr-xr-x  9.8k root 15 Jan 16:03  󰡯 00_header
.rwxr-xr-x   13k root 15 Jan 16:03  󰡯 10_linux
.rwxr-xr-x   14k root 15 Jan 16:03  󰡯 20_linux_xen
.rwxr-xr-x   786 root 15 Jan 16:03  󰡯 25_bli
.rwxr-xr-x   13k root 15 Jan 16:03  󰡯 30_os-prober
.rwxr-xr-x  1.2k root 15 Jan 16:03  󰡯 30_uefi-firmware
.rwxr-xr-x   556 root 26 Sep 18:31  󰡯 40_custom
.rwxr-xr-x   215 root 15 Jan 16:03  󰡯 41_custom
.rw-r--r--   483 root 15 Jan 16:03  󰂺 README
```

Ketika file konfigurasi GRUB di-_generate_ dengan perintah `grub-mkconfig`, yang terjadi:

1. `grub-mkconfig` menjalankan semua _script executable_ di `/etc/grub.d/` tersebut sesuai urutan angka prefix-nya (**00_header**, **10_linux**, dst).
2. Tiap _script_ akan men-_generate_ "potongan konfigurasi" masing-masing yang kemudian digabungkan menjadi satu di `grub.cfg`.

Perhatikan 3 file _script_ ini:
- **10_linux**: mendeteksi kernel yang ter-_install_ di sistem lokal.  
- **30_os-prober**: mendeteksi OS lain di partisi/disk lain (kalau paket `os-prober` ter-_install_ dan diaktifkan).  
- **40_custom**: bukan _script_, tapi komentar _placeholder_ (tempat kosong) untuk memasukkan _entry_ sendiri secara manual (misalnya _chainload_ ke OS lain, boot ISO, kernel custom, atau _entry_ apapun yang mau ditulis manual).  

### How to manually input GRUB custom entry

Sekarang, setelah mengetahui cara kerja GRUB dalam men-_generate_ konfigurasinya, kita tahu dimana kita akan membuat _entry_ secara manual: **`/etc/grub.d/40_custom`**.

:::info[40_custom]

_By default_, isi file `40_custom` hanya seperti ini (kosong):

```shell title="40_custom"
#!/bin/sh
exec tail -n +3 $0
# This file provides an easy way to add custom menu entries.  Simply type the
# menu entries you want to add after this comment.  Be careful not to change
# the 'exec tail' line above.
```

Berikut adalah _template_ **menuentry** yang akan dimasukkan ke `40_custom`:

```shell {4-5} title="40_custom"
menuentry "Label" {
    insmod part_gpt
    insmod fat
    search --no-floppy --fs-uuid --set=root UUID
    chainloader /path/to/bootloader.efi
}
```

Keterangan:[^1]
1. `menuentry "Label" { ... }`: mendefinisikan satu _entry_ di menu boot GRUB. Teks di dalam kutip adalah nama yang muncul di layar boot. Isi kurung kurawal adalah perintah GRUB yang dijalankan kalau _entry_ itu dipilih.
2. `insmod part_gpt`: _load_ module GRUB untuk membaca skema partisi GPT (GUID Partition Table). Umumnya, partisi modern menggunakan GPT, bukan MBR. Namun, sesuaikan dengan jenis partisinya.
3. `insmod fat`: _load_ module untuk membaca filesystem FAT. Ini penting karena ESP (EFI System Partition) — partisi tempat semua file .efi disimpan di sistem UEFI — selalu diformat FAT32.
4. `search --no-floppy --fs-uuid --set=root B071-9102`:  
- `search`: cari partisi tertentu.  
- `--no-floppy`: jangan cek floppy disk (optimasi, biar cepat).  
- `--fs-uuid`: kriteria pencarian: cari berdasarkan UUID filesystem.  
- `--set=root B071-9102`: kalau ketemu partisi dengan UUID B071-9102, set partisi itu sebagai root device GRUB untuk sisa perintah di dalam entry ini.  
5. `chainloader /EFI/.../xxx.efi`: setelah root device di-set, GRUB "menyerahkan" proses boot ke file .efi tersebut (teknik ini disebut chainloading) — GRUB tidak boot OS itu sendiri, cuma memuat bootloader OS itu dan membiarkan bootloader itu yang melanjutkan (systemd-boot untuk NixOS, Windows Boot Manager untuk Windows, dan seterusnya).

:::

Untuk meng-_input_-kan _entry_ baru, kita bisa menggunakan perintah berikut:  
(Misalnya, saya akan meng-_input_-kan NixOS)

```shell title="40_custom"
sudo tee -a /etc/grub.d/40_custom > /dev/null << 'EOF'

menuentry "NixOS (systemd-boot)" {
    insmod part_gpt
    insmod fat
    search --no-floppy --fs-uuid --set=root B071-9102
    chainloader /EFI/systemd/systemd-bootx64.efi
}
EOF
```

> Perintah tersebut akan menambahkan menuentry NixOS tersebut di bagian akhir file `40_custom` tanpa me-_replace_ konten yang sudah terlebih dahulu ada. Artinya, jika kalian ingin menambahkan menuentry baru, tinggal gunakan perintah yang sama (tentu dengan mengganti bagian-bagian yang perlu disesuaikan). 

Setelah itu jalankan:

```shell
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

:::note[`os-prober`]

Jika kita tidak lagi memerlukan `os-prober`, kita perlu "me-non-aktifkan"-nya terlebih dahulu sebelum menjalankan perintah di atas.  
Caranya:

Edit `/etc/default/grub`, pastikan baris ini di-_comment_/bernilai _true_:

```shell
   GRUB_DISABLE_OS_PROBER=false
```

:::

Kita bisa memverifikasi menuentry-nya dengan perintah:

```shell
grep -n "menuentry" /boot/grub/grub.cfg
```

Selesai.

Sebagai tambahan, berikut adalah isi file `/etc/grub.d/40_custom` saya saat ini:

```
#!/bin/sh
exec tail -n +3 $0
# This file provides an easy way to add custom menu entries.  Simply type the
# menu entries you want to add after this comment.  Be careful not to change
# the 'exec tail' line above.

menuentry "NixOS (systemd-boot)" {
    insmod part_gpt
    insmod fat
    search --no-floppy --fs-uuid --set=root B071-9102
    chainloader /EFI/systemd/systemd-bootx64.efi
}

menuentry "Windows 10" {
    insmod part_gpt
    insmod fat
    search --no-floppy --fs-uuid --set=root B071-9102
    chainloader /EFI/Microsoft/Boot/bootmgfw.efi
}
```

--- 

Saya juga pernah menulis tentang GRUB, terutama terkait kustomisasi tema, aktivasi `os-prober`, dan beberapa hal lain:

[[/tech/grub]]


[^1]: https://claude.ai/
