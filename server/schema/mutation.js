const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLInputObjectType
} = require('graphql')
    
const AuthService = require('../services/auth')

const mongoose = require('mongoose')
const Customer = mongoose.model('customer')

const UserType = require('./types/user_type')
const CustomerType = require('./types/customer_type')
const ReservationInputType = require('./types/reservation_input')

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
        addCustomer: {
            type: CustomerType,
            args: {
                email: { type: GraphQLString },
                name: { type: GraphQLString },
                phoneNumber: { type: GraphQLString },
                reservation: { type: ReservationInputType}
            },
            resolve(parentValue, {
                email, name, phoneNumber, reservation
            }, req ){
                startAt = new Date(`${date} ${startAt}`)
                finishAt = new Date(`${date} ${finishAt}`)
                date = new Date(date)
                
                return (new Customer({ 
                    email, name, phoneNumber, reservation
                })).save()


            }
        }
    }
})

module.exports = mutation