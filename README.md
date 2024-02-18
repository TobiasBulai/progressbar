# Progressbar

To enable the progressbar, we require a block element with the classname `progressbar`.
```html
<div>
  <div class="progressbar"></div>
</div>
```

### How to use
```javascript
const element = document.querySelector('.progressbar')

const progressbar = new ProgressBar(element)
progressbar.step(5) // step indicated in percentage
```

### Configure the Progressbar
The configuration could be either a plain object or an instance of `ProgressBarConfig`, but both are sent in as second parameter to the constructor.

```javascript
const config = ProgressBarConfig()
config.initText = 'Loading...'

// instance of ProgressBarConfig
const progressbar = new ProgressBar(
  element,
  config
)

// Simple object
const progressbar = new ProgressBar(element, {
  initText: 'Loading...'
})
```

### Configure Steps
The configuration could be either a plain object or an instance of `StepConfig`, but both are sent in as second parameter to the function.

```javascript
const progressbar = new ProgressBar(element)

progressbar.step(5, new StepConfig())
progressbar.step(10, {})
```

### Configuration options
**Progressbar**
```javascript
{
  initText: '', // String
  width: 0, // Number
  height: 0, // Number
  borderWidth: 0, // Number
  borderColor: '', // String
  padding: 0, // Number
  radius: 0, // Number
  progressColor: '', // String
  transitionDuration: 0 // Number
}
```

**Step**
```javascript
{
  text: { // object
    value: '', // String
    fade: false // Boolean
  },
  textColor: '' // String
}
```
