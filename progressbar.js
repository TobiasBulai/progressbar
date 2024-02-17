const ProgressBarConfig = class {
  initText = undefined
  width = undefined
  height = undefined
  borderWidth = undefined
  borderColor = undefined
  padding = undefined
  radius = undefined
  progressColor = undefined
}

const StepConfig = class {
  text = undefined
  textColor = undefined
}

const ProgressBar = class {
  element = undefined // HTMLElement
  text = undefined // HTMLElement
  loader = undefined // HTMLElement
  conf = {}

  /**
   *
   * @param {HTMLElement} element
   * @param {ProgressBarConfig|object} conf
   */
  constructor(element, conf = {}) {
    try {
      this.validate(element, conf)

      this.element = element

      this.text = document.createElement('div')
      this.text.classList.add('progressbar', 'text')
      this.text.style.display = 'none'
      this.element.append(this.text)

      this.loader = document.createElement('div')
      this.loader.classList.add('progressbar', 'loader')

      this.configureProgressBar(conf)

      this.element.append(this.loader)
    } catch (error) {
      console.error(error)
    }
  }

  /**
   *
   * @param {ProgressBarConfig|object} conf
   */
  configureProgressBar (conf) {
    if (conf.initText !== undefined) {
      this.text.style.display = 'table'
      this.text.innerText = conf.initText
    }

    if (conf.width !== undefined) {
      this.element.style.setProperty('--default-width', `${conf.width}px`)
    }

    if (conf.height !== undefined) {
      this.element.style.setProperty('--default-height', `${conf.height}px`)
    }

    if (conf.borderWidth !== undefined) {
      this.element.style.setProperty('--default-border-width', `${conf.borderWidth}px`)
    }

    if (conf.borderColor !== undefined) {
      this.element.style.setProperty('--default-border-color', conf.borderColor)
    }

    if (conf.padding !== undefined) {
      this.element.style.setProperty('--default-padding', `${conf.padding}px`)
    }

    if (conf.radius !== undefined) {
      this.element.style.setProperty('--default-radius', `${conf.radius}px`)
    }

    if (conf.progressColor !== undefined) {
      this.element.style.setProperty('--default-progress-color', conf.progressColor)
    }
  }

  /**
   *
   * @param {number} stepPercentage
   * @param {StepConfig|object} conf
   */
  step (stepPercentage, conf = {}) {
    if (conf.text !== undefined) {
      this.fadeout(this.text)
      this.text.style.display = 'table'
      this.text.innerText = conf.text
      this.fadein(this.text)
    }

    if (conf.textColor !== undefined) {
      this.text.style.color = conf.textColor
    }

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
}
