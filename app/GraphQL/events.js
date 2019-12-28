import { gql } from 'apollo-server-express'
import * as db from '../database'
import * as token_control from '../modules/token_control'

export const typeDefs = gql`
    extend type Query {
        event(token:String!,id: ID!): Event
    }

    type Event {
        id: ID!
        company_id: ID
        title: String
        class_id: ID
        teacher_id: ID
        classroom_id: ID
        description: String
        color: String
        start: Date
        end: Date
        allday: Boolean
        created_at: Date
        updated_at: Date
    }
`

export const resolvers = {
    Query: {
        event: async (obj, args, context, info) => {
            const tk_status = await token_control(args.token)
            if(tk_status){
                return db.events.findByPk(args.id)
            } else {

            }
        }
    }
}