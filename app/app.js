import '@babel/polyfill'
import express from 'express';
import verifications_code from './models/verifications_code';
import { sendMail } from './modules/sendMail';
const GraphQLJSON = require('graphql-type-json');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express')
const cors = require('cors')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())



const resolveFunctions = {
    JSON: GraphQLJSON
};

const server = new ApolloServer({
    modules: [
        require('./GraphQL/tickets'),
        require('./GraphQL/status'),
        require('./GraphQL/priorities'),
        require('./GraphQL/users'),
        require('./GraphQL/category'),
        require('./GraphQL/classroom'),
        require('./GraphQL/check_list'),
        require('./GraphQL/company'),
        require('./GraphQL/courses'),
        require('./GraphQL/events'),
        require('./GraphQL/lesson'),
        require('./GraphQL/company_templates'),
        require('./GraphQL/user_other_data'),
        require('./GraphQL/form_data'),
        require('./GraphQL/reports'),
        require('./GraphQL/view_courses'),
        require('./GraphQL/current_teacher'),
        require('./GraphQL/current_courses'),
        require('./GraphQL/students_statistics'),
        require('./GraphQL/students_status'),
        require('./GraphQL/others')
    ],
    resolvers: resolveFunctions
})

server.applyMiddleware({ app })

app.get('/', (req, res) => res.send('Welcome to EDUCSYS!'))

app.get('/trymail', (req, res) => {
    console.log(sendMail({
        to:"eozbay@hotmail.com",
        from:"member@educsys.de",
        subject:"Denmeeeee",
        theme:"verification_code",
        title:"AAAA"}))
    return res.send("Mail gömnderildi")
})

app.listen({ port: 5000 }, () =>
    console.log(`🚀 Server ready at http://localhost:5000`),
)

