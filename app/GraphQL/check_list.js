import { gql } from 'apollo-server-express'
//import { GraphQLScalarType } from 'graphql';
import * as db from '../database'
import * as token_control from '../modules/token_control'

export const typeDefs = gql`
    extend type Query {
        check_list(token:String!,company_id:ID!): [CheckList]
        check(token:String!,id: ID!): CheckList
    }

    type CheckList {
        id: ID!
        name: String
        type_id: ID
        allclass:Boolean
        isrequired: Boolean
    }
`

export const resolvers = {
    Query: {
        check_list: async (obj, args, context, info) => {
            const tk_status = await token_control(args.token)
            if(tk_status){
                return db.check_list.findAll({where:{company_id:args.company_id}})
            } else {

            }
        },
        check: async (obj, args, context, info) => {
            const tk_status = await token_control(args.token)
            if(tk_status){
                return db.check_list.findByPk(args.id)
            } else {

            }
        }
    }
}