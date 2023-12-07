-- AlterTable
ALTER TABLE `user` ADD COLUMN `id_sign` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_id_sign_fkey` FOREIGN KEY (`id_sign`) REFERENCES `sign`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
