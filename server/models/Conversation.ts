import * as mongoose from 'mongoose';

const conversationSchema = mongoose.Schema({
    convId: mongoose.Schema.Types.ObjectId,
    messages: [{type: mongoose.Schema.Types.ObjectId, ref:'Message'}]
});

export default mongoose.model('Conversation',conversationSchema);

