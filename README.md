*This repository is a mirror of the [component](http://component.io) module [poying/inline-style](http://github.com/poying/inline-style). It has been modified to work with NPM+Browserify. You can install it using the command `npm install npmcomponent/poying-inline-style`. Please do not open issues or send pull requests against this repo. If you have issues with this repo, report it to [npmcomponent](https://github.com/airportyh/npmcomponent).*
inline-style
------------

## API

### inlineStyle(element)

```javascript
var style = inlineStyle(document.body);
```

### style#use(plugin)

```javascript
style.use(function () {
  if (needPrefix(this.key)) {
    this.key = autoPrefix(this.key);
  }
});
```

### style#get(propName)

### style#set(propName, prop)

### style#render()

## License

The MIT License (MIT)

[http://poying.mit-license.org/](http://poying.mit-license.org/)
