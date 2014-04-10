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

### style#get(plugin)

### style#set(plugin)

### style#render()

## License

The MIT License (MIT)

[http://poying.mit-license.org/](http://poying.mit-license.org/)
