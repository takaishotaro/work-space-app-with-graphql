const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLBoolean,
} = require('graphql')
    
const AuthService = require('../services/auth')

const mongoose = require('mongoose')
const Reservation = mongoose.model('reservation')
const Plan = mongoose.model('plan')

const UserType = require('./types/user_type')
const { ReservationType, UsingStatusType, ApprovalType } = require('./types/reservation_type')

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
            type: ReservationType,
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
        editReservation: {
            type: ReservationType,
            args: {
                id: { type: GraphQLID },
                paymentStatus: { type: GraphQLBoolean },
                usingStatus: { type: UsingStatusType },
                approval: { type: ApprovalType }
            },
            async resolve(parentValue, { id, paymentStatus, usingStatus, approval }, req ){                
                return Reservation.findByIdAndUpdate(id, { paymentStatus, usingStatus, approval })
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
                    if(!pricePerHour){throw new Error('”1時間あたりの価格”が未入力です。')}
                } else {
                    if(!staticPrice){throw new Error('"1日の価格”が未入力です。')}
                }
                return (new Plan({ planName, dynamicPricing, pricePerHour, staticPrice, maxPrice, minHour })).save()
            }
        },
        editPlan: {
            type: require('./types/plan_type'),
            args: {
                id:{ type: GraphQLID },
                planName: { type: GraphQLString },
                dynamicPricing: { type: GraphQLBoolean },
                pricePerHour: { type: GraphQLInt },
                maxPrice:{ type: GraphQLInt },
                minHour: { type: GraphQLInt },
                staticPrice: { type: GraphQLInt }
            },
            resolve(parent, {id, planName, dynamicPricing, pricePerHour, staticPrice, maxPrice, minHour}){
                if(dynamicPricing){
                    if(!pricePerHour){throw new Error('”1時間あたりの価格”が未入力です。')}
                } else {
                    if(!staticPrice){throw new Error('"1日の価格”が未入力です。')}
                }
                return Plan.findByIdAndUpdate(id,{
                    planName, dynamicPricing, pricePerHour, staticPrice, maxPrice, minHour
                })
            }
        }
    }
})

module.exports = mutation