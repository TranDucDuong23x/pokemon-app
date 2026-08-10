import {PrismaClient} from '@prisma/client'
import {PrismaPg} from '@prisma/adapter-pg'
import { config } from 'dotenv'
import pg from 'pg'
config()
const {Pool} = pg
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({
    adapter,
    log:process.env.NODE_ENV 
    ? ["query","error","warn"]
    : ["error"]
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
