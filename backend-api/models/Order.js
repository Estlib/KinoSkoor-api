module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define(
        'Order', {
            OrderID:{
                type: DataTypes.UUID,
                primaryKey: true,
                DefaultValue: DataTypes.UUIDV7
            },
            OrderNotes: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            OrderCost: {
                type: DataTypes.DECIMAL,
                allowNull: false
            },
            DeliveryAddress: {
                type: DataTypes.STRING,
                allowNull: false
            },

        }
    )
    console.log(Order === sequelize.models.Order)
    return Order;
}