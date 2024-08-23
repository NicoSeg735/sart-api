import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1724439407870 implements MigrationInterface {
    name = 'Initial1724439407870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "dni" integer NOT NULL, "type" character varying NOT NULL, "userId" integer, CONSTRAINT "REL_f4b0d329c4a3cf79ffe9d56504" UNIQUE ("userId"), CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4dd526d4b65f60f9b3442a9610" ON "employee" ("type") `);
        await queryRunner.query(`CREATE TABLE "client" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vehicle" ("id" SERIAL NOT NULL, "brand" character varying NOT NULL, "model" character varying NOT NULL, "type" character varying NOT NULL, "category" character varying NOT NULL, "licensePlate" character varying NOT NULL, "clientId" integer, CONSTRAINT "PK_187fa17ba39d367e5604b3d1ec9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "appointment" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "estimatedPrice" integer NOT NULL, "status" boolean NOT NULL, "documentations" boolean NOT NULL, "vehicleId" integer, "mechanicId" integer, CONSTRAINT "PK_e8be1a53027415e709ce8a2db74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_f4b0d329c4a3cf79ffe9d565047" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicle" ADD CONSTRAINT "FK_dd014964b642430c75a4100ded4" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_c909efaf4677f86bb5489454c28" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_7e8a0db97953afc780cf88849b8" FOREIGN KEY ("mechanicId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_7e8a0db97953afc780cf88849b8"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_c909efaf4677f86bb5489454c28"`);
        await queryRunner.query(`ALTER TABLE "vehicle" DROP CONSTRAINT "FK_dd014964b642430c75a4100ded4"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_f4b0d329c4a3cf79ffe9d565047"`);
        await queryRunner.query(`DROP TABLE "appointment"`);
        await queryRunner.query(`DROP TABLE "vehicle"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4dd526d4b65f60f9b3442a9610"`);
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
