/*
  Warnings:

  - You are about to drop the column `status_name` on the `Satus` table. All the data in the column will be lost.
  - Added the required column `status` to the `Satus` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `Task_user_id_fkey`;

-- AlterTable
ALTER TABLE `Satus` DROP COLUMN `status_name`,
    ADD COLUMN `status` ENUM('TO_DO', 'IN_PROGRESS', 'CONFIRMED', 'BLOCKED') NOT NULL;

-- AlterTable
ALTER TABLE `Task` MODIFY `user_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
