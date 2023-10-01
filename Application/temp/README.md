## 리액트
    * SPA - html 파일이 하나뿐인 단일 페이지 애플리케이션
    * 클라이언트 사이드 렌더링
        1. 웹 브러우저가 서비스 requests
        2. 웹 서버는 요청 URL 경로를 식별하지 않고 index.html 와 자바스크립트 리액트 앱을 반환
        3. 웹 브라우저는 index.html 페이지를 보여주고 자바스크립트 리액트 앱을 실행
        4. 사용자가 페이지를 이동하면 웹 브라우저는 서버에서 받은 리액트 앱을 실행하여 자체적으로 페이지 교체
    * 두 렌더링 방식의 장점을 합쳐 높은 Next.js의 유니버셜 렌더링 전략이 있음 

### 리액트 라우터 설치
    * npm i react-router-dom 
    * 버전 변경
        * npm unistall react-router-dom
        * npm install react-router-dom@6

### 화면 구성
    1. Home: 인덱스 페이지
    2. New: 새 일기 작성 페이지
    3. Diary: 일기 상세 조회 페이지
    4. Edit: 작성한 일기를 수정하거나 삭제하는 페이지

### 동적 경로의 종류
    * URL 파라미터
    * 쿼리 스트링

### 공통 컴포넌트 
    * Button, Header, Editor 컴포넌트

### 페이지 구현 
    * Home, Diary (완료)
    * Edit, New (예정)

### 커스텀 훅(사용자 정의 훅)
    * useState, useEffect와 같은 훅을 직접 만들어 사용하는 것을 뜻함
    *


`
