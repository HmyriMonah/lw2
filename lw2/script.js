var authUserData = null; 
var userDatabase = [];  // массив с зарегистрированными пользователями
let key=null;
//функция регистрации
function register(email, password) {
  if(check(email,password)) {
    key=Search(email);
    if(key!=-1){
      userDatabase.push({email:email, password:password});
      return true;
    }
  }
  return false;
}
//функция входа
function signIn(email, password) {
  if(check(email,password)) {
    let number=null;
    number=Search(email);
    if(number!=-1) {
      if(userDatabase[number].password==password) {
        authUserData=userDatabase[number];
        return true;
      }
    }
  }
  return false;
}
//проверка почты и пароля 
function check(email,password) {
  if (email.match(/^[\w-.]+@[\w-]+.[a-z]{2,4}$/i)!=null) {
    if(password.length==6 && password[0]==password[0].toUpperCase() && password.match(/\d+/)!=null) {
      return true;
    }
  }
  return false;
}
//функция выхода
function signOut() {
  authUserData=null;
}
// функция восстановления пароля
function resetPassword(email, oldPassword, newPassword) {
  number=Search(email);
  if(number==-1) {
    return false;
  }else {
    if(userDatabase[number].password==oldPassword) {
      userDatabase[number].password=newPassword;
      return true;
    }
  }
  return false;
}
//проверка авторизованости пользователя
function isAuth() {
  if(authUserData==null) {
    return false;
  }else {
    return true;
  }
}
//функция поиска пользователя в массиве
function Search(email) {
  for(let i=0;i < userDatabase.length;i++) {
    if(userDatabase[i].email==email) {
      number=i;
      return number;
    }
    return -1
  }
}

//Валидатор

function validator(value) {
  let test=true;//поле для хранения вазвращаевомого булевого значения 
  return  vall = {
    test_value: value,
    isString: function() {
      if(test){
        if (typeof this.test_value === "string" || this.test_value instanceof String) {
          this.test = true;
          return this;
        }
        this.test = false;
        return this;
      }else {
        return this;
      }
    },
    isNumber() {
      if(test){
        if (typeof this.test_value=="number") {
          this.test = true;
          return this;
        }
        this.test = false;
        return this;
      }else{
        return false;
      }
    },
    isArray() {
      if(test){
        if (Array.isArray(this.test_value)) {
          this.test = true;
          return this;
        }
        this.test = false;
        return this;
      }else{
        return this;
      }
    },
    isFloat() {
      if(test){
        if (validator(this.test_value).isNumber() && this.test_value.toString().indexOf('.')!=-1) {
          this.test = true;
          return this;
        }
        this.test = false;
        return this;
      }else{
        return this;
      }
    },
    min(element) {
      if(test){
        if (this.test_value >=element) {
          this.test = true;
          return this;
        }
        this.test = false;
        return this;
      }else {
        return this;
      }
    },
    max(element) {
      if(test){
        if (this.test_value <=element) {
          this.test = true;
          return this;
        }
        this.test = false;
        return this;
      }else{
        return this;
      }
    },
    minLenght(valueArray) {
      if(test){
        if (this.test_value.length  > valueArray) {
          this.test = true;
          return this;
        }
        this.test = false;
        return this;
      }else{
        return this;  
      }
    },
    maxLenght(valueArray) {
      if(test){
        if (this.test_value.length  <= valueArray  ) {
          this.test = true;
          return this;
        }
        this.test = false;
        return this;
      }else{
        return this;
      }
    },
    equal(checkValue) {
      if(test) {
        if (checkValue.toString()==this.test_value.toString()) {
          this.test = true;
          return this;
        }
        this.test = false;
        return this;
      }else {
        return this;
      }
    },
    isDate() {
      if(test){
        if (this.test_value.match(/^\d{1,2}\.\d{1,2}\.\d{4}$/)!=null) {
          this.test = true;
          return this;
        }
        this.test = false;
        return this; 
      }else {
        return this;
      }
    },
    isEmail() {
      if(test){
        if (this.test_value.match(/^[\w-.]+@[\w-]+.[a-z]{2,4}$/i)!=null) {
          this.test = true;
          return this;
        }
        this.test = false;
        return this; 
      }else {
        return this;
      }
    }
  }
}



//проверки 1 части 
console.log(register("asd@gmail.com","A1dfgh"));
console.log(signIn("asd@gmail.com","A1dfgh"));
console.log(resetPassword("asd@gmail.com","A1dfgh","Df4das"));
signOut();
console.log(isAuth());
console.log(authUserData);

//проверки валидатора

console.log("\nisArray isString isNumber \n");
console.log(validator('1').isArray().test); // false
console.log(validator('1').isString().test); // true
console.log(validator('1').isNumber().test); // false

console.log("\nMin Max \n");
console.log(validator(10).isNumber().min(10).test); // true
console.log(validator(10).isNumber().min(4).max(9).test); // false

console.log("\nisArray equal \n");
console.log(validator([]).isArray().equal([1, 2, 3]).test); // false
console.log(validator([1, 2, 3]).isArray().equal([1, 2, 3]).test); // true

console.log("\nisString isEmail isDate \n");
console.log(validator('user@m').isString().isEmail().test); // false
console.log(validator('user@mail.ru').isString().isEmail().test); // true
console.log(validator('25.12.1993').isDate().test); // true