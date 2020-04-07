import { gql } from 'apollo-server-express'
import * as db from '../database';
import * as token_control from '../modules/token_control';

export const typeDefs = gql`
    extend type Query {
        students_statistics(token: String! company_id: ID!): [StudentStatistics]
        student_statistics(id: ID!): StudentStatistics
    }

    type StudentStatistics {
        student_id: ID!
        company_id: ID
        complated: Int
        willstart: Int
        continuing: Int
        total_reports: Int
    }
`

export const resolvers = {
    Query: {
        students_statistics: async (obj, {company_id, token}, context, info) => {
            const tk_status = await token_control(token)
            if(tk_status){
                return await db.students_statistics.findAll(
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
    StudentStatistics: {
         
    },
}