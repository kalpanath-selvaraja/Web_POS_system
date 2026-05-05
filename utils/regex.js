
const email_regex = new RegExp("^((?!\\.)[\\w\\-_.]*[^.])(@\\w+)(\\.\\w+(\\.\\w+)?[^.\\W])$");
const phone_regex = new RegExp("^[0]{1}[7]{1}[01245678]{1}[0-9]{7}$");

const check_email = (email) => {
    return email_regex.test(email);
}

const check_phone = (phone) => {
    return phone_regex.test(phone);
}

export {check_phone, check_email};