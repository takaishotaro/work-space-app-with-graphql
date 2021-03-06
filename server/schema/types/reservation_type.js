const graphql = require('graphql')
const { 
    GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt,
    GraphQLBoolean, GraphQLEnumType
} = graphql
const mongoose = require('mongoose')
const Reservation = mongoose.model('reservation')

const UsingStatusType = new GraphQLEnumType({
    name: 'UsingStatusType',
    values: {
      notArrived: { value: "未到着" },
      using: { value: "使用中" },
      finished: { value: "終了" }
    }
  });

const ReservationType = new GraphQLObjectType({
    name: 'ReservationType',
    fields: {
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        name: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        plan: { 
            type: require('./plan_type'),
            resolve(parentValue){
                return Reservation.findById(parentValue.id).populate('plan')
                    .then(res => {
                        console.log(res)
                        return res.plan
                    });
            }
        },
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
        usingStatus: { type: UsingStatusType }
    }
})

module.exports = ReservationType