const ProgressBarConfig = class {
  initText = undefined
  width = undefined
  height = undefined
  borderWidth = undefined
  borderColor = undefined
  padding = undefined
  radius = undefined
  progressColor = undefined
  transitionDuration = undefined
}

const StepConfig = class {
  text = undefined
  textColor = undefined
}

const ProgressBar = class {
  /** @type {HTMLElement|undefined} */
  element = undefined

  /** @type {HTMLElement|undefined} */
  text = undefined

  /** @type {HTMLElement|undefined} */
  loader = undefined

  /** @type {object} */
  conf = {}

  /**
   *
   * @param {HTMLElement} element
   * @param {ProgressBarConfig|object} conf
   */
  constructor(element, conf = {}) {
    this.validate(element, conf)
    this.validateConfiguration(
      conf,
      Object.getOwnPropertyNames(new ProgressBarConfig())
    )

    this.element = element

    this.text = document.createElement('div')
    this.text.classList.add('progressbar', 'text')
    this.text.style.display = 'none'
    this.element.append(this.text)

    this.loader = document.createElement('div')
    this.loader.classList.add('progressbar', 'loader')

    this.configureProgressBar(conf)

    this.element.append(this.loader)
  }

  /**
   *
   * @param {HTMLElement} element
   * @param {ProgressBarConfig|object} conf
   */
  validate (element, conf) {
    if (element === undefined || typeof element !== 'object') {
      throw new Error(`Missing element with class 'progressbar'!`)
    }

    if (conf === undefined || typeof conf !== 'object') {
      throw new Error(`configuration is not an object!`)
    }
  }

  /**
   *
   * @param {ProgressBarConfig|object} conf
   */
  validateConfiguration (conf, propertyList) {
    const suppliedConfigPropertyList = Object.getOwnPropertyNames(conf)

    suppliedConfigPropertyList.forEach(prop => {
      const foundProperty = propertyList.find((propName) => {
        return (propName === prop)
      })

      if (foundProperty === undefined) {
        throw new Error(`Supplied property '${prop}' is not supported!`)
      }
    })
  }

  /**
   *
   * @param {ProgressBarConfig|object} conf
   */
  configureProgressBar (conf) {
    const propertyList = Object.getOwnPropertyNames(conf)

    propertyList.forEach(prop => {
      switch (prop) {
        case 'initText':
          if (typeof conf[prop] !== 'string') {
            this.createError(prop)
          } else {
            this.text.style.display = 'table'
            this.text.innerText = conf.initText
          }

          break;
        case 'borderColor':
        case 'progressColor':
          if (typeof conf[prop] !== 'string') {
            this.createError(prop)
          } else {
            const cssName = '--default-' + prop.replaceAll(/[A-Z]/g, (match) => {
              return `-${match.toLowerCase()}`
            })
            this.element.style.setProperty(cssName, `${conf[prop]}`)
          }

          break;
        case 'width':
        case 'height':
        case 'borderWidth':
        case 'padding':
        case 'radius':
          if (typeof conf[prop] !== 'number') {
            this.createError(prop)
          } else {
            const cssName = '--default-' + prop.replaceAll(/[A-Z]/g, (match) => {
              return `-${match.toLowerCase()}`
            })
            this.element.style.setProperty(cssName, `${conf[prop]}px`)
          }

          break;
        case 'transitionDuration':
          if (typeof conf[prop] !== 'number') {
            this.createError(prop)
          } else {
            const cssName = '--default-' + prop.replaceAll(/[A-Z]/g, (match) => {
              return `-${match.toLowerCase()}`
            })
            this.element.style.setProperty(cssName, `${conf[prop]}s`)
          }

          break;
        default:
          throw new Error(`Supplied property '${prop}' of configuration does not exist!`)
      }
    })
  }

  /**
   *
   * @param {StepConfig|object} conf
   */
  configureStep (conf) {
    const propertyList = Object.getOwnPropertyNames(conf)

    propertyList.forEach(prop => {
      switch (prop) {
        case 'text':
          if (typeof conf[prop] !== 'object') {
            this.createError(prop)
          } else {
            if (conf[prop].fade !== undefined && typeof conf[prop].fade === 'boolean' && conf[prop].fade) {
              this.fadeout(this.text)
            }

            if (conf[prop].value !== undefined && typeof conf[prop].value === 'string') {
              this.text.style.display = 'table'
              this.text.innerText = conf[prop].value
            }

            if (conf[prop].fade !== undefined && typeof conf[prop].fade === 'boolean' && conf[prop].fade) {
              this.fadein(this.text)
            }
          }

          break;
        case 'textColor':
          this.text.style.color = conf[prop]
          break;
        default:
          throw new Error(`Supplied property '${prop}' of configuration does not exist!`)
      }
    })
  }

  /**
   *
   * @param {number} stepPercentage
   * @param {StepConfig|object} conf
   */
  step (stepPercentage, conf = {}) {
    if (typeof stepPercentage !== 'number') {
      this.createError('stepPercentage')
    }

    this.validateConfiguration(
      conf,
      Object.getOwnPropertyNames(new StepConfig())
    )

    this.configureStep(conf)

    this.loader.style.width = `${stepPercentage}%`
  }

  /**
   *
   * @param {HTMLElement} element
   */
  fadeout (element) {
    element.classList.remove('fadein')
    element.classList.add('fadeout')
  }

  /**
   *
   * @param {HTMLElement} element
   */
  fadein (element) {
    element.classList.remove('fadeout')
    element.classList.add('fadein')
  }

  createError (configuration) {
    throw new Error(`'${configuration}' supplied an invalid value`)
  }
}
