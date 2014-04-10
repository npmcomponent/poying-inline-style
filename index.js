'use strict';

module.exports = createInlineStyle;

createInlineStyle.InlineStyle = InlineStyle;

function createInlineStyle(el) {
  return new InlineStyle(el);
};

function InlineStyle(el) {
  this.el = el;
  this.style = this.parse(el);
  this.middleware = [];
};

var proto = InlineStyle.prototype;

proto.use = function (mw) {
  this.middleware.push(mw);
  return this;
};

proto.get = function (prop) {
  return this.style[prop];
};

proto.set = function (prop, value) {
  this.style[prop] = value;
  return this;
};

proto.render = function () {
  var style = this.toString();
  this.el.setAttribute('style', style);
  return this;
};

proto.parse = function (el) {
  var str = el.getAttribute('style');
  var state = 0;
  var len = str.length;
  var i, char_;
  var key = '', val = '';
  var data = {};

  var define = function () {
    data[key.trim()] = val.trim();
    key = '';
    val = '';
  };

  for (i = 0; i < len; i += 1) {
    char_ = str[i];
    switch (state) {
      case 0:
        if (char_ === ':') {
          state = 1;
        } else {
          key += char_;
        }
        break;
      case 1:
        if (char_ === ';') {
          state = 2;
          i -= 1;
        } if (char_ === ':') {
          throw new Error('Syntax Error');
        } else {
          val += char_;
        }
        break;
      case 2:
        define();
        state = 0;
        break;
    }
  }

  if (key && val) {
    define();
  }

  return data;
};

proto.run = function (ctx) {
  var i, len;
  var mw = this.middleware;
  var fn;

  while (fn = mw.shift()) {
    fn.call(ctx);
  }

  return ctx;
};

proto.toString = function () {
  var style = this.style;
  var prop, ctx;
  var str = [];
  
  for (prop in style) {
    if (style.hasOwnProperty(prop)) {
      ctx = this.run({
        style: this,
        key: prop,
        value: style[prop]
      });
      str.push(ctx.key + ': ' + String(ctx.value));
    }
  }

  return str.join('; ');
};
