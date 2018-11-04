import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../../src/prisma'

jest.setTimeout(100000)

const userOne = {
    input: {
        name: "Test",
        email: "test@test.com",
        password: bcryptjs.hashSync('test123')
    },
    user: undefined,
    jwt: undefined
}

const userTwo = {
    input: {
        name: "Test 2",
        email: "test2@test.com",
        password: bcryptjs.hashSync('test123')
    },
    user: undefined,
    jwt: undefined
}

const seedDb = async () => {
    //wipe out all users
    await prisma.mutation.deleteManyUsers()
    
    //seed a user
    userOne.user = await prisma.mutation.createUser({
        data: userOne.input
    })
    userOne.jwt = jwt.sign({userId: userOne.user.id}, process.env.JWT_SECRET)

    //seed another user
    userTwo.user = await prisma.mutation.createUser({
        data: userTwo.input
    })
    userTwo.jwt = jwt.sign({userId: userTwo.user.id}, process.env.JWT_SECRET)
}

export {seedDb as default, userOne, userTwo}
