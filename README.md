# Social Media API

Simple api seperti social media (facebook).

## Instalasi

Untuk menjalankan proyek ini, pastikan Anda telah menginstal [Node.js](https://nodejs.org/) versi 12 atau yang lebih baru.

1. **Clone repositori:**

    ```bash
    git clone https://github.com/alansory/social-api.git
    ```

2. **Instal dependensi:**

    Pindah ke direktori proyek dan jalankan perintah berikut untuk menginstal semua dependensi yang diperlukan.

    ```bash
    cd nama-proyek
    npm install
    ```

## Penggunaan

Untuk menjalankan proyek, gunakan perintah berikut:

### Migrasi Basis Data

Untuk melakukan migrasi basis data, pergunakan perintah-perintah berikut:

- **Membuat Migrasi Baru:**

    ```bash
    make migrate_create file=[nama_file_migrasi]
    ```

    Membuat file migrasi baru dengan menggunakan Knex.

- **Migrasi ke Atas (Up):**

    ```bash
    make migrate_up
    ```

    Melakukan migrasi ke atas sesuai definisi dalam file migrasi.

- **Migrasi ke Bawah (Down):**

    ```bash
    make migrate_down
    ```

    Melakukan migrasi ke bawah sesuai definisi dalam file migrasi.

Pastikan untuk mengganti `[nama_file_migrasi]` dengan nama file yang diinginkan untuk migrasi baru.

### Menjalankan Server

Untuk menjalankan server, gunakan perintah berikut:

```bash
make start
```
