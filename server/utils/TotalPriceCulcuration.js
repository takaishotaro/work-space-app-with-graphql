exports.TotalPriceCulcuration = ( plan , startAt, finishAt) => {
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