/*
  Warnings:

  - You are about to drop the column `email` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `nama_lengkap` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `kost` ADD COLUMN `id_kategori` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `email`,
    DROP COLUMN `nama_lengkap`,
    DROP COLUMN `password`;

-- AddForeignKey
ALTER TABLE `kost` ADD CONSTRAINT `kost_id_kategori_fkey` FOREIGN KEY (`id_kategori`) REFERENCES `kategori`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
