import { gql, ApolloError } from 'apollo-server-express'
//import { GraphQLScalarType } from 'graphql';
import * as db from '../database'
import * as token_control from '../modules/token_control';
import verifications_code from '../models/verifications_code';
import createVirificationCode from '../modules/createVirificationCode';
const { sendMail } = require('../modules/sendMail')



const { QueryTypes } = require('sequelize');


export const typeDefs = gql`

    extend type Query {

        users(token:String!,company_id:ID!, role_id:ID, search:String, ids:[ID]): [User]
        user(token:String!,id: ID, company_id:ID, email: String): User

        current_student_count(token:String, company_id:ID): Int
        current_teacher_count(token:String, company_id:ID): Int
        student_reports(user_id:ID!, company_id:ID!, token:String!):[UserReport]
    }

    scalar Date


    extend type Mutation {
        createUser(
            token:String
            company_id: ID
            role_id: ID!
            userData:UserData
            form: [Form_]
            emailsend: Boolean
            ): User,
        deleteUser(token:String!,id: ID!):Boolean,
        updateUser(token:String
            id: ID!
            company_id: ID!
            userData:UserUpdateData!
            form: [Form_]
            emailsend: Boolean):User
        _createVerificationCode(token:String, user_id:ID):Boolean
    }

    input UserData {
        first_name: String!
        last_name: String!
        email: String
        birthday: Date
        gender: Int
        tel: String
        address: String
        country: String
        city: String
        postcode: String
        street: String
        houseno: String
        salerate: String
        lang: String
    }

    input UserUpdateData {
        first_name: String
        last_name: String
        email: String
        birthday: Date
        gender: Int
        tel: String
        address: String
        country: String
        city: String
        postcode: String
        street: String
        houseno: String
        salerate: String
        lang: String
    }

    input Form_ {
        form_id:ID!,
        value:String
    }


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
        course_count(company_id: ID!): CourseCount
        students_statistics(company_id: ID!): StudentStatistics
        student_status(company_id: ID!, continuing: Boolean, willstart: Boolean): [StudentStatus]
    }

    type CourseCount {
        all: Int,
        willstart: Int,
        continuing: Int,
        complated: Int
    }


    type UserReport {
        class_id: ID,
        value: String,
        type_id: ID,
        check_id: ID,
        check_name: String,
        point: Date,
        class_name: String
    }

`
const Op = db.Sequelize.Op;

export const resolvers = {
    Query: {
        users: async (obj, args, context, info) => {
            const tk_status = await token_control(args.token, args.company_id)
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
                let ids;
                if(args.ids){
                    ids=args.ids
                } else {
                    ids = (await db.user_company.findAll(where)).map(uc=>uc.user_id)
                }
                
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
        user: async (obj, {id, email, company_id, token}, context, info) => {
            const tk_status = await token_control(token, company_id)
            if(tk_status){
                if(email){
                    let f_email;
                    await db.users.findOne({
                        where: {
                            email:email
                        }
                    }).then(res=>{
                        if(res) f_email = res;
                        else throw new ApolloError("User id not found", 2003);
                    }).catch(err=>{
                        throw new ApolloError(err)
                    })
                    if(f_email)
                    return f_email
                } else 
                return await db.users.findByPk(id)
            } else {
                throw new ApolloError("token is required",1000)
            }
        },
        current_student_count: async (obj, args, context, info) => {
            const tk_status = await token_control(args.token)
            console.log(tk_status)
            if(tk_status){
                let count=1;
                await db.sequelize.query(`CALL sp_current_students_count(${args.company_id}, 20)` , {
                    plain: false,
                    raw: false,
                    type: QueryTypes.SELECT
                  })
                  .then(res=>
                    {
                        //console.log(res[0][0].user_count)
                        count = res[0][0].user_count;
                    }
                    )
                  .catch(err=>console.log("ERRRRRR",err))
                return count
            } else {
                throw new ApolloError("token is required",1000)
            }
        },
        current_teacher_count: async (obj, args, context, info) => {
            const tk_status = await token_control(args.token)
            console.log(tk_status)
            if(tk_status){
                let count=1;
                await db.sequelize.query(`CALL sp_current_teacher_count(${args.company_id}, 20)` , {
                    plain: false,
                    raw: false,
                    type: QueryTypes.SELECT
                  })
                  .then(res=>
                    {
                        //console.log(res[0][0].user_count)
                        count = res[0][0].user_count;
                    }
                    )
                  .catch(err=>console.log("ERRRRRR",err))
                return count
            } else {
                throw new ApolloError("token is required",1000)
            }
        },
        student_reports: async (obj, args, context, info) => {
            const tk_status = await token_control(args.token)
            console.log(tk_status)
            if(tk_status){
                const data = await db.sequelize.query(`CALL sp_user_reports(${args.company_id}, ${args.user_id})`)
                  .then(res=>
                    {
                        return res
                    }
                    )
                  .catch(err=>console.log("ERRRRRR",err))
                return data
            } else {
                throw new ApolloError("token is required",1000)
            }
        }
    },
    Mutation: {
        _createVerificationCode: async (obj, args, context, info) => {
            console.log("---------------->",args.token)
            return createVirificationCode(args.token,args.user_id)
        },
        createUser: async (obj, {
            token,
            company_id,
            emailsend=true,
            userData,
            role_id=5,
            form=[],
        }, context, info) => {
            const tk_status = await token_control(token)
            if(tk_status){
                if(userData.email){
                    const u = await db.users.findOne({where:{email:userData.email}})
                    if(u){
                        throw new ApolloError("Email is exist",2005,{messageType:2})
                    }

                    if(emailsend){
                        sendMail({
                            title: "deneme",
                            to:userData.email,
                            from: "register@educsys.de",
                        })
                    }
                }
                const user = await db.users.create(userData)
                .then(result=>result)
                .catch(err=>{
                    throw new ApolloError(err,2001,{messageType:2})
                });
                
                if(form.length)
                {
                    const indata = form.map(d=>{
                        return {
                            company_id,
                            user_id:user.id,
                            form_id: d.form_id,
                            other_data: d.value
                        }
                    })
                    const user_other_data = await db.user_other_data.bulkCreate(indata).then(res=>res).catch(err=>{
                         console.log("ERRRRRRRRRR",err)
                        db.users.destroy({where:{id:user.id}})
                        throw new ApolloError(err,2001,{messageType:2})
                    })
                }

                const user_company = await db.user_company.create({
                    company_id,
                    user_id: user.id,
                    role_id
                }).then(res=>res).catch(err=>{
                    console.log("ERRRRRRRRRR",err)
                    db.users.destroy({where:{id:user.id}})
                    throw new ApolloError(err,2001,{messageType:2})
                })
                return user
            } else {
                throw new ApolloError("token is required",1000)
            }
        },
        updateUser: async (obj, {
            token,
            id,
            company_id,
            emailsend=false,
            userData,
            form=[],
        }, context, info) => {
            const tk_status = await token_control(token)
            if(tk_status){
                const user = await db.users.findByPk(id)
                //console.log("-------->",user)
                if(user){
                    let updatedUser;
                     await user.update(userData).then((uu)=>
                     {
                         updatedUser = uu
                     }
                     ).catch((err)=>console.log("-E-R-R-O-R------>",err))
                    console.log("---------->!",form)
                    if(form.length)
                    {
                        const indata = form.map(d=>{
                            return {
                                company_id,
                                user_id:user.id,
                                form_id: d.form_id,
                                other_data: d.value
                            }
                        })

                        // DÜZELT -------------
                        // Daha iyi nasil yapilabilir.
                        const ids = indata.map(dd=>dd.form_id)
                        db.user_other_data.destroy(
                            {
                                where:{
                                    form_id:{[Op.in]:ids},
                                    user_id:id
                                }
                            }).then(res=>console.log(res)).catch(err=>console.log(err))
                        const user_other_data = await db.user_other_data.bulkCreate(indata).then(res=>res).catch(err=>{
                            console.log("ERRRRRRRRRR",err)
                            //db.users.destroy({where:{id:user.id}})
                            throw new ApolloError(err,2001,{messageType:2})
                        })
                    }
                    return updatedUser;
                } else {
                    throw new ApolloError("User is not found", 2003,{messageType:2})
                }
            } else {
                throw new ApolloError("token is required",1000)
            }
        },
        deleteUser: async (obj, {token, id}, context, info) => {
            const tk_status = await token_control(token)
            if(tk_status){
                const user = await db.users.findByPk(id)
                if(user){
                    db.users.destroy({where:{id}}).then(res=>{}).catch(err=>{
                        console.log(err)
                        throw new ApolloError(err, 0,{messageType:2})
                    })
                    db.event_users.destroy({where:{user_id:id}}).catch(err=>console.error(err))
                    db.user_company.destroy({where:{user_id:id}}).catch(err=>console.error(err))
                    db.user_other_data.destroy({where:{user_id:id}}).catch(err=>console.error(err))
                    //db.user_settings.destroy({where:{user_id:id}}).catch(err=>console.error(err))
                    db.reports.destroy({where:{srudent_id:id}})
                    return true
                } else {
                    throw new ApolloError("User is not found", 2003,{messageType:2})
                }
            }
            else {
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
                order: [
                    ['class_id', 'asc'],
                    ['start', 'asc'], 
                ],
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
            let courses = await db.classes.findAll({
                where:{
                    id:{
                       [Op.in]:courses_id 
                    }
                }
            })
            const courses_status = courses.map(c=>{
                const course_events = events.filter(e=>e.class_id===c.id)
                let status;
                //0:complated, 1: contuning, 2: willstart
                const first_event_start = course_events[0].start
                const last_event_start = course_events[course_events.length-1].start
                if(new Date(last_event_start)<new Date()) {
                    status = 0;
                } else if(first_event_start<=new Date()&&last_event_start>=new Date()) {
                    status = 1;
                } else {
                    status = 2;
                }
                return status
                
            })
            const res = {
                all: courses_status.length,
                complated: courses_status.filter(s=>s===0).length,
                continuing: courses_status.filter(s=>s===1).length,
                willstart: courses_status.filter(s=>s===2).length
            }
            return res
        },
        students_statistics: async ({id}, {company_id}, context, info) => {
            return await db.students_statistics.findOne({
                where:{
                    company_id,
                    student_id:id
                }
            })
        },
        student_status: async ({id}, {company_id, continuing=false, willstart=false}, context, info) => {
            let where = {
                company_id,
                student_id:id
            }
            if(continuing&&!willstart) {
                where = {
                    ...where,
                    continuing:true
                }
            }
            if(willstart&&!continuing) {
                where = {
                    ...where,
                    willstart:true
                }
            }
            if(continuing&&willstart){
                where = {
                    ...where,
                    [Op.or]:[
                        {
                            continuing:true
                        },
                        {
                            willstart:true
                        }
                    ]
                }
            }
            const status =  await db.students_status.findAll({
                where
            })
            return status
        },
        
    }
}
