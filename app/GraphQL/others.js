import { gql, ApolloError } from 'apollo-server-express'
import * as db from '../database'
import * as token_control from '../modules/token_control'

export const typeDefs = gql`
    extend type Query {
        current_teachers(token:String!,company_id: ID!): [CurrentTeacher]
    }

    type CurrentTeacher {
        id: ID!
        first_name: String
        last_name: String
    }
`

export const resolvers = {
    Query: {
        current_teachers: async (obj, args, context, info) => {
            const tk_status = await token_control(args.token)
            if(tk_status){
                
            } else {
                throw new ApolloError("token is required",1000)
            }
        },
        lesson: async (obj, args, context, info) => {
            const tk_status = await token_control(args.token)
            if(tk_status){
                return db.lesson.findByPk(args.id)
            } else {

            }
        }
    }
}