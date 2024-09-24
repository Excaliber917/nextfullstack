import mongoose from 'mongoose'


export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection

        connection.on('connected', () => { console.log("connected") })


        connection.on('error', () => {
            console.log("not connected")
            process.exit(1)
        })


    } catch (error) {
        console.log(error)
        process.exit(1)
    }

}