import { gql, ApolloError } from 'apollo-server-express'
//import { GraphQLScalarType } from 'graphql';
import * as db from '../database'
import * as token_control from '../modules/token_control'

const Op = db.Sequelize.Op;

export const typeDefs = gql`
    extend type Query {
        check_list(token:String!,company_id:ID!): [CheckList]
        check(token:String!,id: ID!): CheckList
    }

    extend type Mutation {
        createCheck(token:String! company_id:ID!, name:String!, type_id:ID!,  allclass:Boolean, isrequired:Boolean, events:[ID], courses:[ID]): CheckList,
        
        updateCheck(token:String! id:ID!, company_id:ID, name:String, type_id:ID, allclass:Boolean, isrequired:Boolean): CheckList
    }

    type CheckList {
        id: ID!
        name: String
        type_id: ID
        allclass:Boolean
        isrequired: Boolean
        existevent:Boolean
        existcourse:Boolean
        events:[Event]
        events_id:[Int!]
        courses_id:[Int!]
    }
`

export const resolvers = {
    Query: {
        check_list: async (obj, args, context, info) => {
            const tk_status = await token_control(args.token)
            if(tk_status){
                return db.check_list.findAll({where:{company_id:args.company_id}})
            } else {
                throw new ApolloError("token is required",1000)
                   
            }
        },
        check: async (obj, args, context, info) => {
            const tk_status = await token_control(args.token)
            if(tk_status){
                return await db.check_list.findByPk(args.id)
            } else {
                throw new ApolloError("token is required",1000)
            }
        }
    },
    Mutation: {
        createCheck: async (obj, {token, company_id, name, type_id, allclass, isrequired}, context, info) => {
            const tk_status = await token_control(token)
            if(tk_status){
                let opt = {
                    company_id,
                    name, 
                    type_id, 
                    allclass,
                    isrequired,
                    created_at: new Date(),
                    updated_at: new Date()
                }
                const aa = await db.check_list.create(opt)
                .then(result => {
                    return result;
                  })
                  .catch(err => {
                    console.log(err);
                  });
                return aa
            } else {
                throw new ApolloError("token is required",1000)
            }
        },
        updateCheck: async (obj, args, context, info) => {
            const tk_status = await token_control(args.token)
            if(tk_status){
                let data = {} 
                Object.keys(args).map(o=>{
                    if(args[o]&&o!=="id"){
                        data = {
                            ...data,
                            [o]: args[o]
                        }
                    }
                })
                await db.check_list.update(data,
                    {
                        where: {
                            id: args.id
                        }
                    })
                  .catch(err => {
                    console.log(err);
                  });
    
                return await db.check_list.findByPk(args.id)  
            } else {
                throw new ApolloError("token is required",1000)
            }
            
        },
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
        },
        events: async (obj, args, context, info) => {
            const events_check_id = await db.event_check_list.findAll({
                where:{
                    check_list_id:obj.id
                }
            })
            const events_ids = events_check_id.map(ec=>ec.events_id)
            return await db.events.findAll({
                where:{
                    id:{
                        [Op.in]:events_ids
                    }
                }
            })
        },
        events_id: async (obj, args, context, info) => {
            const events_check_id = await db.event_check_list.findAll({
                where:{
                    check_list_id:obj.id
                }
            })
            return events_check_id.map(ec=>ec.events_id)
        },
        courses_id: async (obj, args, context, info) => {
            const events_check_id = await db.event_check_list.findAll({
                where:{
                    check_list_id:obj.id
                }
            })
            return events_check_id.map(ec=>ec.class_id)
        }
    }
}