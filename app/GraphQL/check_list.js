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
        existevent:Boolean
        existcourse:Boolean
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
                return await db.check_list.findByPk(args.id)
            } else {

            }
        }
    },
    CheckList: {
        existevent: async (obj, args, context, info) => {
            const events_check_id = await db.event_check_list.findAll({
                where:{
                    check_list_id:obj.id
                }
            })

            const events_ids = events_check_id.map(ec=>ec.events_id)
            const status = events_ids.filter(i=>i!==null)
            return status.length?true:false
        },
        existcourse:  async (obj, args, context, info) => {
            const events_check_id = await db.event_check_list.findAll({
                where:{
                    check_list_id:obj.id
                }
            })
            const class_ids = events_check_id.map(ec=>ec.class_id)
            const status = class_ids.filter(i=>i!==null)
            return status.length?true:false
        }
    }
}