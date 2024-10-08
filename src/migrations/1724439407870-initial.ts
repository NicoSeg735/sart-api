import { MigrationInterface, QueryRunner } from 'typeorm'

export class Initial1724439407870 implements MigrationInterface {
  name = 'Initial1724439407870'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "user" (
            "id" SERIAL NOT NULL, 
            "email" character varying NOT NULL, 
            "password" character varying NOT NULL, 
            CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
        )`)

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "employee" (
            "id" SERIAL NOT NULL, 
            "name" character varying NOT NULL, 
            "dni" integer NOT NULL, 
            "type" character varying NOT NULL, 
            "userId" integer, 
            CONSTRAINT "REL_f4b0d329c4a3cf79ffe9d56504" UNIQUE ("userId"), 
            CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id")
        )`)

    // Crear índice solo si no existe
    await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'IDX_4dd526d4b65f60f9b3442a9610') THEN
                    CREATE INDEX "IDX_4dd526d4b65f60f9b3442a9610" ON "employee" ("type");
                END IF;
            END
            $$;
        `)

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "client" (
            "id" SERIAL NOT NULL, 
            "name" character varying NOT NULL, 
            "email" character varying NOT NULL, 
            "phone" character varying NOT NULL, 
            CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id")
        )`)

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "vehicle" (
            "id" SERIAL NOT NULL, 
            "brand" character varying NOT NULL, 
            "model" character varying NOT NULL, 
            "type" character varying NOT NULL, 
            "category" character varying NOT NULL, 
            "licensePlate" character varying NOT NULL, 
            "clientId" integer, 
            CONSTRAINT "PK_187fa17ba39d367e5604b3d1ec9" PRIMARY KEY ("id")
        )`)

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "appointment" (
            "id" SERIAL NOT NULL, 
            "date" TIMESTAMP NOT NULL, 
            "estimatedPrice" integer NOT NULL, 
            "status" boolean NOT NULL, 
            "documentations" boolean NOT NULL, 
            "vehicleId" integer, 
            "mechanicId" integer, 
            CONSTRAINT "PK_e8be1a53027415e709ce8a2db74" PRIMARY KEY ("id")
        )`)

    // Crear restricciones solo si no existen
    await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_f4b0d329c4a3cf79ffe9d565047') THEN
                    ALTER TABLE "employee" ADD CONSTRAINT "FK_f4b0d329c4a3cf79ffe9d565047" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
                END IF;
            END
            $$;
        `)

    await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_dd014964b642430c75a4100ded4') THEN
                    ALTER TABLE "vehicle" ADD CONSTRAINT "FK_dd014964b642430c75a4100ded4" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
                END IF;
            END
            $$;
        `)

    await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_c909efaf4677f86bb5489454c28') THEN
                    ALTER TABLE "appointment" ADD CONSTRAINT "FK_c909efaf4677f86bb5489454c28" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
                END IF;
            END
            $$;
        `)

    await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_7e8a0db97953afc780cf88849b8') THEN
                    ALTER TABLE "appointment" ADD CONSTRAINT "FK_7e8a0db97953afc780cf88849b8" FOREIGN KEY ("mechanicId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
                END IF;
            END
            $$;
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointment" DROP CONSTRAINT IF EXISTS "FK_7e8a0db97953afc780cf88849b8"`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment" DROP CONSTRAINT IF EXISTS "FK_c909efaf4677f86bb5489454c28"`
    )
    await queryRunner.query(
      `ALTER TABLE "vehicle" DROP CONSTRAINT IF EXISTS "FK_dd014964b642430c75a4100ded4"`
    )
    await queryRunner.query(
      `ALTER TABLE "employee" DROP CONSTRAINT IF EXISTS "FK_f4b0d329c4a3cf79ffe9d565047"`
    )
    await queryRunner.query(`DROP TABLE IF EXISTS "appointment"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "vehicle"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "client"`)
    await queryRunner.query(`DROP INDEX IF EXISTS "public"."IDX_4dd526d4b65f60f9b3442a9610"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "employee"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "user"`)
  }
}
