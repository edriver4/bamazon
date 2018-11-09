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

// This Function is retrieves all the data from the database and displaying it as a table within the terminal.
// This function returns the response with all the information within the database. 
function retrieveAllItems() {
    connection.query('SELECT * FROM products', (err, res) => {
        if (err) throw err;
        console.table(res);
        propmtCustItem(res)
    })
}

// Check for the store for the quantity of a particular item.
// Prompts the user to input the item id of the item they want.
// Then within the promise (.then) it returns the item that the customer selected.
// Then prompts the user how much they would like to purchase.
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
            console.log('Product I selected ===>', product)

            promptCustomerForQuantity(product)
        })
}
// This function checks to see if the item id that was entered is in the database. 
// If the item is it returns everything about that item.
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
            updateData(product, quantitySelected);
        })
}

function checkQuantity(selectedAmount, product) {
    if (selectedAmount <= product.stock_quantity) {
        console.log("Order accepted.");
    } else if (product.stock_quantity === 0) {
        console.log(`'Sorry, we don\'t have anymore of ${product.product_name}'`);
    }
    else {
        console.log(`'Sorry, you cannot order that amount of ${product.product_name}s. Your order exceeds the amount we have in stock.'`);
    }

}

// Function to update the data within the database. Updating the quantity when the item is ordered.
function updateData(product, quantitySelected) {
    connection.query(`UPDATE products SET stock_quantity = ${product.stock_quantity - quantitySelected} WHERE item_id = ${product.item_id}`, (err, res) => {
        if (err) throw err;
        console.log('=================================');
        console.log('Your total is: $' + (product.price * quantitySelected));
        console.log('=================================');
        // console.log(`${res.affectedRows} row(s) was affected.`);
        retrieveAllItems();
    })
}
