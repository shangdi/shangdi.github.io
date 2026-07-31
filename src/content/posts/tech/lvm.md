---
title: "LVM: A Realistic Way to Manage Your Dynamic Storage"
published: 2026-07-11T17:20:12+07:00
draft: false
image: ../images/lvm/featured.png
summary: "Have you ever tought of extending or reducing your active linux partition size? If yes, LVM might be your best friend to accomplish that purpose as it offers convenient yet safe way to resize your linux partition size."
tags: ["lvm", "partition", "disk", "drive", "linux"]
category: "lvm"
---

## Opening

### Chit-chat

Salah satu hal yang paling saya cari-cari sejak mulai main linux adalah flexibilitas dalam memperbesar atau mengurangi ukuran _storage_. Sebab, saya sering menjumpai kapasitas atau ukuran partisi yang saya alokasikan untuk sebuah linux tidak bisa fix. Dengan kata lain, partisi linux berukuran 200 GB yang saya kira cukup untuk waktu yang lama, pada kenyataannya cepat sekali membengkak dan rewel untuk minta diperluas ukurannya (mungkin karena partisi root (/) dan home (/home) saya satukan?).

Kalau di _virtual machine_, tentu mengubah (memperbesar atau mengurangi) ukuran penyimpanan (_storage_) adalah hal yang mudah. Kita hanya perlu pergi ke "Settings", kemudian cari bagian "Storage" atau "Disk", lalu kita bisa sesuaikan ukurannya. Berbeda jika di baremetal (komputer/_storage_ fisik). Mengubah ukuran penyimpanan di partisi yang sudah diformat akan sangat merepotkan, kalau tidak mungkin. Selain itu, jika kapasitas disk (hardisk/nvme) kita kecil (misalnya 128 GB) dan sudah mau penuh, ketika kita ingin melakukan _upgrade_ system, satu-satunya cara agar system kita tidak crash di tengah _upgrade_ adalah dengan menghapus beberapa file terlebih dahulu untuk me-lega-kan penyimpanan.

Oleh karena itu, LVM hadir sebagai solusi terhadap masalah tersebut.

### LVM History

Pada awalnya, LVM diciptakan oleh Heinz Mauelshagen pada tahun 1998 ketika dia sedang bekerja di [Sitisna Software](https://en.wikipedia.org/wiki/Sistina_Software).[^3] Hingga hari ini, LVM sudah banyak diadopsi di banyak sistem operasi berbasis UNIX, seperti Linux dan FreeBSD. Bahkan, Ubuntu Server sendiri sudah menggunakan LVM sebagai opsi instalasinya.[^4]

### LVM, What is It?

LVM atau **_Logical Volume Manager_** adalah sebuah sistem manajemen penyimpanan di Linux yang memungkinkan penggunanya melakukan beberapa hal berikut:[^1]
- Menggabungkan beberapa disk menjadi satu volume.  
- Memperbesar atau memperkecil (_resize_) kapasitas partisi dengan mudah.  
- Mengelola storage secara dinamis tanpa _downtime_.  

Struktur utama dalam LVM sendiri ada 3:[^2]
1. **PV (_Physical Volume_)**: Sebuah disk fisik atau partisi yang digunakan untuk membuat blok untuk LVM.  
2. **VG (_Volume Groups_)**: Sebuah _pool_ PV yang memungkinkan kita menggabungkan beberapa disk atau partisi untuk membuat LV.  
3. **LV (_Logical Volumes_)**: Volume yang fleksibel dan dinamis yang dibuat berdasarkan VG yang ada sehingga membentuk disk virtual.  

Jadi, cara kerja LVM juga ada 3: 
1. Membuat PV untuk disk / partisi yang ingin didaftarkan ke LVM.
2. Membuat VG berdasarkan PV yang sudah terdaftar.
3. Membuat LV dari VG yang sudah dibuat.

Berikut adalah ilustrasi ketiganya:

[![lvm structure. Created with: excalidraw.com](../images/lvm/ss1.png)]((https://excalidraw.com))

Berdasarkan gambar di atas, terlihat bahwa saya memiliki:
1. **2 PV**: PV-1 & PV-2 
2. **2 VG**: VG-1 & VG-2
3. **3 LV**: LV-1, LV-2, dan LV-3

Seandainya partisi LV-1 saya  di VG-2 (`/home`) sudah mulai penuh, saya hanya tinggal memperbesar ukurannya ke LV-2, dengan ukuran yang saya inginkan (gak mesti langsung semua sisa partisi saya gunakan). Tapi perlu dicatat, partisi LV-1 di VG-1 tidak bisa diperbesar ke LV-2 di VG-2 karena sudah beda VG (kecuali sudah ditambahkan). 

Jadi, dengan adanya LVM, kita bisa lebih bebas mengatur bagaimana penyimpanan fisik kita dikelompokkan. Jika kita ingin agar kita lebih punya kebebasan dalam mengatur semua disk fisik, kita bisa mengelompokkan semua disk fisik tersebut (misalnya Disk1: 500GB, Disk2: 1TB, dan Disk3: 2TB) ke dalam satu VG yang sama, baru nanti kita bisa atur partisinya sesuai kehendak kita di LV. 

## Main Event

### Installation

Berikut adalah cara meng-_install_ `lvm` di beberapa sistem operasi UNIX/Linux:

|       Distro      |                  Command           |
|       ---         |                   ---              |
| **Debian/Ubuntu** | **`sudo apt install -y lvm2`**     |
| **Arch Linux**    | **`sudo pacman -Sy lvm2`**         |
| **Fedora**        | **`sudo dnf install lvm2`**        |
| **FreeBSD**       | **`sudo pkg install lvm2`**        |

> **Notes:** OpenSUSE belum menyediakan paket `lvm2` di repo official-nya, jadi kita perlu menambahkannya terlebih dahulu secara manual.
> ```shell
> zypper addrepo https://download.opensuse.org/repositories/Base:System/openSUSE_Tumbleweed/Base:System.repo
> zypper refresh
> zypper install lvm2
> ```

:::note

**NixOS:**  
Masukkan baris berikut di file konfigurasi (`/etc/nixos/configuration.nix`):

```nix title="configuration.nix"
environment.systemPackages = [
  pkgs.lvm2
];
```

Atau jika menggunakan `nix-shell`:

```shell
nix-shell -p lvm2  
```

:::

### Usage 

Sebelum masuk ke pembuatan LVM, saya mau berbagi _layout_ LVM saya terlebih dahulu. Berikut adalah rencana _layout_ LVM saya:

[![my lvm plan. **Created with:** excalidraw.com](../images/lvm/ss2.png)](https://excalidraw.com)

Seperti terlihat, saya memang hanya berencana membuat LVM di satu disk saja, setidaknya untuk saat ini. Jadi, berdasarkan _layout_ tersebut, kita nanti akan membuat sebuah PV, sebuah VG, dan sebuah LV.

Berikut adalah disk 2TB yang saya maksud:

![/dev/sda](../images/lvm/ss3.png)

:::danger

Beberapa hal penting yang juga perlu diperhatikan sebelum membuat PV:
1. Pastikan tidak ada data penting di disk/partisi yang akan didaftarkan ke PV.
2. Hapus format filesystem disk/partisi dengan perintah 

```shell
sudo wipefs /dev/sda
```

:::

#### PV (Physical Volume)

##### 1. Creating PV

Untuk membuat _physical volume_ (PV):[^5]

```shell
# ganti "/dev/sda" dengan disk/partisi yang perlu didaftarkan ke LVM
sudo pvcreate /dev/sda
```

##### 2. Showing PV info

Untuk melihat info PV:

```shell
sudo pvdisplay
# atau
sudo pvs
```

##### 3. Removing PV 

Untuk menghapus PV:

```shell
# ganti "/dev/sda" dengan disk/partisi yang sudah didaftarkan ke PV
sudo pvremove /dev/sda
```

##### 4. Resizing PV

Untuk me-_resize_ PV:

```shell
# ganti "/dev/sda" dengan disk/partisi yang sudah didaftarkan ke PV
sudo pvresize /dev/sda
```

#### VG (Volume Group)

##### 1. Creating VG

Untuk membuat VG (dari satu atau lebih PV):

```shell
# ganti "/dev/sda" dengan disk/partisi yang sudah didaftarkan ke PV
sudo vgcreate vg_data /dev/sda 
```

:::note

**Catatan:**
1. **vg_data** adalah nama VG, bebas kita tentukan sendiri.
2. Karena PV yang akan saya buat VG hanya satu, maka perintahnya hanya `sudo vgcreate vg_data /dev/sda`. Tapi, kalau ada lebih dari satu disk/partisi, maka perintahnya:

```shell
sudo vgcreate vg_data /dev/sda /dev/sdb
```

::: 

##### 2. Showing VG info

Untuk melihat info VG:

```shell
sudo vgdisplay
# atau
sudo vgs
```

##### 3. Menambah PV ke VG  

Untuk menambah PV ke VG yang sudah ada:

```shell
sudo vgextend vg_data /dev/sdd
```

##### 4. Mengeluarkan PV dari VG  

Untuk mengeluarkan PV dari VG:

```shell
sudo vgreduce vg_data /dev/sdd
```

##### 5. Removing VG 

Untuk menghapus VG:

```shell
# ganti "vg_data" dengan nama VG yang ingin dihapus
sudo vgremove vg_data
```

##### 6. Renaming VG 

Untuk mengganti nama VG:

```shell
# ganti "vg_data" dengan nama VG yang ingin diganti namanya
sudo vgrename vg_data vg_storage
```

#### LV (Logical Volume)

##### 1. Creating LV

Untuk membuat LV dengan ukuran spesifik:

```shell
sudo lvcreate -L 200G -n lv_home vg_data 

# lv_home adalah nama LV, bebas kalian tentukan sendiri
# ganti vg_data dengan nama VG yang ingin kalian buatkan LV di atasnya
```

Untuk membuat LV berdasarkan persentase _free space_ di VG:

```shell
sudo lvcreate -l 100%FREE -n lv_home vg_data

# lv_home adalah nama LV, bebas kalian tentukan sendiri
# ganti vg_data dengan nama VG yang ingin kalian buatkan LV di atasnya
```

##### 2. Showing LV info

Untuk melihat info LV:

```shell
sudo lvdisplay
# atau
sudo lvs
```

##### 3. Extending LV size

Untuk memperbesar ukuran LV:

```shell
# menambah 100 GB
sudo lvextend -r -L +100G /dev/vg_data/lv_home
```

Memperbesar ukuran LV menggunakan persentase _free space_:

```shell
sudo lvextend -r -l +100%FREE /dev/vg_data/lv_home
```

:::note

Perhatikan bahwa saya melampirkan tag `-r` yang berarti mengikutsertakan langsung perubahan file system juga ketika memperbesar LV. Tag `-r` atau `--resizefs` tersebut biasanya hanya untuk file system ext4. Jika file system yang kita buat berbeda (misalnya NTFS), maka tidak bisa menggunakan tag tersebut dan harus me-_resize_ file system secara manual dengan perintah khusus.

:::

##### 4. Reducing LV size

Untuk memperkecil/mengurangi ukuran LV:

```shell
# mengurangi 100 GB
sudo lvreduce -r -L 100G /dev/vg_data/lv_home
```

:::note

Perhatikan bahwa saya melampirkan tag `-r` yang berarti mengikutsertakan langsung perubahan file system juga ketika memperbesar LV. Tag `-r` atau `--resizefs` tersebut biasanya hanya untuk file system ext4. Jika file system yang kita buat berbeda (misalnya NTFS), maka tidak bisa menggunakan tag tersebut dan harus me-_resize_ file system secara manual dengan perintah khusus.

:::

##### 5. Removing LV

Untuk menghapus LV:

```shell
sudo lvremove /dev/vg_data/lv_home
```

##### 6. Renaming LV

Untuk mengganti nama LV:

```shell
sudo lvrename vg_data lv_home lv_home_old
```

#### Formatting

Misalnya, sekarang, LV saya akan terlihat seperti ini:

```shell
sudo lvdisplay 
```

```
  --- Logical volume ---
  LV Path                /dev/vg_data/lv_secret
  LV Name                lv_secret
  VG Name                vg_data
  LV UUID                GeRyzt-KgCc-qcpv-Zks8-vEYX-mQqb-H4aFii
  LV Write Access        read/write
  LV Creation host, time castle, 2026-07-12 15:30:47 +0700
  LV Status              available
  # open                 0
  LV Size                20.00 GiB
  Current LE             5120
  Segments               1
  Allocation             inherit
  Read ahead sectors     auto
  - currently set to     256
  Block device           252:0
```

Sebelum bisa digunakan, LV yang baru saja dibuat perlu dibuatkan file system terlebih dahulu. Misalnya, saya akan membuatkan file system `ext4` untuk LV yang baru saya buat:

```shell
sudo mkfs.ext4 /dev/vg_data/lv_secret
```

Untuk memastikan LV tersebut sudah memiliki file system yang benar:

```shell
sudo e2fsck /dev/vg_data/lv_secret
```

#### Mounting

##### 1. via `/dev/mapper`

Setelah di-format file system, kita bisa me-_mounting_-nya dari `/dev/mapper`: 

```shell
sudo mount /dev/mapper/vg_data-lv_secret mount/
```

##### 2. via `/dev/vg_data`

Atau bisa juga dari `/dev/vg_data`:

```shell
sudo mount /dev/vg_data/lv_secret mount/
```

Sekarang, LV tersebut akan terlihat seperti ini:

```shell
sudo lvdisplay 
```

```
  --- Logical volume ---
  LV Path                /dev/vg_data/lv_secret
  LV Name                lv_secret
  VG Name                vg_data
  LV UUID                GeRyzt-KgCc-qcpv-Zks8-vEYX-mQqb-H4aFii
  LV Write Access        read/write
  LV Creation host, time castle, 2026-07-12 15:30:47 +0700
  LV Status              available
  # open                 1
  LV Size                20.00 GiB
  Current LE             5120
  Segments               1
  Allocation             inherit
  Read ahead sectors     auto
  - currently set to     256
  Block device           252:0
```

> **Perhatikan!**  
> Status "# open" yang tadinya 0 (sebelum di-mount) akan menjadi 1 setelah di-mount.

## Closing

Masih banyak hal yang seharusnya dapat dilakukan oleh LVM (seperti snapshot) yang belum disampaikan di sini. Semoga di kemudian hari, saya akan melanjutkan tutorial-nya hingga ke semua fitur LVM.

Untuk saat ini, berikut adalah layout LVM yang berhasil saya buat:

```shell
sudo pvdisplay
```

```
  --- Physical volume ---
  PV Name               /dev/sda
  VG Name               vg_data
  PV Size               <1.82 TiB / not usable <1.09 MiB
  Allocatable           yes 
  PE Size               4.00 MiB
  Total PE              476932
  Free PE               471812
  Allocated PE          5120
  PV UUID               RPjneX-avtN-F01L-8avv-puIM-0rid-3l1bMU
```

```shell
sudo vgdisplay
```

```
  --- Volume group ---
  VG Name               vg_data
  System ID             
  Format                lvm2
  Metadata Areas        1
  Metadata Sequence No  2
  VG Access             read/write
  VG Status             resizable
  MAX LV                0
  Cur LV                1
  Open LV               0
  Max PV                0
  Cur PV                1
  Act PV                1
  VG Size               <1.82 TiB
  PE Size               4.00 MiB
  Total PE              476932
  Alloc PE / Size       5120 / 20.00 GiB
  Free  PE / Size       471812 / <1.80 TiB
  VG UUID               3bH0hx-3aHt-PNqr-W1oR-8lQH-Aut8-HWcmEU
```

```shell
sudo lvdisplay
```

```
  --- Logical volume ---
  LV Path                /dev/vg_data/lv_secret
  LV Name                lv_secret
  VG Name                vg_data
  LV UUID                GeRyzt-KgCc-qcpv-Zks8-vEYX-mQqb-H4aFii
  LV Write Access        read/write
  LV Creation host, time castle, 2026-07-12 15:30:47 +0700
  LV Status              available
  # open                 0
  LV Size                20.00 GiB
  Current LE             5120
  Segments               1
  Allocation             inherit
  Read ahead sectors     auto
  - currently set to     256
  Block device           252:0
```


Sekian.  
Terima kasih sudah membaca.  
Sampai jumpa lagi di artikel saya yang lain!





[^1]: https://plasawebhost.com/panduan/cara-menambah-kapasitas-partisi-lvm-logical-volume-di-linux-menggunakan-command-line.html
[^2]: https://medium.com/@bayounm95.eng/understanding-lvm-in-linux-a-comprehensive-guide-08e1125e3d71
[^3]: https://en.wikipedia.org/wiki/Logical_Volume_Manager_(Linux)#cite_note-auto-1
[^4]: https://oneuptime.com/blog/post/2026-03-02-setup-lvm-ubuntu-server-installation/view
[^5]: https://wiki.archlinux.org/title/LVM






