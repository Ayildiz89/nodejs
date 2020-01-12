import { gql } from 'apollo-server-express'
import * as db from '../database'
import * as token_control from '../modules/token_control'


const Op = db.Sequelize.Op;

export const typeDefs = gql`
    extend type Query {
        events(token:String! class_id: ID, company_id: ID): [Event]
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
        course: Course
        students: [User]
        teacher: User
        lesson: Lesson
        classroom: Classroom
        checklist: [CheckList]
    }
`

export const resolvers = {
    Query: {
        event: async (obj, args, context, info) => {
            const tk_status = await token_control(args.token)
            if(tk_status){
                return await db.events.findByPk(args.id)
            } else {

            }
        },
        events: async (obj, args, context, info) => {
            const tk_status = await token_control(args.token)
            if(tk_status){
                return await db.events.findAll({
                    where:{                        
                        company_id:args.company_id
                    }
                })
            } else {

            }
        }
    },
    Event: {
        course: async (obj, args, context, info) => {
            return await db.classes.findByPk(obj.class_id)
        },
        students: async (obj, args, context, info) => {
            const users_id = await db.event_users.findAll({where:{id:obj.id}})
            const ids = users_id.map(u=>u.dataValues.user_id)
            
            return db.users.findAll({
                where:{
                    id:{
                        [Op.in]:ids
                    }
                }
            })
        },
        teacher: async (obj, args, context, info) => {
            return await db.users.findByPk(obj.teacher_id)
        },
        lesson: async (obj, args, context, info) => {
            return await db.lesson.findByPk(obj.lesson_id)
        },
        classroom: async (obj, args, context, info) => {
            return await db.classroom.findByPk(obj.teacher_id)
        },
        checklist: async (obj, args, context, info) => {
            const checks_id = await db.event_check_list.findAll({
                where:{
                    events_id:obj.id
                }
            })
            const ids = checks_id.map(c=>c.dataValues.check_list_id)
            return await db.check_list.findAll({
                where:{
                    [Op.or]:[
                        {
                            id:
                            {
                                [Op.in]:ids
                            }
                        },
                        {
                            allclass: 1
                        }
                    ]
                }
            })
        },
    }
}