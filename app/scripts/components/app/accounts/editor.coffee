Component = require('../../component.coffee')
template = require('./editor.hbs')
_ = require('underscore')

class EditorComponent extends Component

  constructor: ->

    super

    @original = JSON.parse(JSON.stringify(@model))

  getTemplate: -> return template()

  render: ->

    super

    @$el.find('.line-editor').hide()

    @$el.find('.save-subrow').hide()

    @$el.on 'click', '[data-model="accountNames"]', =>
      @$el.find('.line-editor').toggle()
      if @$el.hasClass('expanded')
        @$el.removeClass('expanded')
      else
        @$el.addClass('expanded')


  onChange: ->

    @changed = true
    
    @$el.find('.save-subrow').show()

module.exports = EditorComponent