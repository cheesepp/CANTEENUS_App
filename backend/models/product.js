// // const fs = require('fs');
// // const path = require('path');
// const db = require('../util/database')

// const Cart = require('./cart')

// // const p = path.join(
// //   path.dirname(require.main.filename),
// //   'data',
// //   'products.json'
// // );

// // const getProductsFromFile = cb => {
// //   fs.readFile(p, (err, fileContent) => {
// //     if (err) {
// //       cb([]);
// //     } else {
// //       cb(JSON.parse(fileContent));
// //     }
// //   });
// // };

// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//   //   getProductsFromFile(products => {
//   //     if(this.id) {
//   //       const existingProductIndex = products.findIndex(prod => prod.id === this.id)
//   //       const updatedProducts = [...products]
//   //       updatedProducts[existingProductIndex] = this 
//   //       fs.writeFile(p, JSON.stringify(updatedProducts), err => {
//   //         console.log(err);
//   //       });
//   //     } else {
//   //       this.id = Math.random().toString();
//   //       products.push(this);
//   //       fs.writeFile(p, JSON.stringify(products), err => {
//   //         console.log(err);
//   //       });
//   //     }
//   //   });
//    return db.execute('INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)', [this.title, this.price, this.imageUrl, this.description])
//   }

//   // static deleteById(id) {
//   //   getProductsFromFile(products => {
//   //     const product = products.find(prod => prod.id === id)
//   //     const updatedProduct = products.filter(prod => prod.id !== id);
//   //     fs.writeFile(p, JSON.stringify(updatedProduct), err => {
//   //       if(!err) {
//   //         Cart.deleteProduct(id, product.price)
//   //       }
//   //     })
//   //   });
//   // }

//   // static fetchAll(cb) {
//   //   getProductsFromFile(cb);
//   // }

//   // static findById(id, cb) {
//   //   getProductsFromFile(products => {
//   //     const product = products.find(p => p.id === id);
//   //     cb(product);
//   //   });
//   // }
//   static findById(id) {
//     return db.execute('SELECT * FROM products WHERE products.id = ?', [id])
//   }

//   static fetchAll() {
//     return db.execute('SELECT * FROM products')
//   }

// };

const getDb = require('../util/database').getDb

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title
    this.price = price
    this.description = description
    this.imageUrl = imageUrl
  }

  save() {
    const db = getDb()
    return db.collection('products').insertOne(this).then(result => {
      console.log(result)
    }).catch(err => {
      console.log(err)
    })
  }
}

// SEQUELIZE
// const Sequelize = require('sequelize')

// const sequelize = require('../util/database')

// const Product = sequelize.define('product', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },

//   title: Sequelize.STRING,
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false,
//   },

//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },

//   description: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },

// })

module.exports = Product