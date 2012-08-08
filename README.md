# former

A JavaScript form library

## Example

```javascript
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
  name: 'My 123 Name 123',
  age: '18'
}

if (form.isValid(formData)) {
  console.log('Valid');
} else {
  console.log('Invalid');
}
```