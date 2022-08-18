const $animalForm = document.querySelector('#list-group');
const $displayArea = document.querySelector('#note-textarea"');

const printResults = resultArr => {
  console.log(resultArr);

  const noteHTML = resultArr.map(({ id, title, texts }) => {
    return `
  <div class="col-12 col-md-5 mb-3">
    <div class="card p-3" data-id=${id}>
      <h4 class="text-primary">${title}</h4>
      
      Personality Traits: ${texts
        .map(text => `${text.substring(0, 1).toUpperCase() + text.substring(1)}`)
        .join(', ')}</p>
    </div>
  </div>
    `;
  });

  $displayArea.innerHTML = noteHTML.join('');
};

const getNotes = (formData = {}) => {
  let queryUrl = '/api/notes?';

  Object.entries(formData).forEach(([key, value]) => {
    queryUrl += `${key}=${value}&`;
  });

  console.log(queryUrl);

  fetch(queryUrl)
    .then(response => {
      if (!response.ok) {
        return alert('Error: ' + response.statusText);
      }
      return response.json();
    })
    .then(noteData => {
      console.log(noteData);
      printResults(noteData);
    });
};

const handlegetNotesSubmit = event => {
  event.preventDefault();
  //const dietRadioHTML = $noteForm.querySelectorAll('[name="diet"]');
  //let diet;

  //for (let i = 0; i < dietRadioHTML.length; i += 1) {
   // if (dietRadioHTML[i].checked) {
    //  diet = dietRadioHTML[i].value;
   // }
  //}

  //if (diet === undefined) {
   // diet = '';
 // }

  //const textArr = [];
  //const selectedTraits = $noteForm.querySelector('[name="personality"').selectedOptions;

 // for (let i = 0; i < selectedTraits.length; i += 1) {
  //  personalityTraitArr.push(selectedTraits[i].value);
 // }

//  const texts = textArr.join(',');

  //const noteObject = { diet, personalityTraits };

  getNotes(noteObject);
};

$noteForm.addEventListener('submit', handlegetNotesSubmit);

getNotes();