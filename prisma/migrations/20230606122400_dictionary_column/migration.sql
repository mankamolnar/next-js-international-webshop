/*
  Warnings:

  - Added the required column `component` to the `Dictionary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `dictionary` ADD COLUMN `component` VARCHAR(191) NOT NULL;
