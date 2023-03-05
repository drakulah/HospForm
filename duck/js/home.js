'use strict';

const tabBtns = document.querySelectorAll('.tab-btn-container > a > span');

tabBtns.forEach(e => {
  e.onclick = () => {
    if (e.classList.contains('active')) return;
    tabBtns.forEach(f => f.classList.remove('active'));
    e.classList.add('active');
  }
})