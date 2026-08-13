import {PrismaClient} from '@prisma/client'
import { config } from 'dotenv'
config()
const prisma = new PrismaClient({
})

const connectedDB = async () => {
    try{
        await prisma.$connect()
        console.log("Db Connected via Prisma")
    }catch(err){
        console.log(err);
        process.exit()
    }

}
const disconnectDB = async() => {
    await prisma.$disconnect()
}
export {prisma, connectedDB, disconnectDB}
