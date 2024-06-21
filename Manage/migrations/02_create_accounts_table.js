exports.up = function(knex) {
    return knex.schema.createTable('accounts', function(table) {
      table.increments('id').primary();
      table.integer('customer_id').unsigned().references('customers.id').onDelete('CASCADE');
      table.string('account_number').notNullable().unique();
      table.decimal('balance').notNullable().defaultTo(0);
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('accounts');
  };
  