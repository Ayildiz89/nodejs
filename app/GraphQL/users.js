import { gql } from 'apollo-server-express'
//import { GraphQLScalarType } from 'graphql';
import * as db from '../database'
import * as token_control from '../modules/token_control'




export const typeDefs = gql`
    extend type Query {
        users(token:String!,company_id:ID!, role_id:ID, search:String): [User]
        user(token:String!,id: ID!): User
    }

    scalar Date

    type User {
        id: ID!
        first_name: String
        last_name: String
        email: String
        verified_at: Date
        is_verified: Boolean
        birthday: Date
        gender: Int
        tel: String
        address: String
        created_at: Date
        updated_at: Date
        country: String
        city: String
        postcode: String
        street: String
        houseno: String
        salerate: String
        lang: String
    }
`
const Op = db.Sequelize.Op;

export const resolvers = {
    Query: {
        users: async (obj, args, context, info) => {
            const tk_status = await token_control(args.token)
            if(tk_status){
                const where = {
                    where:{company_id:args.company_id}
                }
                if(args.role_id){
                    where.where={
                        ...where.where,
                        role_id:args.role_id
                    }
                }

                

                const ids = (await db.user_company.findAll(where)).map(uc=>uc.user_id)
                console.log(ids)
                const where2 = {
                    where:{id:{[Op.in] : ids}}
                }

                if(args.search){
                    where2.where={
                        ...where2.where,
                        [Op.or]: [
                            {
                                first_name: {
                                    [Op.like]: `%${args.search}%`
                                }
                            },{
                                last_name: {
                                    [Op.like]: `%${args.search}%`
                                }
                            }
                        ]
                            
                    }
                }

                
                //console.log(where2)
                return db.users.findAll({...where2})
            } else {
                return {
                    data:{trans_tag:{
                        type:0,
                        tag:"global"
                    }}
                }
                //throw 'You must be logged in';
            }
        },
        user: async (obj, args, context, info) => {
            const tk_status = await token_control(args.token)
            if(tk_status){
                return db.users.findByPk(args.id)
            }
        }
    },
    User: {
        company: async (obj, args, context, info) => {

        }
    }
}
