var Element = function(name, spec) {
  var _name = '';
  var _id = '';
  var _value = '';

  this.setName = function(name) {
    _name = name;
  }

  this.getName = function() {
    return _name;
  }

  this.setId = function(id) {
    _id = id;
  }

  this.getId = function() {
    return _id;
  }

  this.setValue = function(value, skipFilters) {
    skipFilters = skipFilters || false;
    _value = value;

    if (!skipFilters) {
      this.filter();
    }
  }

  this.getValue = function() {
    return _value;
  }

  this.filters = [];
  this.validators = [];
  this.errors = [];
  this.attributes = {};
  this.setId(name);
  this.setName(name);
  this.label = name;
  this.description = '';
  this.init(spec);
}

Element.prototype = {
  init: function(spec) {
    for (var name in spec) {
      switch (name) {
        case 'filters':
          this.setFilters(spec[name]);
          break;
        case 'validators':
          this.setValidators(spec[name]);
          break;
        case 'id':
          this.setId(spec[name]);
          break;
        case 'value':
          this.setValue(spec[name]);
          break;
        case 'label':
        case 'description':
          this[name] = spec[name];
          break;
        default:
          this.setAttribute(name, spec[name]);
          break;
      }
    }
  },

  setFilters: function(filters) {
    this.filters = filters;
    this.filter();
    return this;
  },

  addFilter: function(filter) {
    this.filters.push(filter);
    this.filter();
    return this;
  },

  setValidators: function(validators) {
    this.validators = validators;
    return this;
  },

  addValidator: function(validator) {
    this.validators.push(validator);
    return this;
  },

  setAttribute: function(name, value) {
    this.attributes[name] = value.toString();
  },

  filter: function() {
    for (var i in this.filters) {
      if (typeof this.filters[i] === 'function') {
        this.setValue(this.filters[i](this.getValue()), true);
      } else {
        this.setValue(this.filters[i].filter(this.getValue()), true);
      }
    }

    return this;
  },

  validate: function() {
    var valid = true;
    this.errors = [];

    for (var i in this.validators) {
      var status = true;
      var breakOnError = false;

      if (typeof this.validators[i] === 'function') {
        status = this.validators[i](this.getValue());
      } else {
        status = this.validators[i].validate(this.getValue());
        breakOnError = this.validators[i].breakOnError;
      }

      if (status !== true) {
        this.errors.push(status);
        valid = false;

        if (breakOnError) {
          break;
        }
      }
    }

    return valid;
  },

  hasErrors: function() {
    return this.errors.length > 0;
  },

  toString: function() {
    return this.getValue();
  },
}

module.exports = Element;