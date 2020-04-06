const http = require('http');
import './styles/base.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/header.scss';
import './styles/resets.scss';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

// ServiceWorker is a progressive technology. Ignore unsupported browsers
if ('serviceWorker' in navigator) {
  console.log('CLIENT: service worker registration in progress.');
  navigator.serviceWorker.register('../../worker.js').then(function () {
    console.log('CLIENT: service worker registration complete.');
  }, function () {
    console.log('CLIENT: service worker registration failure.');
  });
} else {
  console.log('CLIENT: service worker is not supported.');
}

/**
 * Function called by event listener
 * Update UI with all data
 */
const onFormSubmitListener = async (e) => {
  // const { UserEntryEl } = getContext();
  // console.log(getContext());
  // const UserEntryValue = UserEntryEl.value;
  // console.log(UserEntryValue);
  await getInfo();
};

/**
 * Event listener to add function to existing HTML DOM element
 */
document.querySelector('#submit_button').addEventListener('click', onFormSubmitListener);

/**
 * Function to get elements context
 */
const getContext = () => {
  const UserEntryEl = document.querySelector('#user_input');
  return { UserEntryEl };
};

/**
 * Function to GET Project Data and update UI
 */
const getInfo = async () => {
  // const my_url = '/info' + '?' + 'text=Sad';
  // console.log(my_url);
  const request = await fetch('/info?text=Sad');
  try {
    const allData = await request.json();
    document.querySelector('#results').innerHTML = allData.text;
  } catch (error) {
    console.log('error', error);
  }
};




