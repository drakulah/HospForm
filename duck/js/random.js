'use strict';

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function randomNumbers(length = 10) {
  const names = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
  ];
  const min = 0;
  const max = names.length - 1;
  let randomCode = '';
  while (length > 0) {
    const index = Math.floor(Math.random() * (max - min + 1) + min);
    randomCode += names[index];
    length--;
  }
  return randomCode;
}

function randomColor() {
  const min = 0;
  const max = 16777215;
  return Math.floor(Math.random() * (max - min + 1) + min).toString(16);
}


function randomName() {
  const names = [
    'comeOnHarry',
    'Duckling',
    'drsn'
  ];
  const min = 0;
  const max = names.length - 1;
  const index = Math.floor(Math.random() * (max - min + 1) + min);
  return names[index];
}

function randomSymbol() {
  const names = [
    '@', '!', '#', '$', '%', '&', '-', '_', '?', '+', ''
  ];
  const min = 0;
  const max = names.length - 1;
  const index = Math.floor(Math.random() * (max - min + 1) + min);
  return names[index];
}


function randomPhoneNumber() {
  let first = '98';
  let l = 8;
  const c = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const min = 0;
  const max = c.length - 1;
  let randomCode = '';
  while (l > 0) {
    const index = Math.floor(Math.random() * (max - min + 1) + min);
    randomCode += c[index];
    if (l === 5 && (c[index] / 4) > 2) first = '01-';
    l--;
  }
  return first + randomCode;
}