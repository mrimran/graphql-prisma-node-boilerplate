import 'cross-fetch/polyfill'
import ApolloBoost, {gql} from 'apollo-boost'
import prisma from '../src/prisma'
import seedDb, {userOne} from './utils/seedDb'
import getClient from './utils/getClient'
import {createUser, getUsers, login, getProfile} from './utils/operations.js'

jest.setTimeout(100000)

const client = new ApolloBoost({
    uri: 'http://localhost:4000'
})

beforeEach(seedDb)

test('Create new user', async () => {
    const variables = {
        data: {
            name: "Imran Test",
            email: "imrantest@test.com",
            password: "123456"
        }
    }

    const response = await client.mutate({
        mutation: createUser,
        variables
    })

    const exists = await prisma.exists.User({id: response.data.createUser.user.id})
    expect(exists).toBe(true)
})

test('Expose public author profiles', async () => {
    const response = await client.query({query: getUsers})

    expect(response.data.users.length).toBe(2)
    expect(response.data.users[0].email).toBe(null)
    expect(response.data.users[0].name).toBe('Test')
})

test('Dont login with bad credentials', async () => {
    const variables = {
        email: "imrantest@test.com",
        password: "1111113"
    }

    await expect(
        client.mutate({mutation: login, variables})
    ).rejects.toThrow()
})

test('Cannot signup with short password', async () => {
    const variables = {
        data: {
            name: "Test User",
            email: "testuser@test.com",
            password: "1234"
        }
    }
    await expect(
        client.mutate({mutation: createUser, variables})
    ).rejects.toThrow()
})

test('fetch user profile', async() => {
    const client = getClient(userOne.jwt)

    const {data} = await client.query({query: getProfile})

    expect(data.me.id).toBe(userOne.user.id)
    expect(data.me.name).toBe(userOne.user.name)
    expect(data.me.email).toBe(userOne.user.email)
})