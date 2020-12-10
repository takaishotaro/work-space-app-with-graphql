const { isAfter, isBefore } = require('validator')

const a = "2020-12-09"
const b = "09:00"
const d = new Date(`${a} ${b}`)


const date = a.toLocaleString({ timeZone: 'Asia/Tokyo' }).split(" ")
const x = isAfter("2020-12-24 22:25", "2020-12-24 08:00") && isBefore("2020-12-24 22:25", "2020-12-24 22:00")
console.log(x)

//console.log(a.toLocaleString({ timeZone: 'Asia/Tokyo' }))



//node server/schema/playing.js 