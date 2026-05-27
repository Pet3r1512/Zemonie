-- AlterTable: remove isSetupDone from user table
ALTER TABLE "user" DROP COLUMN "isSetupDone";

-- AlterTable: make avatar optional, add timestamps, set defaults
ALTER TABLE "User_Preferences" ALTER COLUMN "avatar" DROP NOT NULL;
ALTER TABLE "User_Preferences" ALTER COLUMN "theme" SET DEFAULT 'light';
ALTER TABLE "User_Preferences" ALTER COLUMN "isSetupDone" SET DEFAULT false;
ALTER TABLE "User_Preferences" ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "User_Preferences" ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex: add unique constraint on userId
CREATE UNIQUE INDEX "User_Preferences_userId_key" ON "User_Preferences"("userId");

-- Drop existing foreign key and recreate with CASCADE delete
ALTER TABLE "User_Preferences" DROP CONSTRAINT "User_Preferences_userId_fkey";
ALTER TABLE "User_Preferences" ADD CONSTRAINT "User_Preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
