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
const { sendApprovalEmail,sendBookingConfirmEmail, sendRejectEmail} = require('../services/mail')

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

                sendBookingConfirmEmail(
                    email, name, plan, date.toLocaleDateString({ timeZone: 'Asia/Tokyo' }), 
                    startAt.toLocaleString({ timeZone: 'Asia/Tokyo' }), finishAt.toLocaleString({ timeZone: 'Asia/Tokyo' }), totalPrice
                )
    
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
                const reservation = await Reservation.findById(id)
                if(reservation.approval=="承認待ち" && approval=="承認済み"){
                    console.log("pendingからapprovedの条件分岐") 
                    return Reservation.findByIdAndUpdate(id, { paymentStatus, usingStatus, approval })
                        .then(async(res)=>{
                            const plan = await Plan.findById(res.plan)
                            await sendApprovalEmail(res.email, res.name, plan, res.date, res.startAt, res.finishAt, res.totalPrice)
                            return res
                        }).catch(e=>{
                            throw new Error(e)
                        })
                }
                if(reservation.approval.toString()=="承認待ち" && approval.toString()=="却下済み"){
                    console.log("pendingからrejectedの条件分岐")
                    await Reservation.findByIdAndUpdate(id, { paymentStatus, usingStatus, approval })
                        .then(async(res)=>{
                            sendRejectEmail(res.email, res.name)
                            return res
                        }).then
                }
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