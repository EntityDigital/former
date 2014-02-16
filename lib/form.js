var Form = function(action, method) {
  this.action = action || '';
  this.method = method || 'post';
  this.attributes = {};
  this.elements = {};
  this.messages = [];
};

Form.prototype = {
  hydrate: function(values) {
    for (var name in values) {
      if (this.elements[name]) {
        this.elements[name].setValue(values[name]);
        this.elements[name].filter();
      }
    }

    return this;
  },

  add: function(element) {
    this.elements[element.getName()] = element;
    return this;
  },

  get: function(name) {
    return this.elements[name] || null;
  },

  filter: function() {
    for (var name in this.elements) {
      this.elements[name].filter();
    }

    return this;
  },

  validate: function() {
    var valid = true;
    this.messages = [];

    for (var name in this.elements) {
      if (!this.elements[name].validate()) {
        this.messages[name] = this.elements[name].errors;
        valid = false;
      }
    }

    return valid;
  },

  getValues: function() {
    var values = [];
    
    for (var name in this.elements) {
      values[name] = this.elements[name].value;
    }

    return values;
  },

  isValid: function(data) {
    this.hydrate(data);
    return this.validate();
  }
};

module.exports = exports = Form;