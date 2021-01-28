'use strict';
// Импорт стилей
import './styles/index.scss';

const cards = document.querySelectorAll('.card');
let modal = document.querySelector('.modal');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

ramdomPosition();

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
    }, 3000);
  }

  unflipCards();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);

  setTimeout(ramdomPosition, 1850);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function showModal() {
  modal.style.display = 'flex';
}

function closeModal() {
  modal.style.display = 'none';
}

function ramdomPosition() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

cards.forEach((card) => card.addEventListener('click', flipCard));
