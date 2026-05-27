-- Add indexes to Transaction and Category tables
CREATE INDEX CONCURRENTLY IF NOT EXISTS "Transaction_userId_createdAt_idx" ON "Transaction"("userId", "createdAt");
CREATE INDEX CONCURRENTLY IF NOT EXISTS "Transaction_userId_categoryId_idx" ON "Transaction"("userId", "categoryId");
CREATE INDEX CONCURRENTLY IF NOT EXISTS "Category_userId_name_type_idx" ON "Category"("userId", "name", "type");
