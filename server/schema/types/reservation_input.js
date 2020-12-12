const graphql = require('graphql')
const { 
    GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt,
    GraphQLBoolean, GraphQLInputObjectType
} = graphql

const mongoose = require('mongoose')
const Reservation = mongoose.model('reservation')

const ReservationInputType = new GraphQLInputObjectType({
    name: 'ReservationInputType',
    fields: {
        id: { type: GraphQLID },
        customer: { type: GraphQLID },
        plan: { type: GraphQLID },
        date: { 
            type: GraphQLString,
            // resolve(parent, args, ctx, info){
            //     return new Date(parent.date)
            // }
        },
        startAt: { 
            type: GraphQLString,
            // resolve(parent, args, ctx, info){
            //     return new Date(parent.date)
            // }
        },
        finishAt: { 
            type: GraphQLString,
            // resolve(parent, args, ctx, info){
            //     return new Date(parent.date)
            // }
        },
        totalPrice: { type: GraphQLInt }
    }
})

module.exports = ReservationInputType
