import * as mongoose from 'mongoose';


const messageSchema = mongoose.Schema({
   sender: String,
   receiver: String,
   content: String,
   time: String
});

export default mongoose.model('Message',messageSchema);
