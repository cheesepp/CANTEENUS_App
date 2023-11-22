const Product = require('./product')
const User = require('./user')
const Cart = require('./cart')
const Order = require('./order')
const CartItem = require('./cart-item')
const OrderItem = require('./order-item')

console.log('user', User)
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'})
User.hasMany(Product)
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })
Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product, { through: OrderItem })

exports.user = User
exports.product = Product
exports.cart = Cart