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

notes: bacaan lanjutan bisa kalian baca disini

lalu akan kode tambahan pada file .env yaitu DATABASE_URL dimana nanti kalian harus isi sesuai dengan DATABASE_URL kalian, bisa diisi pake DATABASE_URL dari railway atau kalau jalanin di local, pake yang localhost dulu aja "mysql://root:password@localhost:3306/capstone_icanq". Dan ada satu file khusus yang ke generate dalam sebuah folder namanya prisma nama filenya schema.prisma dimana kalian harus mendefinisikan model kalian disitu sesuai dengan perencanaan yang kalian sudah rencanakan

kalau mau file schema.prisma berwarna atau dikasih highlight pada syntaxnya kalian bisa download extension ini

kita bisa buat schema database dari yang udah kita rencanain dalam file schema.prisma dimana ada syntaxnya sendiri kalian bisa baca dokumentasinya di link [ini]

ini ada contoh dari model dari schema yang dibikin

model Product {
  id        Int      @id @default(autoincrement())
  name      String
  price     Int
  imageUrl  String? // arti ?, not required, kalau pengen dibikin gapapa deh kalau datanya kosong
  catalogId Int?
  createdAt DateTime @default(now())
  // untuk menambahkan relasi dari Product ke Catalog dimana Product boleh gapunya catalog
  Catalog   Catalog? @relation(fields: [catalogId], references: [id])
}

model Catalog {
  id       Int       @id @default(autoincrement())
  name     String
  // untuk nambahin relasi antara catalog dengan Product
  products Product[] // ini artinya Catalog punya banyak product
}

model Message {
  id        Int      @id @default(autoincrement())
  name      String
  email     String
  message   String   @db.Text // biar bisa nyimpen pesan dengan karakter yang panjang
  createdAt DateTime @default(now())
}

setelah kita define model di schema.prisma kita bisa melakukan synchronization database kita dengan schema yang udah dibuat tadi dengan command
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