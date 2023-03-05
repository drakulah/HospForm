'use strict';

// Elements
const form = document.querySelector('.login-form');
const passwordInput = form.querySelector('.input.password>input');
const phoneInput = form.querySelector('.input.phone-number>input');

window.addEventListener('DOMContentLoaded', () => {
  phoneInput.placeholder = `Eg: ${randomPhoneNumber()}`;
  passwordInput.placeholder = `Eg: ${shuffleArray([randomName(), randomNumbers(4), randomSymbol()]).join('')}`;
});

// Event handlers
form.onsubmit = () => {

  // Validate phone number
  if (!PHONE_REGEX.test(phoneInput.value)) {
    const state = new ModalWindowState();
    state.onDismiss(() => state.dismiss());
    Ducky.showModalWindow(
      'Invalid phone number',
      'Phone number must be a valid number.',
      [
        Ducky.createButton(
          'Ok',
          'PRIMARY',
          {
            onclick: () => {
              state.dismiss();
              phoneInput.focus();
            }
          }
        )
      ],
      state
    );
    return false;
  }

  // Validate password
  if (passwordInput.value.trim().length < 6) {
    const state = new ModalWindowState();
    state.onDismiss(() => state.dismiss());
    Ducky.showModalWindow(
      'Invalid password',
      'Password must be at least of 6 characters',
      [
        Ducky.createButton(
          'Ok',
          'PRIMARY',
          {
            onclick: () => {
              state.dismiss();
              passwordInput.focus();
            }
          }
        )
      ],
      state
    );
    return false
  }

}