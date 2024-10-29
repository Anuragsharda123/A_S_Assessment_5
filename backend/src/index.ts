import express from 'express';
import cors from 'cors'
import { createServer } from 'http';
import {Server} from 'socket.io';
import router from './route/userRouter';
import sequelize from './config/db';
import { Local } from './environment/config';

const app = express();
const server = createServer(app);
const io = new Server(server,
    {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    }
)

const PORT = Local.Port;

app.use('/resume', express.static('resume'));
app.use(express.json());
app.use(cors());
app.use('/', router);

io.on("connection", (socket)=>{
    
    socket.on("send_message", (message)=>{
        console.log("Message:---->", message);
        io.emit("received_message", message);
        // socket.emit("received_message",  message);

    })
})


sequelize.sync({force:false}).then(()=> {
    console.log("Database is Connected........");

    server.listen(PORT, ()=>{
        console.log(`Server is connected with port ${PORT}`)
    })
}).catch((err)=>{
    console.log("Connection Failed: ", err);
})