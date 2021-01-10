const app = require('./server/server');
const port = process.env.PORT

app.listen(port, () => {
  console.log('ポート ' + port);
  console.log(process.env.SENDGRID_API_KEY, process.env.PORT, process.env.MONGO_URI)
})