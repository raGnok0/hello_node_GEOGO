
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS todolist (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(100) UNIQUE NOT NULL,
    status VARCHAR(20) NOT NULL, 
    duedate VARCHAR(30) NOT NULL       
  )
`;

const showTable = `
   SELECT * FROM todolist;`

module.exports = {
    createTableQuery,
    showTable,

}