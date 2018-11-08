// Packages that are required
// Must do npm install package
const inquirer = require('inquirer');
const mysql = require('mysql');

// Details for the Database Connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'bamazon',
});

// Connecting to the database
connection.connect((err) => {
    if (err) throw err;
    console.log(`You connected to the database successfully #${connection.threadId}`);
    retrieveAllItems();
});

function retrieveAllItems() {
    connection.query('SELECT * FROM products', (err, res) => {
        if (err) throw err;
        console.table(res);
        propmtCustItem(res)
    })
}

// Prompt user for item they would like to buy.



// Check for the store for the quantity of a particular item
function propmtCustItem(inventory) {
    inquirer
        .prompt({
            name: 'choice',
            type: 'input',
            message:
            'What is the item id you would like to purchase?',
        })
        .then(function(val) {
            console.log('value after inquier ===>', val)
            const choiceId = parseInt(val.choice)
            var product = checkItem(choiceId, inventory)
            console.log('Product I slected ===>', product)

            promptCustomerForQuantity(product)
        })
}

function checkItem (userChoice, inventory) {
   for (var i = 0; i < inventory.length; i++){
       if (inventory[i].item_id === userChoice){
           return inventory[i]
       }
   }
   return null
}

function promptCustomerForQuantity(product){

}