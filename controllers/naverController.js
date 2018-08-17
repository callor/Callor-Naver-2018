// 네이버 키값
var naver = require('../config/naver_key.js')

// request 가져오기
var request = require('request')
// naver open API를 사용하기 위한 설정값 만들기
var option = (app_url)=>{
	return {
		url : app_url,
		headers : {
			'X-Naver-Client-Id' : naver.CLIENT_ID,
			'X-Naver-Client-Secret' : naver.CLIENT_SEC
		}
	}
}

module.exports = (app)=>{
	
	app.get('/',(req,res)=>{
		res.render('index',{books:[]})
	})
	
	app.post('/naver/book',(req,res)=>{
		
		let bookName = req.body.query // '자바'
		let api_url 
		= 'https://openapi.naver.com/v1/search/book.json'
		api_url += '?query=' 
			+ encodeURI(bookName)
			+ '&display=10'
			// encodeURI() 함수는 영숫자가 아닌
			// 문자를 사용해서 다른 API 조회를 할때는
			// 원문 그대로 보내면 중간에
			// 코드가 삭제, 변형되어
			// 원하는 결과를 얻을 수 없는데
			// 그 것을 방지하도록 문자코드를
			// 변경한다.
			
		console.log(option(api_url))
		// res.send(api_url)
		// naver에 조회하기
		request.get(option(api_url),
				(err,response,data)=>{
					if(!err && response.statusCode == 200) {
						// res.send(data)
						// data 값은 json 형식의 String 형자료이다.
						// render에게 보낼때는 json data 형으로
						// 바꾸어서 보내야 한다.
						console.log(data)
						let books = JSON.parse(data).items
						res.render('index',
								{body:'book',books:books})
					} else {
						res
						.status(response.statusCode)
						.end('오류발생')
					}
				}
		)
	})
	
}