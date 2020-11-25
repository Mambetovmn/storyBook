const mongoose = require('mongoose')

const connectDb = async () => {
  try{
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      })

    console.log(`Mongo Db Connected ${conn.connection.host}`)
  }catch (e) {
    console.error(e)
    process.exit(1)
  }
}

module.exports = connectDb