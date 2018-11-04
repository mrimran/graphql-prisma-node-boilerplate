import bcryptjs from 'bcryptjs'
import getUserId from '../utils/getUserId'
import generateToken from '../utils/generateToken'
import hashPassword from '../utils/hashPassword'

// const token = jwt.sign({id: 46}, 'mysecret')

// console.log(token)

// const decoded = jwt.decode(token)

// console.log(decoded)

// const verified = jwt.verify(token, 'mysecret')
// console.log(verified)

//const verified2 = jwt.verify(token, 'mysecret2')
//console.log(verified2)

const Mutation = {
    async login(parent, args, {db, prisma}, info) {
        const user = await prisma.query.user({
            where: {
                email: args.email
            }
        })

        if(!user) {
            throw new Error('User doesn\'t exist')
        }

        const validUser = await bcryptjs.compare(args.password, user.password)

        if(!validUser) {
            throw new Error('Wrong email or password.')
        }

        return {
            user,
            token: generateToken(user.id)
        }
    }, 
    async createUser(parent, args, {db, prisma}, info) {
        const password = await hashPassword(args.data.password)

        const emailTaken = await prisma.exists.User({email: args.data.email})

        if(emailTaken) {
            throw new Error('Email taken.')
        }

        const user = await prisma.mutation.createUser({
            data: {
                ...args.data,
                password
            }
        })

        return {
            user,
            token: generateToken(user.id)
        }
    },
    async deleteUser(parent, args, {prisma, request}, info) {
        const userId = getUserId(request)

        const userExist = await prisma.exists.User({id: userId})

        if(!userExist) {
            throw new Error('No user found.')
        }

        return prisma.mutation.deleteUser({where: {id: args.id}}, info)
    },
    async updateUser(parent, args, {prisma, request}, info) {
        const userId = getUserId(request)

        if(typeof args.data.password === 'string') {
            args.data.password = await hashPassword(args.data.password)
        }
        
        return prisma.mutation.updateUser({
            where: {
                id: userId
            },
            data: args.data
        }, info)
    },
}

export {Mutation as default}
