# shopping-cart
Hands on for NodeJS Development
 
 Shopping-cart app where registered/signed up and non-registered users can select and add items to cart, reistered users can log in and see their cart sessions. 
The user can select multiple items, selecting an item more than once groups the item in a collection with the corresponding price. 
The user can then see the aggregated collection of cart items and total price.

This implements the MVC Architecture and is developed using 
Nodejs | express. Data persistence with MongoDB | Mongoose, express-validator, connect-flash for slashing messages to the view, bcrypt to hash passwords, connect-mongo to store the user sessions in the DB, passport, passport-local Strategy for signup and sign-in authentications, CSURF to protect our session and Express-handlebars for Templating and displaying data to the View.
