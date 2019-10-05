import Component from './component.js'

export default class Applcation {
  constructor (options) {
    this.options = options
    this.allComponentsLoaded = false
    return this.createComponents().then(() => {
      return Promise.resolve(this)
    })
  }

  createComponents () {
    const components = this.options.components
    const loadedComponents = Object.keys(components).map((component) => {
      Component.create(component, components[component])
    })

    return Promise.all(loadedComponents).then(() => {
      this.allComponentsLoaded = true
    })
  }
}
