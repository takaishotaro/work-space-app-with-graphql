const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLBoolean,
    GraphQLInputObjectType
} = require('graphql')
    
const AuthService = require('../services/auth')

const mongoose = require('mongoose')
const Reservation = mongoose.model('reservation')
const Plan = mongoose.model('plan')

const UserType = require('./types/user_type')

const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields: {
        signup:{ 
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parentValue, { email, password }, req) {
                return AuthService.signup({ email, password, req })
            }
        },
        logout: {
            type: UserType,
            resolve(parentValue, args, req){
                const { user } = req
                req.logout()
                return user
            }
        },
        login: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parentValue, { email, password }, req ){
                return AuthService.login({ email, password, req })
            }
        },
        addReservation: {
            type: require('./types/reservation_type'),
            args: {
                email: { type: GraphQLString },
                name: { type: GraphQLString },
                phoneNumber: { type: GraphQLString },
                planId: { type: GraphQLID },
                date: { type: GraphQLString },
                startAt: { type: GraphQLString },
                finishAt: { type: GraphQLString },
                totalPrice: { type: GraphQLInt }
            },
            async resolve(parentValue, {
                email, name, phoneNumber, planId, date, startAt, finishAt, totalPrice
            }, req ){
                startAt = new Date(`${date} ${startAt}`)
                finishAt = new Date(`${date} ${finishAt}`)
                date = new Date(date)

                const plan = await Plan.findById(planId)
                
                return (new Reservation({ 
                    email, name, phoneNumber, plan,
                    date, startAt, finishAt, totalPrice
                })).save()

            }
        },
        addPlan: {
            type: require('./types/plan_type'),
            args: {
                planName: { type: GraphQLString },
                dynamicPricing: { type: GraphQLBoolean },
                pricePerHour: { type: GraphQLInt },
                maxPrice:{ type: GraphQLInt },
                minHour: { type: GraphQLInt },
                staticPrice: { type: GraphQLInt }
            },
            resolve(parent, {planName, dynamicPricing, pricePerHour, staticPrice, maxPrice, minHour}){
                if(dynamicPricing){
                    if( pricePerHour == null ){
                        throw new Error('”1時間あたりの価格”が未入力です。')
                    }
                } else {
                    if( staticPrice == null ){
                        throw new Error('"1日の価格”が未入力です。')
                    }
                }

                return (new Plan({ planName, dynamicPricing, pricePerHour, staticPrice, maxPrice, minHour })).save()
            }
        }
    }
})

module.exports = mutation