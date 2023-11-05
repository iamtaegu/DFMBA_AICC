# DFMBA AICC

---

## 2023-10-04 아이디어 피칭 피드백

* 피드백: 바운더리가 약간 push 되었으면 좋겟음
* GPT: 헛소리가 많음. FAQ에 쓰려면 장확한 내용이 많아야 함. 틀린 내용이면 안됨
* 단순한게 chat gpt를 fine tuning해서 다시 쓸수는 있지만 비용이 아주 많이 들 것임
* fine tuning을 해서 학습*
* 로라 라는 방법 >> 너무 전문적
* 결국은 prompt tuning으로 할 것임
* 그렇게 한다면(예시:  경쟁 서비스 ==> 이쪽에서 볼 수 있는 ㅅ서비스는 helpshift라는 서비스임)
https://www.helpshift.com/?utm_feeditemid&utm_device=c&utm_term=helpshift&utm_source=google&utm_medium=cpc&utm_campaign=EN_APAC_BRAND_SQL&hsa_cam=17385229385&hsa_grp=136717992465&hsa_mt=e&hsa_src=g&hsa_ad=601336512671&hsa_acc=7747536906&hsa_net=adwords&hsa_kw=helpshift&hsa_tgt=kwd-297557329173&hsa_ver=3&gclid=Cj0KCQjwmvSoBhDOARIsAK6aV7iMBFHufRgMgdr4BhHxOGYDco1L4FS3Jx8c_bRlv0TFHkoBAzk2Eo4aAm87EALw_wcB
* 여기에 knowledge base를 추가함
* knowledge base: 금융권들 FAQ 서비스를 쌓음
* 이렇게 하면 1.2.3위 자주하는 질문 보여주고, 그게 아니면 1:1 service가능
* 원래는 knowledge base를 찾아서 보여주는것만 가능햇느데 현재는 요약한 후에 display 하는 것도 가능
* text를 주고 질문을 주면 그에 해당하는 내용을 추출해서 회신할수도 있음
* 이런식으로 만들면 —> 기존에 있던 service를 경쟁하는 것이므로
* 니즈가 있는 분야로 갈 수 있음
* ——————OR ————————
* 방향을 살짝만 튼다면 : FAQ를 GPT로 답변해주는건데
* analysit report나 경제report, 또는 뉴스 분석등을 해서
* 동일한 알고리즘을 적용한다면
* ===> 삼성전자 최근 report에 대하여 1장짜리 요약해줘
* 등등을 가능
* 굳이 FAQ call center에만 제한하지 않고
* 증권앱 + 투자한 주식, 금리, 환율, 최근시황 등을 요약해서 가능(나만의 전문 pb analysit)
* 최근시황 + analysit report 요약해서 보여주는 것 등등

--- 

## Frontend

 * script 
   1. nohup npm run start_linux &
   2. disown %1
   3. exit

## 아이디어 피칭

  * '일자 + 종목 + 선호도'(optional) 반영된 뉴스 목록 제시 (수업내용반영)
    1. 뉴스 상세보기 클릭시 요약 내용 (수업내용반영)

## Backend

 * URL
   * https://7yqpg0pc1k.execute-api.ap-northeast-2.amazonaws.com/dev/hello
   * https://7yqpg0pc1k.execute-api.ap-northeast-2.amazonaws.com/dev/news_trends
 * nginx
   * /etc/nginx/nginx.conf
       server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        server_name  localhost;
        root         /usr/share/nginx/html;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        location / {
                proxy_pass http://localhost:8080;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $http_host;
        }

