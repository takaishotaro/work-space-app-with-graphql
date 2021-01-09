const sgMail = require('@sendgrid/mail')

sgMail.setApiKey('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')

const sendBookingConfirmEmail = (email, name, plan, date, startAt, finishAt, totalPrice) => {
    sgMail.send({
        to: email,
        from: 'takaishotaro326@gmail.com',
        subject: 'ご予約をリクエストしていただき誠にありがとうございます。',
        text: `
        ${name}様

        承認完了次第、別途メールを送らせていただきます。
        今しばらくお待ちくださいませ。

        ご予約内容
        ==========
        プラン：${plan.planName}
        ご利用予定日：${date}
        利用開始：${startAt}
        利用終了：${finishAt}
        合計金額：${totalPrice}
        ==========
        `,
    })
}

const sendApprovalEmail = (email, name, plan, date, startAt, finishAt, totalPrice) => {
    sgMail.send({
        to: email,
        from: 'takaishotaro326@gmail.com',
        subject: 'ご予約が承認されました。',
        text: `
        ${name}様

        予約が承認されました。

        ご予約内容
        ==========
        プラン：${plan.planName}
        ご利用予定日：${date}
        利用開始：${startAt}
        利用終了：${finishAt}
        合計金額：${totalPrice}
        ==========
        `
    })
}

const sendRejectEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'takaishotaro326@gmail.com',
        subject: '残念ながら予約を承認できませんでした。',
        text: `
        ${name}様

        残念ながら予約を承認できませんでした。
        またのご利用をお待ちしております。
        `
    })
}
module.exports = {
    sendBookingConfirmEmail,
    sendApprovalEmail,
    sendRejectEmail
}