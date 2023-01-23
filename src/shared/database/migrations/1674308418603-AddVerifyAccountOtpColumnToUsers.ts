import { MigrationInterface, QueryRunner } from "typeorm"

export class AddVerifyAccountOtpColumnToUsers1674308418603 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE users ADD COLUMN IF NOT EXISTS verify_account_otp VARCHAR(6) DEFAULT NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE users DROP COLUMN verify_account_otp;
        `);
    }

}
