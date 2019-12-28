import { gql } from 'apollo-server-express'
import * as db from '../database'
import * as token_control from '../modules/token_control'

export const typeDefs = gql`
    extend type Query {
        courses(token:String!,company_id: ID!): [Course]
    }

    type Course {
        id: ID!
        company_id: ID
        name: String
        lesson_id: ID
        teacher_id: ID
        classroom_id: ID
        description: String
        color: String
        inspection: Boolean
        is_archived: Boolean
        stupri: String
        teapri: String
        created_at: Date
        updated_at: Date
    }
`

export const resolvers = {
    Query: {
        courses: async (obj, args, context, info) => {
            const tk_status = await token_control(args.token)
            
            if(tk_status){
                return db.classes.findAll({where:{company_id:args.company_id}})
            } else {

            }
        }
    }
}