---
title: "A Small yet Extremely Powerful CLI Tool: curl"
published: 2026-10-16T20:59:11+07:00
image: "../images/curl/featured.avif"
draft: false
description: "A simple yet practical guide to curl: a swiss-army tool for transferring data with URLs"
tags: ["curl", "libcurl", "linux", "cli", "url", "windows"]
category: "curl"
---

## Getting to know with `curl`

### What is `curl`?

`curl` adalah _tool_ berbasis _command line interface_ (CLI) untuk mendapatkan dan mengirim data, termasuk file, menggunakan URL syntax.[^1] _Tool_ yang "dipersenjatai" oleh `libcurl` ini gratis dan [open source](https://opensource.org/) sejak pertama kali dibuat oleh [Daniel Stenberg](https://en.wikipedia.org/wiki/Daniel_Stenberg) pada tahun 1996 hingga saat ini.[^2] 

Link website resmi `curl`: https://curl.se/ 
Repository resmi Github:

::github{repo="curl/curl"}

### What is `curl` used for?

`curl` digunakan di _command line_ atau di dalam _script_ untuk melakukan transfer data. `curl` bisa dibilang juga merupakan `libcurl` di saat yang sama. Oleh karena itu, ia bisa digunakan di mobil, TV, router, printer, peralatan audio, _mobile phone_, tablet, perangkat medis, STB, game komputer, media player, dan semua aplikasi (_software_) yang terkait dengan transfer data di internet. `curl` juga mendukung banyak protokol, seperti HTTP/HTTPS, FTP/SFTP, SMB, SCP, LDAP, IMAP/IMAPS, POP3, TELNET, dan masih banyak lagi.[^2]  

### Usage

:::warning[AI Usage]

These commands are from AI (Anthropic Claude) with "Sonnet 5.5 Medium" model.

:::

#### Basic Requests

```shell
# GET sederhana (output ke terminal)
curl https://example.com

# Simpan output ke file dengan nama sendiri
curl -o halaman.html https://example.com

# Simpan dengan nama file sesuai di server
curl -O https://example.com/file.zip

# Download beberapa file sekaligus
curl -O https://example.com/a.zip -O https://example.com/b.zip

# Pola URL (globbing)
curl -O "https://example.com/img[1-10].jpg"
curl -O "https://example.com/{foto,video,doc}.zip"

# Ikuti redirect (301/302)
curl -L https://bit.ly/contoh

# Mode senyap (tanpa progress bar), tapi tetap tampilkan error
curl -sS https://example.com

# Hanya tampilkan header response
curl -I https://example.com

# Tampilkan header + body
curl -i https://example.com

# Verbose (lihat seluruh proses request/response, TLS handshake, dsb.)
curl -v https://example.com
```

#### HTTP Method

```shell
# POST dengan form data (application/x-www-form-urlencoded)
curl -X POST -d "nama=Alex&umur=25" https://httpbin.org/post

# -d otomatis jadi POST, jadi -X POST sebenarnya opsional
curl -d "nama=Alex" https://httpbin.org/post

# POST JSON
curl -X POST https://httpbin.org/post \
  -H "Content-Type: application/json" \
  -d '{"nama":"Alex","hobi":["linux","SNA"]}'

# Kirim body dari file
curl -X POST https://httpbin.org/post \
  -H "Content-Type: application/json" \
  -d @data.json

# Shortcut JSON (curl >= 7.82)
curl --json '{"nama":"Alex"}' https://httpbin.org/post

# PUT
curl -X PUT https://api.example.com/users/1 \
  -H "Content-Type: application/json" \
  -d '{"nama":"Baru"}'

# PATCH
curl -X PATCH https://api.example.com/users/1 \
  -H "Content-Type: application/json" \
  -d '{"email":"baru@example.com"}'

# DELETE
curl -X DELETE https://api.example.com/users/1

# OPTIONS (cek method yang diizinkan / CORS)
curl -X OPTIONS -i https://api.example.com/users

# HEAD
curl --head https://example.com
```

#### Header, Cookie, and User-Agent

```shell
# Custom header
curl -H "Accept: application/json" -H "X-Custom: nilai" https://httpbin.org/headers

# Ganti User-Agent
curl -A "Mozilla/5.0 (X11; Linux x86_64)" https://httpbin.org/user-agent

# Set Referer
curl -e "https://google.com" https://example.com

# Kirim cookie manual
curl -b "sesi=abc123; tema=gelap" https://httpbin.org/cookies

# Simpan cookie dari server ke file
curl -c cookies.txt https://example.com/login

# Pakai cookie dari file (simulasi sesi login)
curl -b cookies.txt https://example.com/dashboard

# Simpan & pakai sekaligus
curl -b cookies.txt -c cookies.txt https://example.com/halaman

# Hapus header default (misal Accept)
curl -H "Accept:" https://example.com
```

#### Authentication

```shell
# Basic auth
curl -u username:password https://httpbin.org/basic-auth/username/password

# Prompt password (tidak muncul di history shell)
curl -u username https://example.com/private

# Bearer token (JWT / API token)
curl -H "Authorization: Bearer eyJhbGciOi..." https://api.example.com/me

# API key lewat header
curl -H "X-API-Key: kunci_rahasia" https://api.example.com/data

# API key lewat query string
curl "https://api.example.com/data?api_key=kunci_rahasia"

# Digest auth
curl --digest -u user:pass https://example.com/digest

# NTLM
curl --ntlm -u user:pass https://intranet.example.com

# Baca kredensial dari ~/.netrc
curl -n https://example.com/private

# Token dari variabel environment
curl -H "Authorization: Bearer $TOKEN" https://api.example.com/me
```

#### File Uploading

```shell
# Multipart form upload (seperti form HTML dengan <input type=file>)
curl -F "file=@foto.jpg" https://httpbin.org/post

# Dengan field tambahan
curl -F "file=@laporan.pdf" -F "judul=Laporan Q3" -F "tag=penting" https://example.com/upload

# Atur content-type & nama file
curl -F "file=@data.bin;type=application/octet-stream;filename=baru.bin" https://example.com/upload

# Upload banyak file
curl -F "files[]=@a.jpg" -F "files[]=@b.jpg" https://example.com/upload

# PUT raw file (misal ke S3 presigned URL)
curl -T arsip.tar.gz "https://bucket.s3.amazonaws.com/arsip.tar.gz?X-Amz-..."

# Upload via FTP
curl -T file.txt ftp://ftp.example.com/ --user user:pass

# Upload via SFTP
curl -T file.txt sftp://example.com/home/user/ --user user:pass
```

#### Download (Advanced)

```shell
# Lanjutkan download yang terputus
curl -C - -O https://example.com/besar.iso

# Progress bar sederhana
curl -# -O https://example.com/file.zip

# Batasi kecepatan (misal 500 KB/s)
curl --limit-rate 500k -O https://example.com/file.zip

# Download rentang byte tertentu
curl -r 0-1023 -o potongan.bin https://example.com/file.bin

# Hanya download kalau file lebih baru dari tanggal tertentu
curl -z "2026-01-01" -O https://example.com/file.zip

# Pakai nama dari header Content-Disposition
curl -OJL https://example.com/download?id=123

# Buat folder otomatis saat -o
curl --create-dirs -o hasil/sub/file.html https://example.com

# Parallel download (curl >= 7.66)
curl --parallel --parallel-max 5 -O https://example.com/a.zip -O https://example.com/b.zip -O https://example.com/c.zip

# Download & ekstrak langsung tanpa simpan
curl -sL https://example.com/arsip.tar.gz | tar xz

# Cek ukuran file tanpa download
curl -sI https://example.com/file.zip | grep -i content-length
```

#### Timeout, Retry, and Error Handling

```shell
# Timeout koneksi (detik)
curl --connect-timeout 5 https://example.com

# Batas total waktu
curl --max-time 30 https://example.com

# Retry otomatis kalau gagal
curl --retry 5 --retry-delay 2 --retry-all-errors https://example.com

# Gagal (exit code != 0) kalau HTTP 4xx/5xx
curl --fail https://example.com/tidak-ada
curl -f https://example.com/tidak-ada

# Fail tapi tetap tampilkan body error
curl --fail-with-body https://api.example.com/error

# Cek exit code
curl -sf https://example.com > /dev/null && echo "OK" || echo "GAGAL"

# Batasi jumlah redirect
curl -L --max-redirs 3 https://example.com
```

#### HTTPS, TLS, Certificate

```shell
# Abaikan verifikasi sertifikat (HANYA untuk testing lokal!)
curl -k https://self-signed.local

# Pakai CA certificate sendiri
curl --cacert ca.pem https://internal.example.com

# Client certificate (mutual TLS)
curl --cert client.pem --key client.key https://mtls.example.com

# Paksa versi TLS
curl --tlsv1.2 https://example.com
curl --tls-max 1.2 https://example.com

# Paksa HTTP versi tertentu
curl --http1.1 https://example.com
curl --http2 https://example.com
curl --http3 https://example.com

# Lihat detail sertifikat
curl -vI https://example.com 2>&1 | grep -A 10 "Server certificate"

# Override DNS (tes server baru sebelum DNS berubah)
curl --resolve example.com:443:203.0.113.10 https://example.com

# Connect ke IP tertentu tapi pakai host header
curl --connect-to example.com:443:203.0.113.10:443 https://example.com
```

#### Proxy

```shell
# HTTP proxy
curl -x http://proxy.local:8080 https://example.com

# Proxy dengan autentikasi
curl -x http://proxy.local:8080 -U user:pass https://example.com

# SOCKS5 proxy (misal Tor)
curl --socks5-hostname 127.0.0.1:9050 https://check.torproject.org/api/ip

# Lewat proxy environment variable
export https_proxy=http://proxy.local:8080
curl https://example.com

# Bypass proxy untuk host tertentu
curl --noproxy "localhost,127.0.0.1" https://localhost:3000
```

#### Performance & Debugging check

```shell
# Status code saja
curl -s -o /dev/null -w "%{http_code}\n" https://example.com

# Waktu detail
curl -s -o /dev/null -w "
DNS lookup  : %{time_namelookup}s
TCP connect : %{time_connect}s
TLS handshake: %{time_appconnect}s
TTFB        : %{time_starttransfer}s
Total       : %{time_total}s
Ukuran      : %{size_download} bytes
Kecepatan   : %{speed_download} B/s
" https://example.com

# Simpan format ke file (curl-format.txt), lalu pakai
curl -w "@curl-format.txt" -o /dev/null -s https://example.com

# URL akhir setelah redirect
curl -Ls -o /dev/null -w "%{url_effective}\n" https://bit.ly/contoh

# IP server yang dihubungi
curl -s -o /dev/null -w "%{remote_ip}\n" https://example.com

# Trace lengkap (hex dump)
curl --trace-ascii trace.log https://example.com

# Cek apakah server support kompresi
curl -sI -H "Accept-Encoding: gzip, br" https://example.com | grep -i content-encoding

# Minta response terkompresi & dekompres otomatis
curl --compressed https://example.com

# Cek header keamanan sebuah situs
curl -sI https://example.com | grep -iE "strict-transport|content-security|x-frame|x-content-type"
```

#### REST API + `jq`

```shell
# Ambil data & rapikan JSON
curl -s https://api.github.com/users/torvalds | jq .

# Ambil field tertentu
curl -s https://api.github.com/repos/curl/curl | jq '{nama: .name, bintang: .stargazers_count, bahasa: .language}'

# Loop hasil
curl -s https://jsonplaceholder.typicode.com/posts | jq -r '.[:5][] | "\(.id): \(.title)"'

# Buat resource, lalu ambil ID dari response
ID=$(curl -s -X POST https://jsonplaceholder.typicode.com/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"tes","body":"isi","userId":1}' | jq -r .id)
echo "ID baru: $ID"

# Pagination sederhana
for page in 1 2 3; do
  curl -s "https://api.example.com/items?page=$page" | jq -r '.items[].name'
done

# GraphQL
curl -X POST https://api.example.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ user(id: 1) { name email } }"}'
```

:::tip[Popular API]

```shell
# IP publik kamu
curl ifconfig.me
curl -s https://api.ipify.org?format=json

# Info geolokasi IP
curl -s https://ipinfo.io/8.8.8.8

# Cuaca di terminal
curl wttr.in/Jakarta
curl "wttr.in/Jakarta?format=3"

# Kurs / crypto
curl -s "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,idr"

# Cheat sheet via terminal
curl cheat.sh/tar

# Kirim notifikasi ke ntfy.sh
curl -d "Build selesai" ntfy.sh/topik-rahasia-kamu

# Kirim pesan Telegram bot
curl -s -X POST "https://api.telegram.org/bot$BOT_TOKEN/sendMessage" \
  -d chat_id="$CHAT_ID" -d text="Halo dari curl"

# Webhook Discord
curl -H "Content-Type: application/json" \
  -d '{"content":"Deploy sukses 🚀"}' "$DISCORD_WEBHOOK_URL"

# Webhook Slack
curl -X POST -H "Content-type: application/json" \
  --data '{"text":"Halo dari curl"}' "$SLACK_WEBHOOK_URL"

# GitHub API (dengan token)
curl -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/user/repos

# Download release terbaru dari GitHub
curl -s https://api.github.com/repos/curl/curl/releases/latest | jq -r .tag_name

# Cek ketersediaan paket di npm
curl -s https://registry.npmjs.org/express/latest | jq -r .version
```

:::

#### Other Protocol

```shell
# FTP: list direktori
curl ftp://ftp.example.com/ --user user:pass

# FTP: download
curl -O ftp://ftp.example.com/pub/file.txt --user user:pass

# FTP: hapus file
curl ftp://ftp.example.com/ --user user:pass -Q "DELE file.txt"

# SFTP dengan SSH key
curl --key ~/.ssh/id_ed25519 --user alex: sftp://example.com/home/alex/file.txt -O

# Kirim email via SMTP
curl --url "smtps://smtp.gmail.com:465" --ssl-reqd \
  --mail-from "kamu@gmail.com" --mail-rcpt "tujuan@example.com" \
  --user "kamu@gmail.com:app-password" \
  -T email.txt

# Baca email via IMAP
curl --url "imaps://imap.gmail.com/INBOX" --user "kamu@gmail.com:app-password"

# Baca file lokal
curl file:///etc/hostname

# DICT (kamus)
curl dict://dict.org/d:linux

# Telnet / raw TCP
curl telnet://example.com:80

# WebSocket (curl >= 8.11, eksperimental)
curl --include --no-buffer ws://echo.websocket.org

# LDAP
curl "ldap://ldap.example.com/dc=example,dc=com?cn?sub?(objectClass=*)"
```

#### Help

```shell
# mengecek versi curl
curl --version

# manual lengkap
curl --help all
man curl
```


:::note[Important!]

- Jangan taruh password/token langsung di command kalau di mesin shared. Command tersimpan di shell history dan terlihat di `ps`. Pakai variabel environment, ~/.netrc`, atau -K` config file.
- `-k / --insecure` mematikan verifikasi TLS. Pakai hanya untuk testing, jangan di production.
- `curl | sh` itu berisiko karena kamu menjalankan kode asing. Unduh dulu, baca isinya, baru jalankan.
- Selalu kasih **tanda kutip** pada URL yang punya `&`, `?`, atau karakter spesial, supaya tidak ditafsirkan shell.

:::


[^1]: https://en.wikipedia.org/wiki/CURL
[^2]: https://curl.se/



