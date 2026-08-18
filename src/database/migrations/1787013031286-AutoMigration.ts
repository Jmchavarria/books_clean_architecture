import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1787013031286 implements MigrationInterface {
    name = 'AutoMigration1787013031286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` ADD CONSTRAINT \`FK_594ad92cc478a33e51fd0e31bf3\` FOREIGN KEY (\`publisherId\`) REFERENCES \`publishers\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` DROP FOREIGN KEY \`FK_594ad92cc478a33e51fd0e31bf3\``);
    }

}
