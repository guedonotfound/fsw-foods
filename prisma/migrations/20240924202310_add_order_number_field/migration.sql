/*
  Warnings:

  - Added the required column `discountPercentage` to the `OrderProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `OrderProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderNumber" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "OrderProduct" ADD COLUMN     "discountPercentage" INTEGER NOT NULL,
ADD COLUMN     "price" DECIMAL(10,2) NOT NULL;
