import { gql } from 'apollo-server-express'
import * as db from '../database';
import * as token_control from '../modules/token_control';

export const typeDefs = gql`
    extend type Query {
        students_status(token: String! company_id: ID!): [StudentStatus]
        
    }

    type StudentStatus {
        student_id: ID!
        company_id: ID
        class_id: ID
        complated: Int
        willstart: Int
        continuing: Int
        ev_count: Int
        total_events: Int
        inspections: Int
        noinspections: Int
        total_class_reports: Int
        course: Course
    }
`

export const resolvers = {
    Query: {
        students_status: async (obj, {company_id, token}, context, info) => {
            const tk_status = await token_control(token)
            if(tk_status){
                return await db.students_status.findAll(
                    {
                        where:
                        {
                            company_id:company_id
                        }
                    }
                )
            } else {
                throw new ApolloError("token is required",1000)
            }
        },
    },
    StudentStatus: {
        course: async ({class_id}, arg, context, info) => {
            const course = await db.classes.findByPk(class_id)
            return course
        }
    },
}