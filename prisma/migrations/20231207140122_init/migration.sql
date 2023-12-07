/*
  Warnings:

  - The primary key for the `kategori` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_kategori` on the `kategori` table. All the data in the column will be lost.
  - Added the required column `id` to the `kategori` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `kategori` DROP PRIMARY KEY,
    DROP COLUMN `id_kategori`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
