-- CreateTable
CREATE TABLE "User_Preferences" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "currency" "SupportedCurrency" NOT NULL DEFAULT 'AUD',
    "avatar" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "isSetupDone" BOOLEAN NOT NULL,

    CONSTRAINT "User_Preferences_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User_Preferences" ADD CONSTRAINT "User_Preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
