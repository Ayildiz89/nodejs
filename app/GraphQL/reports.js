import { gql } from 'apollo-server-express'
//import { GraphQLScalarType } from 'graphql';
import * as db from '../database'
import * as token_control from '../modules/token_control'

export const typeDefs = gql`
    extend type Query {
        reports(token:String!,company_id:ID!,create_user_id:ID): [Report]
        report(token:String!,id: ID!): Report
    }

    type Report {
        id: ID!
        create_user_id: ID
        update_user_id: ID
        company_id: ID
        student_id: ID
        check_id: ID
        event_id: ID
        type_id: ID
        report_type: ID
        value: String
        student: User
        check: CheckList
        event: Event
    }
`

export const resolvers = {
    Query: {
        reports: async (obj, args, context, info) => {
            const tk_status = await token_control(args.token)
            if(tk_status){
                let where = {
                        company_id:args.company_id
                }

                if(args.create_user_id)
                {
                    where = {
                        ...where,
                        create_user_id:args.create_user_id
                    }
                }

                return db.reports.findAll(where)
            } else {

            }
        },
        report: async (obj, args, context, info) => {
            const tk_status = await token_control(args.token)
            if(tk_status){
                return db.reports.findByPk(args.id)
            } else {

            }
        }
    },
    Report: {
        student: async (obj, args, context, info) => {
            return await db.users.findByPk(obj.student_id)
        },
        check: async (obj, args, context, info) => {
            return await db.check_list.findByPk(obj.check_id)
        },
        event: async (obj, args, context, info) => {
            return await db.events.findByPk(obj.event_id)
        }
    }
}