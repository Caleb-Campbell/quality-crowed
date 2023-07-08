/*
  Warnings:

  - Added the required column `name` to the `Crow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Crow" ADD COLUMN     "name" TEXT NOT NULL;
