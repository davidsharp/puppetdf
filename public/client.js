// define variables that reference elements on our page
const dreamsList = document.getElementById('dreams');
const dreamsForm = document.forms[0];
const dreamInput = dreamsForm.elements['dream'];
const dreamBackground = dreamsForm.elements['bg'];

// listen for the form to be submitted and add a new dream when it is
dreamsForm.onsubmit = function(event) {
  event.preventDefault()
  console.log(location.hostname+'/pdf?page='+dreamInput.value,encodeURIComponent(dreamInput.value))
  if(dreamInput.value.length>0)location.assign('/pdf?page='+encodeURIComponent(dreamInput.value)+'&bg='+dreamBackground.checked)
};

// I'm aware that this is prone to XSS
function handleFiles(files){
  const reader    = new FileReader(),
        file = files[0];
  console.log(files)
  reader.onload = function(event) {
    location.assign('/pdf?html='+encodeURIComponent(event.target.result)) //post this
  };
  reader.readAsText(file);
}
