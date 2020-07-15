export class Api {	
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }
  //ЗАГРУЗКА КАРТОЧЕК С СЕРВЕРА
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
    	headers: this.headers
    })   
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  //ЗАГРУЗКА ДАННЫХ ПОЛЬЗОВАТЕЛЯ

  /* Можно лучше: здесь не нужны параметры infoName, infojob */
  getUserInfoFrom(infoName, infojob) {  	
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: this.headers
    })  	
    /*
      Можно лучше: проверка ответа сервера и преобразование из json
      дублируется во всех методах класса Api, лучше вынести в отдельный метод:
        _getResponseData(res) {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`); 
        }
        return res.json();
        }
      Подчеркивание в начале имени метода говорит о том, что метод является приватным, т.е.
      не используется вне класса Api   
    */
  	.then(res => {
  		if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  	})
   }
 
// ОТПРАВКА ФОРМЫ ПРОФИЛЯ НА СЕРВЕР
  editProfileInfo(infoName, infojob) { 
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: infoName,
        about: infojob
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }) 
  }
}



