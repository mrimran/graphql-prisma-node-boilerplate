
import {gql} from 'apollo-boost'

const createUser = gql`
    mutation($data:CreateUserInput!) {
        createUser (
            data: $data
        ) {
            token,
            user {
                id
                name
                email
            }
        }
    }
`

const getUsers = gql`
    query {
        users {
            id
            name
            email
        }
    }
`

const login = gql`
    mutation($email: String!, $password: String!) {
        login (
            email: $email,
            password: $password
        ) {
            token
        }
    }
`

const getProfile = gql`
    query {
        me {
            id
            name
            email
        }
    }
`

const getPosts = gql`
    query {
        posts {
            id
            title
            published
        }
    }
`

export {createUser, login, getUsers, getProfile}
