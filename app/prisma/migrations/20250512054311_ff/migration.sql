/*
  Warnings:

  - Added the required column `linkUrl` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Twitter', 'Youtube');

-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "linkUrl" TEXT NOT NULL,
ADD COLUMN     "type" "Type" NOT NULL DEFAULT 'Twitter';
