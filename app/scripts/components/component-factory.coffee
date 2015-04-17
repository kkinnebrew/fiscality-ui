library = {}

module.exports = {

  registerInstance: (name, pkg) ->

    library[name] = pkg

  getInstance: (name, $el, model, scope) ->

    return null if !library.hasOwnProperty(name)

    obj = library[name]

    return new obj($el, model, scope)

}