import express, { Application } from 'express'
import routes from './routes'

// import './POSTGRESQL/database'
require('./POSTGRESQL/database/index')

const app:Application = express();

app.use(express.json())

app.use(routes)

app.listen(3333, () => {
    console.log('###########################')
    console.log('######## SERVER UP ########\n')
    console.log('THIS IS A SERVER FOR TESTS\nFeel free to Overdue stuff!')
    console.log('\n###########################')
    console.log('###########################\n')
})