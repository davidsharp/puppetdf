// define variables that reference elements on our page
const dreamsList = document.getElementById('dreams');
const dreamsForm = document.forms[0];
const dreamInput = dreamsForm.elements['dream'];

// listen for the form to be submitted and add a new dream when it is
dreamsForm.onsubmit = function(event) {
  event.preventDefault()
  console.log(location.hostname+'/pdf?page='+dreamInput.value,dreamInput)
  if(dreamInput.value.length>0)location.assign('/pdf?page='+dreamInput.value)
};
