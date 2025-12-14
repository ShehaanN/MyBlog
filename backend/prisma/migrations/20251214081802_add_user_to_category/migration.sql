/*
  Warnings:

  - You are about to drop the column `UserId` on the `Category` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Category` DROP FOREIGN KEY `Category_UserId_fkey`;

-- DropIndex
DROP INDEX `Category_UserId_fkey` ON `Category`;

-- AlterTable
ALTER TABLE `Category` DROP COLUMN `UserId`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Post` MODIFY `excerpt` TEXT NOT NULL,
    MODIFY `content` LONGTEXT NOT NULL;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
