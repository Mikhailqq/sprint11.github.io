export class CardList {
	constructor(container){// принимает :		
		this.container = container;
	}

	addCard(item) {//принимает на вход экземпляр карточки
		this.container.appendChild(item);
		
	}
	
	render(initialCards, newPlaceCard) {
		initialCards.forEach(item => {				
      		this.addCard(newPlaceCard(item));		      	
		})
	}
}