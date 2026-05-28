-- AlterTable
ALTER TABLE "slot_templates" ADD COLUMN     "lastRunAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "available_slots_templateId_idx" ON "available_slots"("templateId");
