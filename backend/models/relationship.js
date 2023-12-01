const Food = require('./food');
const Material = require('./material');
const FoodMaterials = require('./food_material');
const BillFoods = require('./bill_foods');
const Bill = require('./bill')

Food.belongsToMany(Material, {
  through: FoodMaterials,
  as: 'materials',
  foreignKey: 'foodId',
});

Material.belongsToMany(Food, {
  through: FoodMaterials,
  as: 'foods',
  foreignKey: 'materialId',
});


Food.belongsToMany(Bill, {
  through: BillFoods,
  foreignKey: 'foodId',
});

Bill.belongsToMany(Food, {
  through: BillFoods,
  foreignKey: 'billId',
});

User.hasMany(Bill, {
  foreignKey: { name: 'user_id', allowNull:false}
})

Bill.belongsTo(User)
module.exports = {
  Food,
  Material,
  FoodMaterials,
};