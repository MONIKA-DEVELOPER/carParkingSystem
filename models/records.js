module.exports = (sequelize,type) => {
  return sequelize.define('records',{
    id : {
      type: type.INTEGER,
      autoIncrement:true,
      primaryKey : true,
    },
    carName : type.STRING,
    carNumber : type.STRING,
    owner : type.STRING,
    email : type.STRING,
    contact : type.STRING,
    company : type.STRING,
    floorNumber : type.INTEGER,
    photo : type.STRING
  })
}
