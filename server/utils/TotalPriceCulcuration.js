exports.TotalPriceCulcuration = ( plan , startAt, finishAt ) => {
    startAt = new Date(startAt)
    finishAt = new Date(finishAt)

    const utilityMinutes = (finishAt - startAt) / 60000
    const utilityHours=Math.ceil(utilityMinutes/60)

    if( utilityHours < plan.minHour ){
        return `${minHour}時間以上からのご利用です。`
    }

    if(plan.dynamicPricing){
        const totalPrice = plan.pricePerHour * utilityHours
        if( totalPrice > plan.maxPrice ){
            return plan.maxPrice
        } else {
            return totalPrice
        }
    } else {
        return plan.staticPrice
    }
}