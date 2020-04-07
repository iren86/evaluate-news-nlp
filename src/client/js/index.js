require('http');
import { stringify } from 'query-string';
import logo from '../image/have_fun.png';
import '../styles/base.scss';
import '../styles/header.scss';
import '../styles/main.scss';
import '../styles/form.scss';
import '../styles/footer.scss';
import '../styles/header-desktop.scss';
import '../styles/main-desktop.scss';
import '../styles/form-desktop.scss';
import '../styles/footer-desktop.scss';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../../worker.js').then(function(registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ',    registration.scope);
  }).catch(function(err) {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err);
  });
}

const logoImg = document.querySelector('#logo');
logoImg.src = logo;

/**
 * Function to get element context
 */
const getContext = () => {
  const userEntryEl = document.querySelector('#user_input');
  const infoEl = document.querySelector('.info-text');
  const resultEl = document.querySelector('#results');
  return { userEntryEl, infoEl, resultEl };
};

const { userEntryEl, infoEl, resultEl } = getContext();
const invalidClassName = 'invalid';
const validClassName = 'valid';

/**
 * Function called by event listener
 * Update UI with all data
 */
const onFormSubmitListener = async (e) => {
  subscribeInputEvents();
  validateInput();
  if (isFieldValid()) {
    const UserEntryValue = userEntryEl.value;
    await getInfo(UserEntryValue);
    hideData(infoEl);
    showData(resultEl);
  } else {
    hideData(resultEl);
    infoEl.textContent = `Please fill required field`;
    infoEl.setAttribute('style', 'color: red;');
    showData(infoEl);
  }
};

/**
 * Event listener to add function to existing HTML DOM element
 */
document.querySelector('#submit_button').addEventListener('click', onFormSubmitListener);

/**
 * Function to GET data from server and update UI
 */
const getInfo = async (user_input) => {
  const params = { text: user_input };
  const request = await fetch(`http://localhost:7000/info?${stringify(params)}`);
  try {
    const data = await request.json();
    console.log(`All data is: ${JSON.stringify(data)}`);
    const userEntry = JSON.stringify(data.text);
    console.log(`User's input is: ${JSON.stringify(data.text)}`);
    const moodInfo = JSON.stringify(data.polarity);
    console.log(`Polarity is: ${JSON.stringify(data.polarity)}`);
    document.querySelector('.entry-info').innerHTML = userEntry;
    document.querySelector('.mood-info').innerHTML = moodInfo;
  } catch (error) {
    console.log('error', error);
  }
};

/**
 * Function to subscribe for input events
 */
const subscribeInputEvents = () => {
  userEntryEl.addEventListener('input', (event) => {
    if (userEntryEl.validity.valid) {
      removeClassName(userEntryEl, invalidClassName);
      addClassName(userEntryEl, validClassName);
    }
  });
};

/**
 * Add the class when fields become invalid
 */
const validateInput = () => {
  if (userEntryEl.value.length === 0) {
    addClassName(userEntryEl, invalidClassName);
    removeClassName(userEntryEl, validClassName);
  } else {
    addClassName(userEntryEl, validClassName);
    removeClassName(userEntryEl, invalidClassName);
  }
};

/**
 * Function to get list with valid/invalid flags
 */
const getRequiredFlag = () => {
  if (userEntryEl.classList.contains(validClassName)) {
    return validClassName;
  } else {
    return invalidClassName;
  }
};

/**
 * Function to check if field valid
 */
const isFieldValid = () => {
  const flag = getRequiredFlag();
  return flag === validClassName;
};

/**
 * Function to add element class name
 */
const addClassName = (el, name) => {
  el.classList.add(name);
};

/**
 * Function to remove element class name
 */
const removeClassName = (el, name) => {
  el.classList.remove(name);
};

/**
 * Function to hide element
 */
const hideData = (el) => {
  el.style.display = 'none';
};

/**
 * Function to show element
 */
const showData = (el) => {
  el.style.display = '';
};



