$ = require('jquery')
_ = require('underscore')
Log = require('./log.coffee')

class View

  constructor: (template, viewmodel) ->

    @template = template

    @$el = null

    @rendered = false

    @viewmodel = viewmodel || null

  render: ($el) ->

    return if @rendered

    @$el = $el

    html = if typeof @template == 'function' then @template(@viewmodel || {}) else @template

    @$el.html(html)

    @bind()

    @viewmodel.on('refresh', @refresh) if @viewmodel

    @rendered = true

  getSubview: (name) ->

    selector = if name and name != 'default' then '[ui-view="' + name + '"]' else '[ui-view]'

    subview = @$el.find(selector)

    if !subview.length
      Log.warn('Subview' + (if name then ' with name "' + name  + '"' else '')  + ' not found')

    return subview

  renderSubview: (name, view) ->

    $subview = @getSubview(name);

    view.render($subview) if $subview

  bind: ->

    if @bindings
      _.each @bindings, (events, selector) =>
        _.each events, (callback, event) =>
          if typeof this[callback] == 'function'
            @$el.on(event, selector, this[callback])

  unbind: ->

    if @bindings
      _.each @bindings, (events, selector) =>
        _.each events, (callback, event) =>
          if typeof this[callback] == 'function'
            @$el.off(event, selector, this[callback])

  refresh: =>

    return Log.warn('Cannot refresh unrendered view') if !@rendered

    that = this

    @unbind()

    $subviews = @$el.find('[ui-view]')

    @$el.empty()

    html = if typeof @template == 'function' then @template(@viewmodel || {}) else @template

    @$el.html(html)

    @bind()

    $subviews.each ->
      name = $(this).attr('ui-view')
      if name
        that.$el.find('[ui-view="' + name + '"]').replaceWith(this);
      else
        that.$el.find('[ui-view]').replaceWith(this);

    Log.debug('Refreshing view')

  destroy: ->

    return if !@rendered

    @viewmodel.detach('refresh', @refresh) if @viewmodel

    @unbind()

    @$el.empty()

    @$el = null

    @rendered = false

module.exports = View