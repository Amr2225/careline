-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('WAITING', 'CALLED', 'IN_PROGRESS', 'DONE', 'SKIPPED', 'NO_SHOW');

-- CreateEnum
CREATE TYPE "TicketSourceType" AS ENUM ('WALK_IN', 'APPOINTMENT');

-- CreateTable
CREATE TABLE "tickets" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "sourceType" "TicketSourceType" NOT NULL,
    "appointmentId" TEXT,
    "status" "TicketStatus" NOT NULL DEFAULT 'WAITING',
    "priority" BOOLEAN NOT NULL DEFAULT false,
    "lateArrivalBucket" "LateArrivalBucket",
    "scheduledSlotTime" TIMESTAMP(3),
    "joinedQueueAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedDoctorId" TEXT,
    "skipCount" INTEGER NOT NULL DEFAULT 0,
    "calledAt" TIMESTAMP(3),
    "inProgressAt" TIMESTAMP(3),
    "doneAt" TIMESTAMP(3),
    "skippedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tickets_appointmentId_key" ON "tickets"("appointmentId");

-- CreateIndex
CREATE INDEX "tickets_status_joinedQueueAt_idx" ON "tickets"("status", "joinedQueueAt");

-- CreateIndex
CREATE INDEX "tickets_patientId_status_idx" ON "tickets"("patientId", "status");

-- CreateIndex
CREATE INDEX "tickets_assignedDoctorId_status_idx" ON "tickets"("assignedDoctorId", "status");

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_noShowMarkedById_fkey" FOREIGN KEY ("noShowMarkedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "appointments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_assignedDoctorId_fkey" FOREIGN KEY ("assignedDoctorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
