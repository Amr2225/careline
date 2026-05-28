-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('BOOKED', 'LATE_ARRIVING', 'ARRIVED', 'IN_PROGRESS', 'DONE', 'NO_SHOW', 'CANCELLED');

-- CreateTable
CREATE TABLE "available_slots" (
    "id" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "capacity" INTEGER NOT NULL,
    "templateId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "available_slots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointments" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "slotId" TEXT NOT NULL,
    "status" "AppointmentStatus" NOT NULL DEFAULT 'BOOKED',
    "bookedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cancelledAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "slot_templates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "weekday" INTEGER NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "capacityOverride" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "slot_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "settings" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedById" TEXT,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "available_slots_startTime_key" ON "available_slots"("startTime");

-- CreateIndex
CREATE INDEX "available_slots_startTime_idx" ON "available_slots"("startTime");

-- CreateIndex
CREATE INDEX "appointments_patientId_status_idx" ON "appointments"("patientId", "status");

-- CreateIndex
CREATE INDEX "appointments_slotId_status_idx" ON "appointments"("slotId", "status");

-- AddForeignKey
ALTER TABLE "available_slots" ADD CONSTRAINT "available_slots_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "slot_templates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "available_slots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
