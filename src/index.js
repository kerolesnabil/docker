const express   = require('express');
const mongoose  = require('mongoose')
const redis     = require('redis')
const {Client}     = require('pg')

const PORT =process.env.PORT || 4000;
const app = express();


//connect db
const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PROT = '5432';
const DB_HOST = 'postgres';


const URI=`postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PROT}`

const client =new Client({
    connectionString:URI
})

client
    .connect()
    .then(() =>console.log('connected to postgresql') )
    .catch((err)=>console.log('failed to connect to postgresql:',err));


//connect to redis

const RIDS_PORT=6379
const RIDS_HOST='redis'

const redisClient = redis.createClient({
    url: `redis://${RIDS_HOST}:${RIDS_PORT}`
});

redisClient.on('error', err => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('connected to redis'));

redisClient.connect();
//
// //connect db
// const DB_USERNAME = 'root';
// const DB_PASSWORD = 'example';
// const DB_PROT = '27017';
// const DB_HOST = 'mongo';
//
//
// const URI=`mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PROT}`
//
// mongoose
//     .connect(URI)
//     .then(() =>console.log('connected to mongodb') )
//     .catch((err)=>console.log('failed to connect to db:',err));
//

app.get('/',(req, res)=> {
        redisClient.set('framework', 'ReactJS'); // OR
        res.send('<h1> Hello Tresmerge! dev </h1>')
    })

app.get('/data', async (req, res)=> {
    const framework=await redisClient.get('framework');

    res.send(`<h1> Hello Tresmerge! dev </h1> <h3> ${framework} </h3>`)
})

app.listen(PORT,()=>console.log(`app is up and running on port: ${PORT}`))