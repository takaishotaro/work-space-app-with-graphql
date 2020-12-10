const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
} = require('graphql')
    
const AuthService = require('../services/auth')

const mongoose = require('mongoose')
const Customer = mongoose.model('customer')

const UserType = require('./types/user_type')
const CustomerType = require('./types/customer_type')

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
                totalPrice: { type: GraphQLInt },
                date: { type: GraphQLString },
                startAt: { type: GraphQLString },
                finishAt: { type: GraphQLString }
            },
            resolve(parentValue, {
                email, name, phoneNumber, totalPrice, date, startAt, finishAt
            }, req ){
                //utcに変換します。formatは”2020-12-09 10:00:02”
                startAt = new Date(`${date} ${startAt}`)
                finishAt = new Date(`${date} ${finishAt}`)
                date = new Date(date)
                
                return (new Customer({ 
                    email, name, phoneNumber, date,　startAt, finishAt,totalPrice 
                })).save()


            }
        }
    }
})

module.exports = mutation