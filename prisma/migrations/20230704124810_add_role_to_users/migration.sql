-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` ENUM('ADMIN', 'CUSTOMER') NOT NULL DEFAULT 'CUSTOMER';
