const mongoose = require('mongoose');
//map global promise - just to get rid of warning
mongoose.Promise = global.Promise;
//connect to db
const db = mongoose.connect('mongodb://localhost:27017/customercli',
{useUnifiedTopology: true,
 useNewUrlParser: true}//,{useMongoClient: true}
);

//import modules
const Customer = require('./models/customer.js');

//add data
const addCustomer = (customer) => {
        Customer.create(customer).then(customer => {
            console.info('new data Added');
            db.close();
        });
    }

//find data
const findCustomer = (name) => {
    //make case insensitive
    const search = new RegExp(name,'i');
    Customer.find({$or: [{firstname : search}, {lastname : search}]})
    .then(customer => {
        console.info(customer);
        console.info(`${customer.length} matches`);
        //db.close();
    });
}

//update data
const updateCustomer = (_id,customer) => {
    Customer.update({_id},customer)
    .then(customer => {
        console.info('data updated');
        //db.close();
    });
}

//remove data
const removeCustomer = (_id) => {
    Customer.remove({_id})
    .then(customer => {
        console.info('data removed');
        //db.close();
    });
}

//list all data
const listCustomer = () => {
    Customer.find()
    .then(customers => {
        console.info(customers);
        console.info(`${customers.length} matched`);
        //db.close();
    });
}

//exporting all
module.exports ={
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCustomer
}