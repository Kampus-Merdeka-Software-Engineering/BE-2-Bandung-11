# langkah-langkah pengerjaan capstone

1. inisiasi project npm dengan menggunakan command `npm init -y`
2. update `package.json` dengan menambahkan scripts seperti
```json
"scripts": {
        "start": "node index.js",
        "start:dev": "nodemon index.js"
    },
```
3. install package yang diperlukan
```bash
npm install express mysql2 dotenv cors
```

4. install devDependency karena pake nodemon
```bash
npm install -D nodemon
```

5. membuat `.gitignore` yang isinya `node_modules` dan `.env` agar tidak ke pust di `gthub`
```bash
echo node_modules >> .gitignore
```

6. inisiasi project dengan membuat satu file entrypoint, `index.js` kemudian update `package.json`` dimana script 
```json
"scripts": {
  "start": "node index.js",
  "start:dev": "nodemon index.js"
}
```

7. import express, dotenv, dan package lain yang sudah install, bikinlah satu rute untuk mengecek
contohnya:
```js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
	res.send("here is the response");
});

app.all("*", async (req, res) => {
	res.json({
		message: "Routes you're looking is not found",
	});
});

app.listen(PORT, "0.0.0.0", () => {
	console.log(`Server is already running at ${PORT}`);
});
```

8. integrasi project dengan [prisma]
(htpps://prisma.io)

9. inisiasi project npm yang ingin diintegrasikan dengan prisma, kita harus install dulu si prismanya
```bash
npm install -D prisma
```

10. inisasi prisma
```bash
npx prisma init
```

11. by default prisma akan menginisiasi project dengan database postgresql, kalau kalian ingin memakai databasenya mysql kalian bisa pakai command
```bash
npx prisma init --datasource-provider mysql
```

12. isi `.env` bagian `DATABASE_URL`
```bash
DATABASE_URL="mysql://root:password@localhost:3306/sinkostan"
```

13. Dalam prisma nama filenya schema.prisma didefinisikan model sesuai dengan perencanaan

```bash
model User{
  id_user Int @id @default(autoincrement())
  nama_lengkap String
  jenis_kelamin String
  tgl_lahir DateTime
  pekerjaan String
  no_telp String
  email String
  password String
}

model booking{
  id_booking Int @id @default(autoincrement())
  id_user Int @unique
  id_kamar Int @unique
  status String
}

model kamar{
  id_kamar Int @id @default(autoincrement())
  id_kos Int @unique
  nama_kamar String
  harga_kamar String
}

model kost{
  id_kos Int @id @default(autoincrement())
  nama_kos String
  harga_range String
  alamat_kos String
}

model kategori{
  id_kategori Int @id @default(autoincrement())
  kategori_kos String
}
```

14. setelah kita define model di schema.prisma kita bisa melakukan synchronization database kita dengan schema yang udah dibuat tadi dengan command
npx prisma migrate dev --name <nama_apa_yang_kalian_lakukan>
<nama_apa_yang_kalian_lakukan> bisa diganti dengan aktifitas apa sih yang kamu lakaukan barusan, contoh:

inisialisasi
add_new_model_User
add_relation_to_catalog_and_product
npx prisma migrate dev wajib dilakukan setiap kali kalian sudah selesai mengubah schema.prisma atau adanya perubahan pada schema kalian, agar database selalu tersingkronisasi

atau apabila kalian ingin lakukan singkronisasi dengan cara lain di prisma bisa dengan cara

npx prisma db push

merujuk pada dokumentasinya, untuk bisa menggunakan prisma orm kita perlu menggunakan package @prisma/client untuk membuat koneksi dengan prisma dan melakukan crud operations. Perlu untuk membuat satu file configuration dimana akan dibuat pada folder config dan kita beri nama prisma.js dengan isi
// prisma.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = { prisma };
setelah dibuat menjadi suatu config untuk bisa dipakai di file yang lain kita bisa langsung pakai saja untuk mengambil data dari database atau hal yang lain seperti memasukkan data, update data, mengambil relasi, dan masih banyak lagi. Kalian bisa langsung lihat saja cara penggunaannya pada setiap route yang telah dibuat