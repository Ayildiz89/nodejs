import { gql } from 'apollo-server-express'
//import { GraphQLScalarType } from 'graphql';
import * as db from '../database'
import * as token_control from '../modules/token_control'

export const typeDefs = gql`
    extend type Query {
        classrooms(token:String!,company_id:ID!): [Classroom]
        classroom(token:String!,id: ID!): Classroom
    }

    type Classroom {
        id: ID!
        name: String
        description: String
        address: String
        capacity: Int
    }
`

export const resolvers = {
    Query: {
        classrooms: async (obj, args, context, info) => {
            const tk_status = await token_control(args.token)
            if(tk_status){
                return db.classroom.findAll({where:{company_id:args.company_id}})
            } else {

            }
        },
        classroom: async (obj, args, context, info) => {
            const tk_status = await token_control(args.token)
            if(tk_status){
                return db.classroom.findByPk(args.id)
            } else {

            }
        }
    }
}