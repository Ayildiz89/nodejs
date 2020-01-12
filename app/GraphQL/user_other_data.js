import { gql } from 'apollo-server-express'
//import { GraphQLScalarType } from 'graphql';
import * as db from '../database'
import * as token_control from '../modules/token_control'

export const typeDefs = gql`
    extend type Query {
        user_other_data(token:String!,user_id:ID!,company_id:ID!): [UserOtherData]
    }

    type UserOtherData {
        id: ID!
        company_id: ID
        form_id: ID
        user_id: ID
        other_data: String
        description: String
        child_data: String
        form: FormData
    }
`

export const resolvers = {
    Query: {
        user_other_data: async (obj, args, context, info) => {
            const tk_status = await token_control(args.token)
            if(tk_status){
                return db.user_other_data.findAll({
                    where:{
                        company_id:args.company_id,
                        user_id:args.user_id
                    }
                })
            } else {

            }
        },
    },
    UserOtherData: {
        form: async (obj, args, context, info) => {
            return await db.form_data.findByPk(obj.form_id)
        }
    }
}