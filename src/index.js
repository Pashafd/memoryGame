'use strict';
// Импорт стилей
import './styles/index.scss';

const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.icon === secondCard.dataset.icon;

  if (isMatch) {
    showModal();
    setTimeout(() => {
      closeModal();
      removeFlip();
    }, 3000);
  }

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function RandomPositionCards() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

function showModal() {
  let modal = (document.querySelector('.modal').style.display = 'flex');
}

function closeModal() {
  let modal = (document.querySelector('.modal').style.display = 'none');
}

function removeFlip() {
  cards.forEach((card) => {
    card.classList.remove('flip');
  });
}
cards.forEach((card) => card.addEventListener('click', flipCard));
