import * as mongoose from 'mongoose';

const groupSchema = mongoose.Schema({
    name: String,
    parentId: {type:mongoose.Schema.Types.ObjectId, default: null},
    type: String,
    itemsType: {type:String, default: null},
    items: [{type:mongoose.Schema.Types.ObjectId, refPath:'itemsType'}]
});


export default mongoose.model('Group', groupSchema);
