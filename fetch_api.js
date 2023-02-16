fetch('https://kdt.roto.codes/todos')
    .then(res => {
        //받아올 데이터를 json()해주어야 다음 then에서 필요한 형태로 데이터를 가져올 수 있다.
        return res.json()
    })
    .then(todos => {
        console.log(todos)
    })