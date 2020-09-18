const express = require('express');
const routes = require('./routes');

require('../src/DATABASE_TEST/database/index')

const app = express();

app.use(express.json())
app.use(routes)

app.listen(3333, () => {
    console.log('###########################')
    console.log('######## SERVER UP ########\n')
    console.log('THIS IS A SERVER FOR TESTS\nFeel free to Overdue stuff!')
    console.log('\n###########################')
    console.log('###########################\n')
})