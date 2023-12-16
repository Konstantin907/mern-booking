import express from 'express'
//import path from 'path';
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'
import propertyRoute from './routes/property.js'
import bookingsRoute from './routes/bookings.js';
import locationRoute from './routes/location.js';
import cookieParser from 'cookie-parser'
import http from 'http';
import {Server} from 'socket.io';
import reviewsRoute from './routes/review.js';
import multer from 'multer';
//import path from 'path';
import cors from 'cors';
dotenv.config();


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', 
        methods: ["GET", "POST"],
        credentials: true
    }
});




// Database Connection
mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    throw err;
});

//middlewares:
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
//app.use('/images', express.static(path.join(__dirname, 'public')));


app.use('/api/auth', authRoute)
app.use('/api/hotels', hotelsRoute)
app.use('/api/rooms', roomsRoute)
app.use('/api/users', usersRoute)

app.use('/api/property', propertyRoute)
app.use('/api/bookings', bookingsRoute)
app.use('/api/location', locationRoute)

// Routes
app.use('/api/auth', authRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);
app.use('/api/reviews', reviewsRoute);

//multer Files uploading
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        return cb (null,"./public/images")
    },
    filename : function(req,file,cb){
        return cb (null,`${Date.now()}_${file.originalname}`)
    }
});
const upload = multer({storage}).array('photos');

app.post('/api/upload',(req,res)=>{
    upload(req, res, (err) => {
        //console.log(req.body);
        console.log(req.files);
        const photoUrls = req.files.map((file)=>`/images/${file.filename}`);
        if (err) {
          return res.json({ success: false, err });
        }
        return res.json({ success: true, files: req.files,photoUrls }); // Devuelve los archivos subidos
      });
});

// Database Connection
mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    throw err;
});



mongoose.connection.on('connected', () => {
    console.log('MongoDB connected!');
});



io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on('request_my_id', () => {
        socket.emit('my_id', socket.id);
    });

    socket.on('send_message', (message) => {
        const timestamp = new Date().toISOString();
        io.emit('receive_message', { ...message, timestamp, senderId: socket.id});
    });

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
    });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
});
