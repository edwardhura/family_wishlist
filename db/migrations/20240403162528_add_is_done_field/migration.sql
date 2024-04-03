-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Wish" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "priority" TEXT NOT NULL DEFAULT 'low',
    "comment" TEXT,
    "title" TEXT NOT NULL,
    "link" TEXT,
    "price" INTEGER,
    "isDone" BOOLEAN NOT NULL DEFAULT false,
    "userUuid" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Wish_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Wish" ("comment", "createdAt", "link", "price", "priority", "title", "userUuid", "uuid") SELECT "comment", "createdAt", "link", "price", "priority", "title", "userUuid", "uuid" FROM "Wish";
DROP TABLE "Wish";
ALTER TABLE "new_Wish" RENAME TO "Wish";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
