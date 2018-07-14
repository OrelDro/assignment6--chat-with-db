import * as express from 'express';
import * as routes from './routes';

const app = express();
app.use(express.json());
app.get('/', (req,res)=>{res.send("hello world")})
app.use('/users',routes.UserRoute);
app.use('/groups',routes.GroupRoute);
app.use('/messages',routes.MessageRoute);
app.use('/conversation',routes.ConversationRoute);


export default app;