import * as readline from 'readline'

import task1 from './tasks/test1'
import task2 from './tasks/connection'

const tasksArray: Array<any> = [task1, task2]

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

console.log('Welcome to the Tests Interface')

console.log('Taks 1 - Sync test')
console.log('Taks 2 - Socket connect')
rl.question('Please, select a test to run\n', (option) => {
    
    switch(option){
        case '1':
            task1()
            rl.close()
            break
        case '2':
            task2()
            rl.close()
            break
        default:
            console.log('Please, chose a valid input!')
            rl.close()
            break
    }
})

rl.on('close', ()=>{
    process.exit(0)
})