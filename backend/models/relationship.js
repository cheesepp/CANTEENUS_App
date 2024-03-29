const Item = require('./item');
const Ingredient = require('./ingredient');
const item_ingredient = require('./item_ingredient');
const Bill = require('./bill');
const bill_item = require('./bill_item');
const User = require('./user')
const BusinessTarget = require('./business_target')
Item.belongsToMany(Ingredient, {
  through: item_ingredient,
  as: 'ingredient',
  foreignKey: 'item_id',
});

Ingredient.belongsToMany(Item, {
  through: item_ingredient,
  as: 'item',
  foreignKey: 'ingredient_id',
});


Item.belongsToMany(Bill, {
  through: bill_item,
  as: 'bill',
  foreignKey: 'item_id',
});

Bill.belongsToMany(Item, {
  through: bill_item,
  as: 'item',
  foreignKey: 'bill_id',
});

User.hasMany(Bill, {
  foreignKey: 
  { 
    name: 'user_id', 
    defaultValue:null,
    allowNull:true 
  }
})

//Bill.belongsTo(User)

module.exports = {
  Item,
  Ingredient,
  Bill,
  item_ingredient,
  bill_item,
  User,
  BusinessTarget
};