module.exports = {
  formElement: function(element, type) {
    var html = '';
    html += '<div class="formElement">\n';
    html += this.formLabel.startTag(element);
    html += this.formInput(element, type);
    html += this.formLabel.endTag();
    html += this.formElementDescription(element);
    html += this.formElementErrors(element);
    html += '</div>\n';
    return html;
  },

  formInput: function(element, type) {
    type = type || 'text';
    return '<input id="' + element.getId()
         + '" type="' + type 
         + '" name="' + element.getName()
         + '" value="' + element.getValue()
         + '"' + this.attributes(element) + ' />\n';
  },

  formSelect: function(element) {
  },

  formLabel: {
    startTag: function(element) {
      var label = element.label || element.getName();
      return '<label for="' + element.getId() + '">' + label + '\n';
    },
    endTag: function() {
      return '</label>\n';
    }
  },

  formElementErrors: function(element) {
    var html = '';

    if (element.hasErrors()) {
      html = '<ul class="formElementErrors">\n';

      for (var i in element.errors) {
        html += '<li>' + element.errors[i] + '</li>\n';
      }

      html += '</ul>\n';
    }

    return html;
  },

  formElementDescription: function(element) {
    if (element.description) {
      return '<div class="formElementDescription">' + element.description + '</div>\n';
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