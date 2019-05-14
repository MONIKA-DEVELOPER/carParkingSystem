const adminModel = require('./models/admin')
const recordsModel = require('./models/records')
const Sequelize = require('sequelize')
const sequelize = new Sequelize('carParking','root','monika',{
  host : 'localhost',
  dialect : 'mysql'
})

sequelize
.authenticate()
.then( () => {
  console.log('connected!!!!!')
})
.catch( err => {
  console.log('ERROR : ',err)
})

sequelize
.sync({})
.then( () => {
  console.log('tables created!!!!!!!')
})
.catch( err => {
  console.log('ERROR :', err)
})

const Admin = adminModel(sequelize,Sequelize)
const Records = recordsModel(sequelize,Sequelize)
module.exports = {
  Admin,
  Records
}
