const graphql = require('graphql')
const { 
    GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt,
    GraphQLBoolean, GraphQLEnumType
} = graphql
const PlanType = require('./plan_type')

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
        customer: { 
            type: require('./customer_type'),
            resolve(parentValue){
                return Reservation.findById(parentValue.id).populate('customer')
                    .then(res => {
                        console.log(res)
                        return res.customer
                    });
            }
        },
        plan: { 
            type: require('./plan_type'),
            resolve(parentValue){
                return Reservation.findById(parentValue).populate('plan')
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