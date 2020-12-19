const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLString, GraphQLBoolean } = graphql;
const UserType = require('./user_type')
const {ReservationType, UsingStatusType, ApprovalType} = require('./reservation_type')
const PlanType = require('./plan_type')

const mongoose = require('mongoose')
const Reservation = mongoose.model('reservation')
const Plan = mongoose.model('plan')

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      resolve(parentValue, args, req){
        return req.user;
      }
    },
    reservations: {
      type: new GraphQLList(ReservationType),
      args: {
        customerQuery: { type: GraphQLString },
        dateQuery: { type: GraphQLString },
        usingStatusQuery: { type: UsingStatusType },
        paymentStatusQuery: { type: GraphQLBoolean },
        approvalQuery: { type: ApprovalType }
      },
      resolve(parentValue, {customerQuery, dateQuery, usingStatusQuery, paymentStatusQuery, approvalQuery}, req){
        if( customerQuery && dateQuery && usingStatusQuery && paymentStatusQuery && approval){
          dateQuery = new Date(dateQuery)
          return Reservation.find({
            $and: [{
              $or: [
                {name : {$regex : customerQuery}} , 
                {email : {$regex : customerQuery}},
                {phoneNumber : {$regex : customerQuery}}
              ]
            },{
              date: dateQuery
            }
          ]
          })
        } 
        if( customerQuery ){
          return Reservation.find({
            $or: [
              {name : {$regex : customerQuery}} , 
              {email : {$regex : customerQuery}},
              {phoneNumber : {$regex : customerQuery}}
            ]
          })
        } else if ( dateQuery ){
          dateQuery = new Date(dateQuery)
          return Reservation.find({ date: dateQuery })
        } else {
          return Reservation.find({})
        }
      }
    },
    reservation: {
      type: ReservationType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, {id}, req){
        return Reservation.findById(id)
      }
    },
    plans: {
      type: new GraphQLList(PlanType),
      resolve(parentValue, args, req){
        return Plan.find({})
      }
    }
  }
});

module.exports = RootQueryType;
