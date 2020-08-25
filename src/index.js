import './pages/index.css'

import {Api} from './js/Api.js';
import {Card} from './js/Card.js';
import {CardList} from './js/CardList.js';
import {FormValidator} from './js/FormValidator.js';
import {Popup} from './js/Popup.js';
import {UserInfo} from './js/UserInfo.js';




(function () {

// DOM
 const list = document.querySelector(".places-list")
 
 const plusForm = document.forms.new;
 const editForm = document.forms.edit;
 
 const plusButton = document.querySelector(".user-info__button");
 const editButton = document.querySelector(".user-info__edit");
 
 const closePopupPlus = document.querySelector(".popup__close_plus");
 const closePopupEdit = document.querySelector(".popup__close_edit");
 const closePopupPicture = document.querySelector(".popup__close_picture");
 
 const infoName = document.querySelector(".user-info__name");
 const infojob = document.querySelector(".user-info__job");
 const fullName = document.querySelector(".popup__input_type_figure");
 const userJob = document.querySelector(".popup__input_type_job");
 
// FUNC
 const newPlaceCard = (...arg) => new Card(...arg).create();
 
 // INSTANS
 const popupPlus = new Popup(document.querySelector(".popup__plus"));
 const popupEdit = new Popup(document.querySelector(".popup__edit"));
 const popupPicture = new Popup(document.querySelector(".popup__picture"));
 
const serverUrl ='https://nomoreparties.co';

 const options = {
  baseUrl: `${serverUrl}/cohort11`,
  headers: {
    authorization: '0d9f8687-7573-4d8c-b8dd-f82bc1e56c86' ,
    'Content-Type': 'application/json'
  }
 }



// Загрузка карточек с сервера
 const api = new Api(options);

 api.getInitialCards()
  .then(res => {
   const cardList = new CardList(list);
   cardList.render(res, newPlaceCard); 
  })
  .catch(err => {
    console.log(err);
  });

 const userInfo = new UserInfo(infoName, infojob); 


api.getUserInfoFrom()
  .then(res => {
    userInfo.setUserInfo(res.name, res.about)
    userInfo.updateUserInfo();
  })
  .catch(err => {
    console.log(err);
  })
  
 
 const plusFormValidator = new FormValidator(plusForm) 
 plusFormValidator.setEventListeners();
 
 const editFormValidator = new FormValidator(editForm) 
 editFormValidator.setEventListeners();

 // слушатель на попап-форму профиля и открытие при клике  
 editButton.addEventListener('click', function() {  
    const getUserInfo = userInfo.getUserInfo();
    fullName.value = getUserInfo.name;  
    userJob .value = getUserInfo.job;
    popupEdit.open();       
 });
 //слушатель на попап-форму карточки и открытие при клике
 plusButton.addEventListener('click',function() {  
   popupPlus.open();   
   
 });
 // слушатель на крестике: по клику закрывает попап-форму и очищает ее 
 closePopupPlus.addEventListener('click', function() {  
     popupPlus.close();
     plusForm.reset();
     plusFormValidator.resetError()    
 }); 

 // слушатель на крестике: по клику закрывает попап-форму профиля и очищает ее 
 closePopupEdit.addEventListener('click', function() {   
   popupEdit.close();
   editFormValidator.resetError() 
 }); 

 list.addEventListener('click', function(event) {
   const target = event.target;
   if (target.classList.contains("place-card__image")) {        
     popupPicture.open();
     const popupImg = document.querySelector(".popup__image");    
     const picture = target.dataset.url;
     popupImg.src = picture;    
   };
 })

 // закрытие попапа с пикчей
 closePopupPicture.addEventListener('click', function(event) {
   popupPicture.close()
 })
 
 // Добавление карточки
 plusForm.addEventListener('submit', function() {
   event.preventDefault();
   const isValid = plusFormValidator.checkFormValid();
   if (isValid) {
    const card = {
       name: plusForm.elements.name.value,
       link: plusForm.elements.link.value
     };
     const cardList = new CardList(list);
     cardList.addCard(newPlaceCard(card));
     plusForm.reset();    
     popupPlus.close();
   }
 }) 

 //Изменение профиля
 editForm.addEventListener('submit', function() {
   event.preventDefault();
   const isValid = editFormValidator.checkFormValid();
 
   if (isValid) {
    api.editProfileInfo(fullName.value, userJob.value)
    .then(res => {
      /*
        Можно лучше: в ответ на отправку данных сервер возвращает обновленные данные, нужно использовать их
      */
      userInfo.setUserInfo(fullName.value, userJob.value);
      userInfo.updateUserInfo();
      popupEdit.close()      
    })
    .catch(err => {
      console.log(err);
    });  
    
   }
 })
})();
