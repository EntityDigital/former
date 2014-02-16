var former = require('./lib/former'),
    Form = former.Form;

form = new Form('/', 'GET');
form.add(new former.Element('name', {
  label: 'Name:',
  filters: [
    new former.filters.Alpha(true),
    former.filters.stringToUpper,
    former.filters.trim,
    new former.filters.Replace(/\s+/g, ' ')
  ],
  validators: [
    former.validators.notEmpty
  ]
}));

form.add(new former.Element('age', {
  label: 'Age:',
  filters: [
    new former.filters.Digits()
  ],
  validators: [
    former.validators.notEmpty,
    new former.validators.Between(18, 99)
  ],
  description: 'Your age, between 18 and 99'
}));

var formData = {
  name: 'My 123 Name 123',
  age: '17'
};

if (form.isValid(formData)) {
  console.log('Valid');
} else {
  console.log('Invalid');
}

console.log(former.renderer.formElement(form.get('name')));
console.log(former.renderer.formElement(form.get('age')));