import {
    Sequelize
} from 'sequelize'

//Connect to elphant sql
const sequelize = new Sequelize(process.env.DATABASE_ELEPHANT)

//Check connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.')
        // createTables()
    })
    .catch((error) =>
        console.error('Unable to connect to the database:', error))

//Save sequelize in global variable to access it anywhere
global.db = sequelize

function createTables() {
    //Create tables in database
    db.sync({
            force: true
        })
        .then(() => {
            console.log("Tables created")
        })
        .catch((error) => console.log(error))
}

export default sequelize