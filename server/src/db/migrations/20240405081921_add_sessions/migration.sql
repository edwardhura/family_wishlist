-- CreateTable
CREATE TABLE "Session" (
    "userUuid" TEXT NOT NULL,
    "valid" BOOLEAN NOT NULL DEFAULT true,
    "userAgent" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Session_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_userUuid_key" ON "Session"("userUuid");
