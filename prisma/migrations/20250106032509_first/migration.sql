-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "contraseña" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Billetera" (
    "id" SERIAL NOT NULL,
    "nombre_billetera" TEXT NOT NULL,

    CONSTRAINT "Billetera_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movimiento" (
    "id" SERIAL NOT NULL,
    "nombre_movimiento" TEXT NOT NULL,
    "fecha_movimiento" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valor_movimiento" DOUBLE PRECISION NOT NULL,
    "categoria_movimiento" TEXT NOT NULL,
    "tipo_movimiento" TEXT NOT NULL DEFAULT 'ingreso',
    "tienda" TEXT NOT NULL,
    "billeteraId" INTEGER NOT NULL,

    CONSTRAINT "Movimiento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- AddForeignKey
ALTER TABLE "Movimiento" ADD CONSTRAINT "Movimiento_billeteraId_fkey" FOREIGN KEY ("billeteraId") REFERENCES "Billetera"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
