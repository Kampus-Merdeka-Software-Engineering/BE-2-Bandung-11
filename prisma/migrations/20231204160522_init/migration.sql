/*
  Warnings:

  - The primary key for the `kost` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_kos` on the `kost` table. All the data in the column will be lost.
  - Added the required column `id` to the `kost` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `kamar_id_kos_key` ON `kamar`;

-- AlterTable
ALTER TABLE `kamar` MODIFY `id_kos` INTEGER NULL;

-- AlterTable
ALTER TABLE `kost` DROP PRIMARY KEY,
    DROP COLUMN `id_kos`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `kamar` ADD CONSTRAINT `kamar_id_kos_fkey` FOREIGN KEY (`id_kos`) REFERENCES `kost`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
