var validators = {
  notEmpty: function(value) {
    if (!value) {
      return 'Value is empty';
    }

    return true;
  },

  isInt: function(value) {
    if (value.match(/[^0-9]/g)) {
      return 'Value is not a valid integer';
    }

    return true;
  },

  Between: function(min, max, inclusive) {
    this.min = min || 0;
    this.max = max;
    this.inclusive = true;

    if (inclusive === false) {
      this.inclusive = false;
    }
  }
}

validators.Between.prototype.validate = function(value) {
  var valid = true;

  if (this.inclusive) {
    valid = value >= this.min && value <= this.max;
  } else {
    valid = value > this.min && value < this.max;
  }

  if (!valid) {
    return 'Value is not between ' + this.min + ' and ' + this.max;
  }

  return true;
}

module.exports = validators;