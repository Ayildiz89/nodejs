


const mail1Button = ({
    title,
    text,
    buttonUrl,
    buttonText,
}) => {
    return `<h1>${title}</h1><p>${text}</p><span><a href="${buttonUrl}">${buttonText}</a></span>`
}
module.exports = {
    mail1Button
}