import mongoose from 'mongoose';


export const connectDB = (URI: string ) => {
    mongoose.connect(URI)
        .then(() => console.log('Connected!'))
        .catch((e) => {
            console.log(e)
        })
    
}

mongoose.set('strictQuery', true)
