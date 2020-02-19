import mongoose from 'mongoose'

const connectDb = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/bus_query', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

export default connectDb