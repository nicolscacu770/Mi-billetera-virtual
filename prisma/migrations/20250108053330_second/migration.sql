-- CreateTable
CREATE TABLE "billeterasDeUsuarios" (
    "usuarioId" INTEGER NOT NULL,
    "billeteraId" INTEGER NOT NULL,

    CONSTRAINT "billeterasDeUsuarios_pkey" PRIMARY KEY ("usuarioId","billeteraId")
);

-- AddForeignKey
ALTER TABLE "billeterasDeUsuarios" ADD CONSTRAINT "billeterasDeUsuarios_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billeterasDeUsuarios" ADD CONSTRAINT "billeterasDeUsuarios_billeteraId_fkey" FOREIGN KEY ("billeteraId") REFERENCES "Billetera"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
