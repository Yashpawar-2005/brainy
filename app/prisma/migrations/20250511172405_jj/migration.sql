/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_password_key";

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
