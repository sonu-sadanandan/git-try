#!/usr/bin/env node
const program = require('commander');
const {promt} = require('inquirer');
const {
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCustomer
} = require('./index.js');

const questions = [
    {
        type: 'input',
        name: 'firstname',
        message: 'first name'
    },
    {
        type: 'input',
        name: 'lastname',
        message: 'last name'
    },
    {
        type: 'input',
        name: 'phone',
        message: 'phone number'
    },
    {
        type: 'input',
        name: 'email',
        message: 'email'
    }
];

program
    .version('1.0.0')
    .description('Attendence Management System')

// program
//     .command('add <firstname> <lastname> <phone> <email>')
//     .alias('a')
//     .description('add a data')
//     .action((firstname,lastname,phone,email)=>{
//         addCustomer({firstname,lastname,phone,email});
//     });  

program
    .command('add')
    .alias('a')
    .description('add a data')
    .action(() => {
        promt(questions).then(answers => addCustomer(answers));
    });

program
    .command('find <name>')
    .alias('f')
    .description('find a data')
    .action(name => findCustomer(name));

program
    .command('update <_id>')
    .alias('u')
    .description('update a data')
    .action(_id => {
        promt(questions).then(answers => updateCustomer(_id,answers));
    });

program
    .command('remove <_id>')
    .alias('r')
    .description('remove a data')
    .action(_id => removeCustomer(_id));

program
    .command('list')
    .alias('l')
    .description('list all data')
    .action(() => listCustomer());

program.parse(process.argv);