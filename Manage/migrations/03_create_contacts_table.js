exports.up = function(knex) {
    return knex.schema.createTable('contacts', table => {
      table.uuid('id').primary();
      table.uuid('customerId').references('id').inTable('customers').onDelete('CASCADE');
      table.enu('type', ['email', 'phone', 'social']).notNullable();
      table.string('details').notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('contacts');
  };
  