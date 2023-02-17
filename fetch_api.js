fetch('https://kdt.roto.codes/todos')
    .then(res => {
        //받아올 데이터를 json()해주어야 다음 then에서 필요한 형태로 데이터를 가져올 수 있다.
        return res.json()
    })
    .then(todos => {
        console.log(todos)
    })

fetch('https://kdt.roto.codes/todos')
    .then(res => {
        //fetch의 기본 응답은 request 객체 이기 때문에
        //응답 결과를 json으로 바꾸거나 text로 바꾸는 등의 처리를 해줘야한다
        return res.json() 
        // return res.text()
    })
    .then(result => {
        console.log(result)
        //위에서 return res.text() 했다면
        //text화 한 것을 json으로 파싱할 수도 있다.
        // console.log(JSON.parse(result))
    })





//이미지를 처리하는 데 fetch의 blob을 사용할 수 있다.
const $image = document.createElement('img')
const imageUrl = 'https://indistreet.com/_next/image?'

//이미지 url을 fetch로 불러온 다음
fetch(imageUrl)
    .then(res => {
        return res.blob()
    })
    //이미지는 파일데이터로 불러와지는데
    //blob을 이용해 이미지를 적용하기 알맞은 데이터로 정제해서 가져올 수 있다.
    .then(blob => {
        console.log(blob)
        //blob으로 가져온 데이터를 url화 한다.
        const objectURL = URL.createObjectURL(blob)
        console.log(objectURL)
        //그 데이터를 $image src로 준다.
        $image.src = objectURL

        //그리고 body에 붙인다.
        document.querySelector('body'.appendChild($image))
    })





//존재하지 않는 api 호출하기

/*
fetch는 http error가 발생해도 reject되지 않는다.
네트워크 에러나 요청이 완료되지 못한 경우에만 reject 된다.
그렇기 때문에 서버 요청 중 에러가 생겼을 경우에도 then으로 처리가 되기 때문에 
response의 status code나 ok를 체크해주는 것이 좋다.
(서버 요청이 성공했는지 못했는지 확인 가능)
*/

fetch('https://kdt.roto.codes/todos-undefined-api')
    .then(res => {
        //만약 ok로 확인하지 않고 그냥 기존처럼 데이터를 json()등으로 작업하게 되면
        //처리할 api가 존재하지 않는 데이터이기 때문에
        //json() 등으로 처리할 수 있는 데이터 양식이 아니라서 오류가 발생한다.

        //즉, 존재하지 않는 데이터이기 때문에 처리할 양식에 맞지 않아 오류가 발생하는 것이지,
        //네트워크에 접근하지 못했다는 오류는 따로 표시하지 않는다는 것이다.
        if (res.ok) {
            return res.json() 
        }
        //ok에 해당되지 않으면, 즉 서버 접근이 제대로 되지 않았다면 에러 메세지를 catch로 전달
        //res.status는 현재 해당하는 에러 코드를 알려준다.
        throw new Error(`Status: ${res.status}! 요청이 처리되지 못함`)
    })
    .then(result => {
        console.log(result)
    })
    .catch(e => alert(e.message))

// res.ok는 status가 200~299 사이인 경우 true가 된다.
// 제대로 된 api 서버가 200대가 아닌 경우 문제가 될 수 있어서 그럴 경우 주의해야 한다.





//fetch의 두 번째 인자로 옵션 주기
const headers= new Headers()

headers.append('x=auth-token', 'TOKEN')

fetch('https://kdt.roto.codes/product', {
    //두 번째 인자를 줘서 처리 방식, header와 body의 처리를 결정할 수 있다.
    method: 'POST',
    headers,
    body: JSON.stringify(product)
})