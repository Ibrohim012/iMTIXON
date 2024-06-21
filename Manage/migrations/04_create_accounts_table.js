exports.up = function(knex) {
    return knex.schema.createTable('accounts', table => {
      table.uuid('id').primary();
      table.uuid('customerId').references('id').inTable('customers').onDelete('CASCADE');
      table.decimal('balance', 14, 2).notNullable();
      table.enu('currency', ['USD', 'EUR', 'UZS']).notNullable();
      table.enu('status', ['active', 'inactive', 'closed']).defaultTo('active');
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('accounts');
  };
  