const isValid = function(value)
{
    if(typeof value === null || typeof value === 'undefined') return false
    if(typeof value === 'string' & value.trim().length === 0) return false
    return true
}

const isValidRequestBody = function(requestBody){
    return Object.keys(requestBody).length>0
}
const validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email.trim())
};
const validatePhone = function (phone) {
    var re = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
    if (typeof (phone) == 'string') {
        return re.test(phone.trim())
    } else {
        return re.test(phone)
    }
};
module.exports={isValid,isValidRequestBody,validateEmail,validatePhone}