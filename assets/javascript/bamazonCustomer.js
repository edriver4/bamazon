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

// Check for the store for the quantity of a particular item
function propmtCustItem(inventory) {
    inquirer
        .prompt({
            name: 'choice',
            type: 'input',
            message:
                'What is the item id you would like to purchase?',
        })
        .then(function (val) {
            console.log('value after inquier ===>', val)
            const choiceId = parseInt(val.choice)
            console.log('This is the choiceId ===>', choiceId);
            var product = checkItem(choiceId, inventory)
            console.log('Product I slected ===>', product)

            promptCustomerForQuantity(product)
        })
}

function checkItem(userChoice, inventory) {
    for (var i = 0; i < inventory.length; i++) {
        if (inventory[i].item_id === userChoice) {
            return inventory[i]
        }
    }
    return null
}

function promptCustomerForQuantity(product) {
    inquirer
        .prompt({
            name: 'quantity',
            type: 'input',
            message:
                'How many units would you like to buy?',
            validate: (input) => {
                return (!isNaN(parseFloat(input)) && input > 0);
            }
        })
        .then(function (val) {
            console.log('The quantity you have selected ===>', val);
            const quantitySelected = parseInt(val.quantity);
            console.log('This is the quantity that the customer selected ===>', quantitySelected);
            checkQuantity(quantitySelected, product);
        })
}

function checkQuantity(selectedAmount, product) {
    if (selectedAmount <= product.stock_quantity) {
        console.log("Order accepted.");
    } else if (product.stock_quantity === 0){
        console.log(`'Sorry, we don\'t have anymore of ${product.product_name}'`);
    }
    else {
        console.log(`'Sorry, you cannot order that amount of ${product.product_name}s. Your order exceeds the amount we have in stock.'`);
    }

}