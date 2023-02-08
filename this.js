/* this는예약어로, 어떤 객체에 바인딩된 속성으로서 불렸는지 알 수 있게 해준다.
브라우저 전역에서의this는 브라우저의window라는 객체에 바인딩된다. */
 
function f() {
    console.log(this);
    console.log("f iscalled");
}
var obj= {
    name: "object",
    method: f,
}
f();  
obj.method();
 
/* 과정
첫 번째로f(); 
1. 함수의console.log(this) 실행
  브라우저 전역에서의 this는 브라우저의 window라는 객체에 바인딩 된다.
2. 함수의 "f is called" 실행
  
두 번째로o.method();
1. 객체의method()로서 함수f를 호출한다.
  console.log(this) 실행
  이 때는 this를 통해 해당 객체인 o의 정보를 가져온다.
2. 함수의 "f is called" 실행
*/
 

//this로 객체 속성 값 바꾸기
function setName(name) {
    this.name = name;
}
 
let o= {
    name: 'object',
    setName: setName,
}
 
let o2= {
    name: 'null',
    setName: setName,
}
 
o.setName("object1");
o2.setName("object2");
 
console.log(o); // { name: 'object1', setName: [Function: setName] }
console.log(o2); // { name: 'object2', setName: [Function: setName] }
 
/*
해당 객체의method로 함수setName을 호출하고
this.name = name을 실행해 객체의 name의 값을
인자로 들어오는 name으로 변경해준다. 
*/