import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateUsersTable1674308272707 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create table if not exists users(
                id uuid DEFAULT uuid_generate_v4() NOT NULL,
                first_name varchar,
                last_name varchar,
                email varchar unique,
                password varchar,
                jwt_token varchar,
                last_login_at timestamp default null,
                primary key(id)
            );`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE users;
        `);
    }

}
