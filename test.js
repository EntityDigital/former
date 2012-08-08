var former = require('./lib/former');
var form = new former.Form('/', 'GET');

form.add(new former.Element('name', {
  label: 'Name:',
  filters: [
    new former.filters.Alpha(true),
    former.filters.stringToUpper,
    former.filters.trim,
    new former.filters.Replace(/\s+/g, ' ')
  ],
  validators: [
    former.validators.notEmpty,
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
  ]
}))

var formData = {
  name: 'Rob 123 Johnson 123',
  age: '18'
}

if (form.isValid(formData)) {
  console.log('Valid Form');
} else {
  console.log('Oops, you know you fucked up right?');
}

console.log(former.renderer.formElement(form.get('name')));
console.log(former.renderer.formElement(form.get('age')));