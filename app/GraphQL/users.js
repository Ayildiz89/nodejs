import { gql, ApolloError } from 'apollo-server-express'
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
        id: ID
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
        companies: [Company]
        roles(company_id: ID!):[Int]
        user_other_data(company_id: ID!,form_id:ID, form_ids:[ID]): [UserOtherData]
        events(class_id: ID, company_id: ID!, start: Date, end:Date): [Event]
        events_as_teacher(class_id: ID, company_id: ID!, start: Date, end:Date): [Event]
        reports(company_id: ID!): [Report]
        courses(company_id: ID!, nofeature:Boolean): [Course]
        course_count(company_id: ID!): [Int]
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
                throw new ApolloError("token is required",1000)
                //throw 'You must be logged in';
            }
        },
        user: async (obj, args, context, info) => {
            const tk_status = await token_control(args.token)
            console.log(tk_status)
            if(tk_status){
                return db.users.findByPk(args.id)
            } else {
                throw new ApolloError("token is required",1000)
            }
        }
    },
    User: {
        companies: async (obj, args, context, info) => {
            const company_ids = await db.user_company.findAll({where:{user_id:obj.dataValues.id}})
            const ids = company_ids.map(c_ids=>c_ids.dataValues.id)
            
            return await db.company.findAll({
                where:{
                    id:{[Op.in]:ids}
                }
            })
        },
        roles: async (obj, args, context, info) => {
            const company_ids = await db.user_company.findAll({
                where:{
                    user_id:obj.id,
                    company_id:args.company_id
                }})
            return company_ids.map(c_ids=>c_ids.dataValues.role_id)
        },
        user_other_data: async (obj, args, context, info) => {
            let where = {
                company_id:args.company_id,
                user_id:obj.id
            }
            if(args.form_id){
                where = {
                    ...where,
                    form_id:args.form_id
                }
            }
            return await db.user_other_data.findAll({where})
            
        },
        events: async (obj, args, context, info) => {
            
            const events_id = await db.event_users.findAll({
                where:{
                    user_id:obj.id
                }
            })
            const ids = events_id.map(e=>e.event_id)
            let where = {
                company_id:args.company_id,
                id:{
                    [Op.in]:ids
                }
            }
            if(args.start&&args.end){
                where = {
                    ...where,
                    start:{
                        [Op.between]:[new Date(args.start), new Date(args.end)]
                    }
                }
            }
            //console.log("-----------",new Date(), new Date(args.start), start)
            if(args.class_id){
                where = {
                    ...where,
                    class_id:args.class_id
                }
            }
            return await db.events.findAll({where})
        },
        events_as_teacher: async (obj, args, context, info) => {
            let where = {
                teacher_id:obj.id,
                company_id:args.company_id
            }
            if(args.start&&args.end){
                where = {
                    ...where,
                    start:{
                        [Op.between]:[new Date(args.start), new Date(args.end)]
                    }
                }
            }
            //console.log("-----------",new Date(), new Date(args.start), start)
            if(args.class_id){
                where = {
                    ...where,
                    class_id:args.class_id
                }
            }
            return await db.events.findAll({where})
        },
        reports: async (obj, args, context, info) => {
            return await db.reports.findAll({
                where:{
                    company_id:args.company_id,
                    student_id:obj.id
                }
            })
        },
        courses: async (obj, args, context, info) => {
            const events_user = await db.event_users.findAll({
                where:{
                    user_id:obj.id
                }
            })
            const events_id = events_user.map(e=>e.event_id)
            let where = {
                company_id:args.company_id,
                id:{
                    [Op.in]:events_id
                }
            }
            if(args.nofeature){
                where = {
                    ...where,
                    start:{
                        [Op.lt]:new Date()
                    }
                }
            }
            const events = await db.events.findAll({where})
            
            const classes_id = events.map(e=>e.class_id)
            
            let courses_id = []
            classes_id.map(e=>{
                if(courses_id.findIndex(c=>c===e)==-1){
                    courses_id.push(e)
                }
            })
            return await db.classes.findAll({
                where:{
                    id:{
                       [Op.in]:courses_id 
                    }
                },
                order: [["created_at","DESC"]]
            })
        },
        course_count: async (obj, args, context, info) => {
            const events_user = await db.event_users.findAll({
                where:{
                    user_id:obj.id
                }
            })
            const events_id = events_user.map(e=>e.event_id)
            const events = await db.events.findAll({
                where:{
                    company_id:args.company_id,
                    id:{
                        [Op.in]:events_id
                    }
                }
            })
            const classes_id = events.map(e=>e.class_id)
            
            let courses_id = []
            classes_id.map(e=>{
                if(courses_id.findIndex(c=>c===e)==-1){
                    courses_id.push(e)
                }
            })
            const courses = await db.classes.findAll({
                where:{
                    id:{
                       [Op.in]:courses_id 
                    }
                }
            })
            return courses.length
        }
    }
}
