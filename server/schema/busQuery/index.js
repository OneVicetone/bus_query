import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
    routes:String,
    busSite:String,
    status:String
})

export default mongoose.model('BusQuery',Schema)