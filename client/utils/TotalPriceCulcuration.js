import { isBefore, isAfter } from 'validator'

export const TotalPriceCulcurationForBooking = ( plan , startAt, finishAt ) => {
    startAt = new Date(`2020-12-25 ${startAt}`)
    finishAt = new Date(`2020-12-25 ${finishAt}`)

    const businessHour = (time) => {
        if(
            isAfter(
                time.toLocaleString({ timeZone: 'Asia/Tokyo' }), `2020-12-25 08:00`
            ) && isBefore(
                time.toLocaleString({ timeZone: 'Asia/Tokyo' }), `2020-12-25 22:00`
            )
        ){
            return true
        } else {
            return false
        }
    }

    if(!businessHour(startAt) || !businessHour(finishAt)){
        alert('営業時間外です。')
        return null
    }

    if((finishAt - startAt)<0){
        alert('ご利用時間を正しくご入力ください。')
        return null
    }

    const utilityMinutes = (finishAt - startAt) / 60000
    const utilityHours=Math.ceil(utilityMinutes/60)

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