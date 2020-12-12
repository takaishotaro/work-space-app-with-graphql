const { isAfter, isBefore } = require('validator')

const a = new Date("2020-12-9 9:00:00")
const b = new Date('2020-12-9 12:30:00')


const dateA = a.toLocaleString({ timeZone: 'Asia/Tokyo' })
const dateB = b.toLocaleString({ timeZone: 'Asia/Tokyo' })

const a1 = new Date(dateA)
const b1 = new Date(dateB)

const plan = {
    planName: "1時間500円プラン",
    dynamicPricing: true,
    pricePerHour: 500,
}

const TotalPriceCulcuration = ( plan , startAt, finishAt) => {
    startAt = new Date(startAt)
    finishAt = new Date(finishAt)

    const utilityMinutes = (finishAt - startAt) / 60000
    const utilityHours=Math.ceil(utilityMinutes/60)

    if(plan.dynamicPricing){
        return plan.pricePerHour * utilityHours
    } else {
        return plan.staticPrice
    }
}

console.log(TotalPriceCulcuration( plan, dateA, dateB))

//console.log(a.toLocaleString({ timeZone: 'Asia/Tokyo' }))



//node server/schema/playing.js 