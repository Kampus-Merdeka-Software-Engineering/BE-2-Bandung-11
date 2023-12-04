-- CreateTable
CREATE TABLE `User` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_lengkap` VARCHAR(191) NOT NULL,
    `jenis_kelamin` VARCHAR(191) NOT NULL,
    `tgl_lahir` DATETIME(3) NOT NULL,
    `pekerjaan` VARCHAR(191) NOT NULL,
    `no_telp` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `booking` (
    `id_booking` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `id_kamar` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `booking_id_user_key`(`id_user`),
    UNIQUE INDEX `booking_id_kamar_key`(`id_kamar`),
    PRIMARY KEY (`id_booking`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kamar` (
    `id_kamar` INTEGER NOT NULL AUTO_INCREMENT,
    `id_kos` INTEGER NOT NULL,
    `nama_kamar` VARCHAR(191) NOT NULL,
    `harga_kamar` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `kamar_id_kos_key`(`id_kos`),
    PRIMARY KEY (`id_kamar`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kost` (
    `id_kos` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_kos` VARCHAR(191) NOT NULL,
    `harga_range` VARCHAR(191) NOT NULL,
    `alamat_kos` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_kos`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kategori` (
    `id_kategori` INTEGER NOT NULL AUTO_INCREMENT,
    `kategori_kos` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_kategori`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
