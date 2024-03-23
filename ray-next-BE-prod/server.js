const app  = require("./app.js");
const http = require('http');
const mongoose = require("mongoose")
require('dotenv').config()


async function server() {
    try {
        console.log(process.env.PORT_LOCAL)
        // const server = http.createServer(app);
        // if (process.env.NODE_ENV === 'production') {
        //   mongoUrl = process.env.MONGO_URL_PROD;
        // } else {
        //   mongoUrl = process.env.MONGO_URL_LOCAL;
        // }
        app.listen(process.env.PORT_LOCAL, () => console.log(`Listening on port ${process.env.PORT_LOCAL}`));
        mongoose.connect(`${process.env.MONGO_URL_LOCAL}/${process.env.DATABASE_NAME}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
    } catch (error) {
        console.log(error.message);
    }
}

server();