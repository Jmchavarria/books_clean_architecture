import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1787088493285 implements MigrationInterface {
    name = 'AutoMigration1787088493285'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" ADD "isbn" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "isbn"`);
    }

}
