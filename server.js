import express from 'express';
import mongoose from 'mongoose';

import userRoutes from './routes/user.js';
import postRoutes from './routes/post.js'
import chatRoomRoutes from './routes/chatRoom.js'


const app = express();
const port = process.env.PORT || 9090;
const databaseName = 'rediofy';

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
.connect("mongodb://mongo:wHn2Z3ZZPZOiCZDFkwdp@containers-us-west-28.railway.app:6352")
         
 // .connect(`mongodb://127.0.0.1:27017/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/chatRoom', chatRoomRoutes);

app.listen(port, () => {
  console.log(`Server running at http:${port}/`);
});