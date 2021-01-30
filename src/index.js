// Импорт стилей
import './styles/index.scss';

//Variables
const cards = document.querySelectorAll('.card');
let modal = document.querySelector('.modal');
let modalWin = document.querySelector('.modal-inner');
let modalLose = document.querySelector('.modal-lose');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let once;

//Functions
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
  let isBombs =
    firstCard.dataset.icon == 'bomb' && secondCard.dataset.icon == 'bomb';
  let isMatch = firstCard.dataset.icon === secondCard.dataset.icon && !isBombs;

  if (isMatch) {
    setTimeout(showModalWin, 1000);
    setTimeout(closeModalWin, 4000);
  }

  if (isBombs) {
    setTimeout(showModalLose, 1000);
    setTimeout(closeModalLose, 4000);
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

function showModalWin() {
  modal.style.display = 'flex';
  modalWin.style.display = 'block';
}

function closeModalWin() {
  modal.style.display = 'none';
  modalWin.style.display = 'none';
}

function showModalLose() {
  modal.style.display = 'flex';
  modalLose.style.display = 'flex';
}

function closeModalLose() {
  modal.style.display = 'none';
  modalLose.style.display = 'none';
}

function ramdomPosition() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 10);
    card.style.order = randomPos;
  });
}

//Listeners
const cardLisen = () => {
  cards.forEach((card) => card.addEventListener('click', flipCard));
};
cardLisen();

cards.forEach((card) =>
  card.addEventListener('transitionend', function () {
    if (secondCard) {
      cards.forEach((card) => card.removeEventListener('click', flipCard));
    }

    if (once) {
      ramdomPosition();

      setTimeout(cardLisen, 510);
      once = false;
    }
  })
);
