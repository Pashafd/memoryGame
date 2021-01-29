'use strict';
// Импорт стилей
import './styles/index.scss';

const cards = document.querySelectorAll('.card');
let modal = document.querySelector('.modal');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let once;

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
    setTimeout(showModal, 1000);
    setTimeout(closeModal, 4000);
  }

  unflipCards();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();

    once = true; //for randomPosition cards
  }, 1500);
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

cards.forEach((card) =>
  card.addEventListener('transitionend', function () {
    if (once) {
      ramdomPosition();

      once = false;
    }
  })
);
