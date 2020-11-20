/**
 * This plugin watches for changes in the <title> element of the <head>.
 * When it finds a change, it speaks it out loud.
 */

// Keep the previous value to compare against new values. Because Vue can update
// the target node multiple times with the same value, the mutation observer is
// triggerd multiple times. Therefore, we manually keep track if the new value
// equals to the old value.
let oldValue = '';

const targetNode = document.querySelector('head title');
const config = { childList: true };

// Callback function to execute when mutations are observed
const callback = function() {
  const newValue = targetNode.innerText;
  if (newValue !== oldValue) {
    const titleAlert = document.querySelector('#title-alert');
    titleAlert.innerHTML = newValue;
    titleAlert.focus();

    oldValue = newValue;
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

