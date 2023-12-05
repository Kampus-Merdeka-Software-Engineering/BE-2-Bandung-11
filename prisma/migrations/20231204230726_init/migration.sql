/*
  Warnings:

  - The primary key for the `booking` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_booking` on the `booking` table. All the data in the column will be lost.
  - The primary key for the `kamar` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_kamar` on the `kamar` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_user` on the `user` table. All the data in the column will be lost.
  - Added the required column `id` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `kamar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `booking_id_kamar_key` ON `booking`;

-- DropIndex
DROP INDEX `booking_id_user_key` ON `booking`;

-- AlterTable
ALTER TABLE `booking` DROP PRIMARY KEY,
    DROP COLUMN `id_booking`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_user` INTEGER NULL,
    MODIFY `id_kamar` INTEGER NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `kamar` DROP PRIMARY KEY,
    DROP COLUMN `id_kamar`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `id_user`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_id_kamar_fkey` FOREIGN KEY (`id_kamar`) REFERENCES `kamar`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
