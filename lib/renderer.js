module.exports = {
  formElement: function(element, type) {
    return [
      '<div class="formElement">',
      this.formLabel.startTag(element),
      this.formInput(element, type),
      this.formLabel.endTag(),
      this.formElementDescription(element),
      this.formElementErrors(element),
      '</div>',
    ].filter(function(value) {
      return !!value;
    }).join('\n');
  },

  formInput: function(element, type) {
    type = type || 'text';
    return '<input id="' + element.getId()
         + '" type="' + type
         + '" name="' + element.getName()
         + '" value="' + element.getValue()
         + '"' + this.attributes(element) + ' />';
  },

  formSelect: function(element) {
  },

  formLabel: {
    startTag: function(element) {
      var label = element.label || element.getName();
      return '<label for="' + element.getId() + '">' + label;
    },
    endTag: function() {
      return '</label>';
    }
  },

  formElementErrors: function(element) {
    var html = [];

    if (element.hasErrors()) {
      html.push('<ul class="formElementErrors">');

      for (var i in element.errors) {
        html.push('<li>' + element.errors[i] + '</li>');
      }

      html.push('</ul>');
    }

    return html.filter(function(value) {
      return !!value;
    }).join('\n');
  },

  formElementDescription: function(element) {
    if (element.description) {
      return '<div class="formElementDescription">' + element.description + '</div>';
    }

    return '';
  },

  attributes: function(element) {
    var attributes = [];

    for (var name in element.attributes) {
      attributes.push(name + '="' + element.attributes[name] + '"');
    }

    if (attributes.length > 0) {
      return ' ' + attributes.join(' ');
    }

    return '';
  }
}