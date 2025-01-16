/*
  Warnings:

  - You are about to drop the `billeterasDeUsuarios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "billeterasDeUsuarios" DROP CONSTRAINT "billeterasDeUsuarios_billeteraId_fkey";

-- DropForeignKey
ALTER TABLE "billeterasDeUsuarios" DROP CONSTRAINT "billeterasDeUsuarios_usuarioId_fkey";

-- DropTable
DROP TABLE "billeterasDeUsuarios";

-- CreateTable
CREATE TABLE "_BilleteraToUsuario" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BilleteraToUsuario_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BilleteraToUsuario_B_index" ON "_BilleteraToUsuario"("B");

-- AddForeignKey
ALTER TABLE "_BilleteraToUsuario" ADD CONSTRAINT "_BilleteraToUsuario_A_fkey" FOREIGN KEY ("A") REFERENCES "Billetera"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BilleteraToUsuario" ADD CONSTRAINT "_BilleteraToUsuario_B_fkey" FOREIGN KEY ("B") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
