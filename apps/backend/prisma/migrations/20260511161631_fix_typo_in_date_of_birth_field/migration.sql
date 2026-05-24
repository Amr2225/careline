/*
  Warnings:

  - You are about to drop the column `dataOfBirth` on the `patients` table. All the data in the column will be lost.
  - Added the required column `dateOfBirth` to the `patients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "patients" DROP COLUMN "dataOfBirth",
ADD COLUMN     "dateOfBirth" DATE NOT NULL;
