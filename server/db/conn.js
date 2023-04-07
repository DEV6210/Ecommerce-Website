const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  // await mongoose.connect('mongodb://127.0.0.1:27017/register');
  await mongoose.connect(`mongodb+srv://aps:aps@ecommerce.1cpwntp.mongodb.net/Emart?retryWrites=true&w=majority`)
  console.log('connected')
  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}