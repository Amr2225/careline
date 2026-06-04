-- CreateEnum
CREATE TYPE "LateArrivalBucket" AS ENUM ('ON_TIME', 'FRONT_INSERT', 'VERY_LATE');

-- AlterTable
ALTER TABLE "appointments" ADD COLUMN     "arrivedAt" TIMESTAMP(3),
ADD COLUMN     "lateArrival" "LateArrivalBucket",
ADD COLUMN     "noShowAt" TIMESTAMP(3),
ADD COLUMN     "noShowMarkedById" TEXT;
