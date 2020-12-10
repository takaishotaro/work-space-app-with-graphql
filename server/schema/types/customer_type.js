const graphql = require('graphql')
const { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLBoolean
} = graphql
const graphqlIsoDate = require('graphql-iso-date')
const {
    GraphQLDate,
    GraphQLTime,
    GraphQLDateTime
} = graphqlIsoDate

const CustomerType = new GraphQLObjectType({
    name: 'CustomerType',
    fields: {
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        name: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        date: { 
            type: GraphQLString,
            resolve(parent, args, ctx, info){
                return parent.date.toLocaleDateString({ timeZone: 'Asia/Tokyo' })
            }
        },
        startAt: { 
            type: GraphQLString,
            resolve(parent, args, ctx, info){
                return parent.startAt.toLocaleString({ timeZone: 'Asia/Tokyo' })
            }
        },
        finishAt: { 
            type: GraphQLString,
            resolve(parent, args, ctx, info){
                return parent.finishAt.toLocaleString({ timeZone: 'Asia/Tokyo' })
            }
        },
        totalPrice: { type: GraphQLInt },
        paymentStatus: { type: GraphQLBoolean },
        usingStatus: { type: GraphQLString }
    }
})

module.exports = CustomerType