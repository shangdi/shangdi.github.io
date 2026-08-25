---
title: "How to Read `man` Page?"
published: 2025-06-09T10:30:26+07:00
draft: false
image: "../images/man/featured.png"
description: "Have you ever read man page in an effective way? If you have not, I will show you the art of reading man page, here..."
tags: ["man", "page", "tools", "linux", "cli"]
category: "man"
---

Terkadang, kita memerlukan `man` _page_ untuk mencari tahu dokumentasi suatu _tool_ di linux, terutama _tool_ yang berbasis _command line_ (CLI). Dengan membaca dokumentasi tersebut, kita berharap mendapatkan informasi tentang cara menggunakan _tool_ tersebut tanpa harus mencarinya di internet.

Cara membaca dokumentasinya pun cukup mudah, kita hanya perlu mengetikkan `man` sebelum nama _tools_-nya. Misalnya, saya ingin melihat dokumentasi perintah `ls`:

```shell
man ls
```

Kemudian, kita dapat membaca dokumentasi tersebut dengan mengandalkan tombol arah panah atau huruf "`j`" (untuk _scroll down_) & "`k`" (untuk _scroll up_) di _keyboard_ sebagai navigasi _scroll_-nya.

Tombol ***"`Enter`"*** juga dapat digunakan untuk _scroll down_.

Atau, jika ingin lebih cepat melakukan scrolling, kita juga bisa menggunakan tombol "`Pg Up`" (untuk scroll up satu halaman) & "`Pg Dn`" (untuk scroll down satu halaman).

> **Notes:** Tidak semua CLI _tools_ memiliki dokumentasi (`man` _page_), namun, mayoritas pasti memilikinya. Jadi, jangan heran jika mendapati ada tools yang tidak memiliki `man` _page_. 

Tapi, bagaimana jika dokumentasi yang hendak kita baca tersebut banyak dan panjang, sementara kita hanya ingin mengetahui informasi tertentu saja? Tentu mengandalkan _scrolling_ adalah cara yang normal, walaupun tidak efektif dan efisien.

Kita dapat mengandalkan fitur ***"search"*** dengan menekan tombol garis miring ***(`/`)*** dan mengetikkan _keyword_ spesifik yang ingin dicari. Kemudian, untuk meloncat dari satu keyboard ke keyword yang sama, gunakan ***"`n`"*** (untuk _next_) dan ***"`N`"*** (untuk _previous_).

Selain itu, kita juga bisa loncat ke bagian akhir `man` _page_ dengan tombol **"`G`"** atau loncat ke bagian awal man page dengan tombol **"`g`"**.

Contoh, saya ingin mencari _keyword_ **"file"** di `man` _page_ **`ls`**:

<script src="https://fast.wistia.com/player.js" async></script><script src="https://fast.wistia.com/embed/bdpff31fe8.js" async type="module"></script><style>wistia-player[media-id='bdpff31fe8']:not(:defined) { background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/bdpff31fe8/swatch'); display: block; filter: blur(5px); padding-top:56.04%; }</style> <wistia-player media-id="bdpff31fe8" seo="false" aspect="1.7843866171003717"></wistia-player>

Singkatnya, berikut adalah beberapa _keybinding_ `man` _page_:

|   Keybinding      |   Deskripsi                                                   |
|   :---:           |   ---                                                         |
|   **/**           |   Masuk ke mode input _keyword_                               |
|   **j**           |   _Scroll down_                                               |
|   **k**           |   _Scroll up_                                                 |
|   **g**           |   Pindah ke awal halaman                                      |
|   **G**           |   Pindah ke akhir halaman                                     |
|   **n**           |   Loncat ke _keyword_ berikutnya                              |
|   **N**           |   Loncat ke keyword sebelumnya                                |
|   **h**           |   Melihat keybinding lain di `man`                            |
|   **q**           |   Quit                                                        |

Sebelum ditutup, saya ingin menegaskan 3 hal:
1. `man` _page_ sangat bermanfaat, terutama jika kita ingin mengetahui cara pemakaian suatu tools/utilities/commands di Linux.
2. Beberapa _keybinding_ lainnya juga dapat dilihat dengan menekan **"`h`"** di _keyboard_ ketika `man` _page_ sedang terbuka.
3. Bahkan, jika kita ingin tahu penggunaan `man`, kita bisa membuka `man` _page_ dari `man`.





