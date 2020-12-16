const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLString } = graphql;
const UserType = require('./user_type')
const CustomerType = require('./customer_type')
const ReservationType = require('./reservation_type')
const PlanType = require('./plan_type')

const mongoose = require('mongoose')
const Customer = mongoose.model('customer')
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
        dateQuery: { type: GraphQLString }
      },
      resolve(parentValue, {customerQuery, dateQuery}, req){
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
        } else if( customerQuery && dateQuery){
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
        } else {
          return Reservation.find({})
        }
      }
    },
    reservation: {
      type: ReservationType,
      resolve(parent, args, req){
        return Reservation.findOne({ id: args.id })
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
