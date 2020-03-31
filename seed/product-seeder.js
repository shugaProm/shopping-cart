const Product = require('../models/product');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopping');


const products = [ 
    new Product({
    imagePath: '/images/shopping-cart  brown broughes.JPG',
    title: 'Elegant Brown Broughes',
    price: 22000
}),
    new Product({
    imagePath: '/images/shopping-cart blue loafers.png',
    title: 'Navy-Blue Loafers(classic)',
    price: 18000
}),
    new Product({
    imagePath: '/images/shopping-cart brown-ankle-length.JPG',
    title: 'Executive Brown',
    price: 28000
}),
    new Product({
    imagePath: '/images/shopping-cart brown loafers.png',
    title: 'Brown Loafers(classic)',
    price: 18000
}),

    new Product({
    imagePath: '/images/shopping-cart grey shoe.png',
    title: 'Grey Cover Shoe(shimmers)',
    price: 20000
}),

    new Product({
    imagePath: '/images/shopping-cart white shoe.png',
    title: 'White cover shoe(sparkles)',
    price: 25000
})
];


let done = 0;
for (var i = 0; i < products.length; i++) {
    products[i].save(function(err, result){
        
        done++
        if (done === products.length) {
            exit();
        }
        console.log(result);
    }); 
}

function exit() {
    mongoose.disconnect();
}