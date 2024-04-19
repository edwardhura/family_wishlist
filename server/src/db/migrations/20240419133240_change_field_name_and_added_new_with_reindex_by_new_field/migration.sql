/*
  Warnings:

  - You are about to drop the column `inviteCode` on the `Family` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Family" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "inviteToken" TEXT,
    "inviteTokenExpiredAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Family" ("createdAt", "name", "updatedAt", "uuid") SELECT "createdAt", "name", "updatedAt", "uuid" FROM "Family";
DROP TABLE "Family";
ALTER TABLE "new_Family" RENAME TO "Family";
CREATE UNIQUE INDEX "Family_inviteToken_key" ON "Family"("inviteToken");
CREATE INDEX "Family_inviteToken_idx" ON "Family"("inviteToken");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
