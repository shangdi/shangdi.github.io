---
title: "How to Install Python Packages with `pip` & `pipx`"
published: 2025-12-21T06:38:10+07:00
draft: false
image: "../images/pip/featured.png"
description: "A step-by-step guidance on how to install python packages using pip & pipx."
tags: ["pip", "python", "windows", "linux"]
category: "pip"
---

Beberapa aplikasi Python[^1] sebetulnya dapat langsung di-_install_ untuk kemudian digunakan.[^2] Aplikasi/paket-paket ini dapat dilihat di PyPi (_The Python Package Index_):

> [**PyPi**](https://pypi.org/): https://pypi.org/

:::info

Python adalah 'bahasa pemrograman tingkat tinggi' yang dikembangkan oleh Guido van Rossum pada akhir tahun 1980-an. Disebut 'bahasa pemrograman tingkat tinggi' karena _syntax_ Python lebih dekat ke bahasa manusia alih-alih ke bahasa mesin. Nama Python sendiri diambil dari serial komedi asal British bernama ["Monty Python's Flying Circus"](https://en.wikipedia.org/wiki/Monty_Python%27s_Flying_Circus).   

:::

## `pip`

Repository official `pip` dapat ditemukan di Github:

::github{repo="pypa/pip"}

Berikut langkah-langkah penggunaanya:

### 1. Install `python` 

Tentu saja, karena aplikasi-aplikasi di [**PyPi**](https://pypi.org/) adalah aplikasi Python, maka kita perlu memasang **Python** terlebih dahulu.

:::info
  
Perlu diketahui, Python punya 2 versi:  
- Python versi 2 (sudah tidak dilanjut lagi.)
- Python versi 3

Seperti terlihat, Python versi 2 sudah tidak dilanjut lagi perkembangannya, sehingga banyak aplikasi modern dikembangkan dengan yang versi 3. Jadi, pastikan ketika kita ingin meng-_install_ Python, kita memasang versi yang sesuai dengan kebutuhan atau spesifikasi _software_ yang ingin dijalanan...   

Di sini, saya akan memasang Python versi 3.

:::

|       Distro      |                  Command                      |
|       ---         |                   ---                         |
| **Debian/Ubuntu** | **`sudo apt install python3`**                |
| **Arch Linux**    | **`sudo pacman -Sy python`**                  |
| **Opensuse**      | **`sudo zypper install python3`**             |
| **Fedora**        | **`sudo dnf install pyton3`**     			      |

Untuk memastikan Python3 sudah terpasang, gunakan perintah:

```shell
python --version
```

:::note

**NixOS:**  
Masukkan baris berikut di file konfigurasi (`/etc/nixos/configuration.nix`):

```nix
  environment.systemPackages = [
    pkgs.python3
  ];
```

Atau jika menggunakan `nix-shell`:

```shell
nix-shell -p python3
```

:::

### 2. Create `virtualenv`

Selanjutnya, kita perlu membuat `virtual environment` dengan perintah:

```shell
python -m venv {nama-folder}
```

Bagian **{nama-folder}** bisa diganti sebebas-bebasnya karena tidak akan berpengaruh ke *software*-nya. Akan tetapi, akan lebih baik kalau namanya disesuaikan dengan nama _software/package_ yang akan di-_install_.

### 3. Activate `venv`

Berikutnya, kita akan mengaktifkan `virtual environment` yang sudah kita buat dengan perintah:

```shell
source {nama-folder}/bin/activate
```

### 4. Use `pip`

Kita kemudian dapat menggunakan `pip` untuk meng-_install_ suatu _package_ atau _software_.

```shell
./{nama-folder}/bin/pip install {nama-package}
```

**{nama-pakcakge}** diganti dengan nama paket yang hendak dipasang.

### 5. Run The Package

Selesai! Kita sekarang dapat menjalankan aplikasinya dengan perintah:

```shell
./{nama-folder}/bin/{nama-package}
```

> **Notes:**
> Cara tersebut dapat terus dilakukan untuk dikemudian hari, bahkan tanpa `python` sekalipun.

## `pipx`

`pipx` mirip dengan `pip`. 

Perbedaan paling utama hanya di _packages_ yang dapat di-_install_ oleh masing-masing _tool_ tersebut. Jika `pip` dapat digunakan untuk meng-install aplikasi dan _library_, `pipx` hanya ditujukan untuk meng-_install_ aplikasi Python saja, jadi tidak bisa digunakan untuk meng-_install_ _library_.[^3] Jadi, kalau saya boleh simpulkan sendiri, `pipx` lebih mirip seperti **package manager** yang ada di linux, misalnya seperti `pacman` di Archlinux, `apt` di Debian/Ubuntu, `Zypper` di Opensuse, dan lain sebagainya.

Meskipun demikian, keduanya sama-sama berjalan dengan menggunakan konsep _virtual environment_, sehingga aplikasi ataupun _library_ yang ter-_install_ tidak akan mempengaruhi system.

Berikut adalah perbandingan antara `pip` & `pipx` yang lebih spesifik:[^4]

| Aspect | pip | pipx |
|------|-----|------|
| Primary purpose | Library and package management | Application installation and execution |
| Installation scope | Project-specific or global | Isolated applications with global access |
| Dependency management | Manual virtual environment handling | Automatic isolation per application |
| Target use case | Development dependencies and libraries | Command-line tools and standalone apps |
| Environment handling | Requires manual venv management | Creates isolated environments automatically |
| Package types | Any Python package or library | Applications with console scripts |
| Upgrade strategy | Manual dependency resolution | Per-application upgrade isolation |
| Configuration complexity | Flexible but requires setup | Minimal configuration needed |
| Development workflow | Integrates with `requirements.txt` | Designed for end-user tool installation |
| Conflict resolution | User manages conflicts manually | Prevents conflicts through isolation |
| System integration | Installs to active environment | Creates system-wide accessible commands |
| Temporary execution | Requires installation first | Supports run-once execution with `--run` |
| Maintenance overhead | Requires environment management | Self-contained application management |

Repository resmi pipx juga dapat ditemui di Github:

::github{repo="pypa/pipx"}

Website dokumentasi `pipx`:

> [**pipx**](https://pipx.pypa.io/stable/): https://pipx.pypa.io/stable/


### 1. Install `pipx`

Kita install `pipx` terlebih dahulu, langsung dari repo masing-masing Linux:

|       Distro      |                  Command                      |
|       ---         |                   ---                         |
| **Debian/Ubuntu** | **`sudo apt install pipx`**                   |
| **Arch Linux**    | **`sudo pacman -Sy python-pipx`**             |
| **Opensuse**      | **`sudo zypper install pipx`**                |
| **Fedora**        | **`sudo dnf install pipx`**       			      |

Untuk memastikan `pipx` sudah terpasang, gunakan perintah:

```shell
pipx --version
```

:::note

**NixOS:**  
Masukkan baris berikut di file konfigurasi (`/etc/nixos/configuration.nix`):

```nix
  environment.systemPackages = [
    pkgs.pipx
  ];
```

Atau jika menggunakan `nix-shell`:

```shell
nix-shell -p pipx
```

:::

### 2. Use `pipx`

Setelah memasang `pipx`, sekarang kita dapat menggunakannya untuk meng-_install_ aplikasi Python dengan perintah:

```shell
pipx install {nama-aplikasi}
```

Ganti {nama-aplikasi} dengan nama aplikasi yang ingin kita _install_.

### 3. Uninstall with `pipx`

Kita juga dapat meng-_uninstall_ atau menghapus aplikasi yang sudah di-_install_ dengan perintah:

```shell
pipx uninstall {nama-aplikasi}
```

### 4. Listing `pipx` Apps

Jika kita ingin melihat aplikasi apa saja yang sudah pernah di-_install_ dengan `pipx`:

```shell
pipx list
```

### 5. Help 

Kita juga dapat melihat opsi-opsi lain apa saja yang dapat kita manfaatkan ketika menggunakan `pipx`:

```shell
pipx --help
```

Beberapa artikel saya yang lain juga sebetulnya ada yang pernah memanfaatkan `pip` dan `pipx` untuk meng-_install_ paket Python: 

1. Cloudinary

[[/tech/cloudinary/]]

2. File Server (Updog & Copyparty)

[[/tech/fileserver/]]

3. BeatPrints

[[/tech/beatprints/]]

---

### Notes:

#### 1. Getting out of `venv`

Untuk keluar dari sesi _virtual environment_ yang sudah diaktifkan ketika meng-_install_ _packages_ via `pip` sebelumnya, kita dapat mengetikkan perintah `exit` atau _shortcut_ `Ctrl+d` di terminal.

#### 2. Delete `venv`

Jika kita merasa tidak lagi membutuhkannya, kita dapat menghapus folder paket tersebut:

```shell
rm -rf {nama-folder}
```






[^1]: https://en.wikipedia.org/wiki/Python_(programming_language)
[^2]: https://packaging.python.org/en/latest/tutorials/installing-packages/
[^3]: https://medium.com/@martia_es/pip-vs-pipx-the-definitive-guide-to-python-package-management-a7039a5c62fa
[^4]: https://betterstack.com/community/comparisons/pip-vs-pipx/

