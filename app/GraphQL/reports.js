import { gql, ApolloError } from 'apollo-server-express'
//import { GraphQLScalarType } from 'graphql';
import * as db from '../database'
import * as token_control from '../modules/token_control'

const Op = db.Sequelize.Op;

export const typeDefs = gql`
    extend type Query {
        reports(
            token:String!,
            company_id:ID!,
            create_user_id:ID,
            student_id:ID, 
            report_type: ID, 
            course_id: ID, 
            start: Date, 
            end: Date, 
            check_id: ID,
            report_type: ID
            ): [Report]
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

                if(args.student_id){
                    where = {
                        ...where,
                        student_id:args.student_id
                    }
                }

                if(args.report_type){
                    where = {
                        ...where,
                        report_type:args.report_type
                    }
                }

                if(args.check_id){
                    where = {
                        ...where,
                        check_id:args.check_id
                    }
                }

                if(args.report_type){
                    where = {
                        ...where,
                        report_type:args.report_type
                    }
                }

                if(args.course_id){
                    let eventWhere = {
                        class_id:args.course_id
                    }
                    if(args.start&&args.end){
                        eventWhere = {
                            ...eventWhere,
                            start:{
                                [Op.between]:[args.start,args.end]
                            }
                        }
                    }
                    const events = await db.events.findAll({
                        where: eventWhere
                    })
                    
                    const events_id = events.map(e=>e.id)
                    where = {
                        ...where,
                        event_id: {
                            [Op.in]:events_id
                        }
                    }
                }
                return await db.reports.findAll({where})
            } else {
                throw new ApolloError("token is required",1000)
            }
        },
        report: async (obj, args, context, info) => {
            const tk_status = await token_control(args.token)
            if(tk_status){
                return db.reports.findByPk(args.id)
            } else {
                throw new ApolloError("token is required",1000)
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