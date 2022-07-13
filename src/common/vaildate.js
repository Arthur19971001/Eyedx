export const passwordValid = (password) => {
    const passowrdRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{10,}$/;
    var result;

    if(password !== ""){
        if(!password.match(passowrdRegex)) {
            result = "invalid";
            return result;
        } else {
            result = "valid";
            return result;
        }
    } else {
        result = "empty";
        return result;
    }
}

export const IDValid = (id) => {
    const idRegex = /^.*[A-Z]{3}[0-9]{3}$/;
    var result;

    if(id !== ""){
        if(!id.match(idRegex)) {
            result = "invalid";
            return result;
        } else {
            result = "valid";
            return result;
        }
    } else {
        result = "empty";
        return result;
    }
}