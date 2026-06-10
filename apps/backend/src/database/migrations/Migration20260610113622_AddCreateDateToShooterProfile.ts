import { Migration } from '@mikro-orm/migrations';

export class Migration20260610113622_AddCreateDateToShooterProfile extends Migration {

  override up(): void | Promise<void> {
    this.addSql(`alter table "shooter_profile" add "created_at" timestamptz not null default current_timestamp;`);
  }

  override down(): void | Promise<void> {
    this.addSql(`alter table "shooter_profile" drop column "created_at";`);
  }

}
