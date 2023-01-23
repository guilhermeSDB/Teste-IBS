import mongoose from 'mongoose';
import express from 'express';
import database from './db';
import router from '../router';
import app from '../app';

mongoose.set("strictQuery", false);
mongoose.connect(database.local.localDatabaseUrl)
.then(() => {
    app.use(express.json());
    app.use(router);
    app.listen(database.local.port, () => {
        console.log(`🚀 Server is running on https://localhost:${database.local.port}`);
    })
})
.catch((error) => {
    console.log('Database is not connected - ', error.message);
});