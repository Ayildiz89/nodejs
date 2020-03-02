import '@babel/polyfill'
import express from 'express';
const GraphQLJSON = require('graphql-type-json');
const bodyParser = require('body-parser')
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
        require('./GraphQL/view_courses')
    ],
    resolvers: resolveFunctions
})

server.applyMiddleware({ app })

app.get('/', (req, res) => res.send('Hello World!'))

app.listen({ port: 5000 }, () =>
    console.log(`🚀 Server ready at http://localhost:5000`),
)
