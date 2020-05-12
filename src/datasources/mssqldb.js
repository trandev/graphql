const { SQLDataSource } = require('datasource-sql');

class SQLDatabase extends SQLDataSource{
    getEmployees(){
        return this.knex
            .select("*")
            .from("Employee");
    }
}

module.exports = SQLDatabase;