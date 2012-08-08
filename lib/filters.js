filters = {
  Replace: function(find, replace) {
    this.find = find || '';
    this.replace = replace || '';

    this.filter = function(value) {
      return value.replace(this.find, this.replace);
    }
  },

  Alpha: function(allowWhitespace) {
    filters.Replace.call(this);
    this.find = /[^a-zA-Z]/g;

    if (allowWhitespace) {
      this.find = /[^a-zA-Z\s]/g;
    }
  },

  Alnum: function(allowWhitespace) {
    filters.Replace.call(this);
    this.find = /[^a-zA-Z0-9]/g;

    if (allowWhitespace) {
      this.find = /[^a-zA-Z0-9\s]/g;
    }
  },

  Digits: function() {
    filters.Replace.call(this);
    this.find = /[^0-9\.]/g;
  },

  Int: function(allowSigned) {
    this.allowSigned = allowSigned || false;
    this.find = /[^0-9]/g;

    if (this.allowSigned) {
      this.find = /[^0-9\-]/g;
    }
  },

  stringToUpper: function(value) {
    return value.toUpperCase();
  },

  stringToLower: function(value) {
    return value.toLowerCase();
  },

  trim: function(value) {
    return value.trim();
  },
}

filters.Alpha.prototype = filters.Replace;
filters.Alnum.prototype = filters.Replace;
filters.Digits.prototype = filters.Replace;

filters.Int.prototype.filter = function(value) {
  var filtered = value.replace(this.find, '');
  return (!filtered) ? 0 : filtered;
}

module.exports = filters;