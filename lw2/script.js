var authUserData = null;
var userDatabase = []; // массив с зарегистрированными пользователями
var emailForVerification = null;
//функция регистрации
function register(email, password) {
  let key = null;
  if (validateEmailAndPassword(email, password)) {
    key = userDatabase.findIndex(
      (user) => user.email === email && user.password === password
    );
    if (key === -1) {
      userDatabase.push({ email: email, password: password });
      return true;
    }
  }
  return false;
}
//функция входа
function signIn(email, password) {
  if (validateEmailAndPassword(email, password)) {
    let number = null;
    emailForVerification = email;
    number = userDatabase.findIndex(
      (user) => user.email === email && user.password === password
    );
    if (number != -1 && userDatabase[number].password === password) {
      authUserData = userDatabase[number];
      return true;
    }
  }
  return false;
}
//проверка почты и пароля
function validateEmailAndPassword(email, password) {
  if (
    email.match(/^[\w-.]+@[\w-]+.[a-z]{2,4}$/i) !== null &&
    password.length === 6 &&
    password[0] === password[0].toUpperCase() &&
    password.match(/\d+/) !== null
  ) {
    return true;
  }
  return false;
}
//функция выхода
function signOut() {
  authUserData = null;
}
// функция восстановления пароля
function resetPassword(email, oldPassword, newPassword) {
  emailForVerification = email;
  number = userDatabase.findIndex(
    (user) => user.email === email && user.password === oldPassword
  );
  if (number === -1) {
    return false;
  } else {
    userDatabase[number].password = newPassword;
    return true;
  }
  return false;
}
//проверка авторизованости пользователя
function isAuth() {
  if (authUserData === null) {
    return false;
  } else {
    return true;
  }
}

//Валидатор

function validator(value) {
  let test = true; //поле для хранения вазвращаевомого булевого значения
  return (validation = {
    test_value: value,
    isString: function () {
      if (
        (test && typeof this.test_value === "string") ||
        this.test_value instanceof String
      ) {
        this.test = true;
        return this;
      }
      this.test = false;
      return this;
    },
    isNumber() {
      if (test && typeof this.test_value === "number") {
        this.test = true;
        return this;
      }
      this.test = false;
      return this;
    },
    isArray() {
      if (Array.isArray(this.test_value)) {
        this.test = true;
        return this;
      }
      this.test = false;
      return this;
    },
    isFloat() {
      if (
        test &&
        validator(this.test_value).isNumber() &&
        this.test_value.toString().indexOf(".") != -1
      ) {
        this.test = true;
        return this;
      }
      this.test = false;
      return this;
    },
    min(element) {
      if (test && this.test_value >= element) {
        this.test = true;
        return this;
      }
      this.test = false;
      return this;
    },
    max(element) {
      if (test && this.test_value <= element) {
        this.test = true;
        return this;
      }
      this.test = false;
      return this;
    },
    minLenght(valueArray) {
      if (test && this.test_value.length > valueArray) {
        this.test = true;
        return this;
      }
      this.test = false;
      return this;
    },
    maxLenght(valueArray) {
      if (test && this.test_value.length <= valueArray) {
        this.test = true;
        return this;
      }
      this.test = false;
      return this;
    },
    equal(validateEmailAndPasswordValue) {
      if (
        test &&
        validateEmailAndPasswordValue.toString() === this.test_value.toString()
      ) {
        this.test = true;
        return this;
      }
      this.test = false;
      return this;
    },
    isDate() {
      if (test && this.test_value.match(/^\d{1,2}\.\d{1,2}\.\d{4}$/) != null) {
        this.test = true;
        return this;
      }
      this.test = false;
      return this;
    },
    isEmail() {
      if (
        test &&
        this.test_value.match(/^[\w-.]+@[\w-]+.[a-z]{2,4}$/i) != null
      ) {
        this.test = true;
        return this;
      }
      this.test = false;
      return this;
    },
    validate() {
      return this.test;
    },
  });
}

//проверки 1 части
console.log(register("asd@gmail.com", "A1dfgh"));
console.log(signIn("asd@gmail.com", "A1dfgh"));
console.log(resetPassword("asd@gmail.com", "A1dfgh", "Df4das"));
signOut();
console.log(isAuth());
console.log(authUserData);

//проверки валидатора

console.log("\nisArray isString isNumber \n");
console.log(validator("1").isArray().validate()); // false
console.log(validator("1").isString().validate()); // true
console.log(validator("1").isNumber().validate()); // false

console.log("\nMin Max \n");
console.log(validator(10).isNumber().min(10).validate()); // true
console.log(validator(10).isNumber().min(4).max(9).validate()); // false

console.log("\nisArray equal \n");
console.log(validator([]).isArray().equal([1, 2, 3]).validate()); // false
console.log(validator([1, 2, 3]).isArray().equal([1, 2, 3]).validate()); // true

console.log("\nisString isEmail isDate \n");
console.log(validator("user@m").isString().isEmail().validate()); // false
console.log(validator("user@mail.ru").isString().isEmail().validate()); // true
console.log(validator("25.12.1993").isDate().validate()); // true
