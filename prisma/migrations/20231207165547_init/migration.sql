/*
  Warnings:

  - Added the required column `imgUrl` to the `kamar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgUrl` to the `kost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `kamar` ADD COLUMN `imgUrl` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `kost` ADD COLUMN `imgUrl` VARCHAR(191) NOT NULL;
