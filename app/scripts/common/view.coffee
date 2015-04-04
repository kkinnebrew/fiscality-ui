$ = require('jquery')
_ = require('underscore')
Log = require('./log.coffee')

class View

  constructor: (template, viewmodel) ->

    @template = template

    @$el = null

    @rendered = false

#    @queue = []
#    @running = false
#    @process

    @viewmodel = viewmodel || null
#
#  add: (fn, args, wait) ->
#
#    @queue.push({ fn: fn, args: args, wait: wait })
#
#    @next() if !@running
#
#    return this
#
#  next: ->
#
#    @running = true
#
#    next = @queue.shift()
#
#    if next
#      next.fn.apply(this, next.args)
#      if next.wait and next.wait > 0
#        @process = setTimeout =>
#          @next()
#        , next.wait
#    else
#      @running = false
#
#  stop: ->
#
#    @queue = []
#
#    if @process
#      clearTimeout(@process)
#      next()
#
#    return this

  render: ($el) ->

    return if @rendered

    @$el = $el

    html = if typeof @template == 'function' then @template(@viewmodel || {}) else @template

    @$el.html(html)

    @bind()

    @viewmodel.on('refresh', @refresh)
    @viewmodel.on('change', @change)

    @rendered = true

    setTimeout =>
      @$el.addClass('rendered')
    , 100

  getSubview: (name) ->

    selector = if name and name != 'default' then '[ui-view="' + name + '"]' else '[ui-view]'

    subview = @$el.find(selector)

    if !subview.length
      Log.warn('Subview' + (if name then ' with name "' + name  + '"' else '')  + ' not found')

    return subview

  renderSubview: (name, view) ->

    $subview = @getSubview(name);

    view.render($subview) if $subview

  sync: ->

    data = {}

    @$el.find('[data-model]').each ->

      model = $(this).attr('data-model')
      tagName = $(this).prop('tagName').toLowerCase()

      if tagName == 'input' or tagName == 'textarea' or tagName == 'select'
        data[model] = $(this).val()
      else if tagName == 'div' or tagName == 'span'
        data[model] = $(this).text()

    @viewmodel.setParams(data)

  bind: ->

    if @bindings
      _.each @bindings, (events, selector) =>
        _.each events, (callback, event) =>
          if typeof this[callback] == 'function'
            @$el.on(event, selector, this[callback])

    @$el.on 'click', '[data-link]', (e) =>
      link = $(e.currentTarget).attr('data-link')
      if link
        @viewmodel.goto(link)

    that = this

    @$el.find('[data-bind]').each ->
      bind = $(this).attr('data-bind')
      parts = bind.match(/(.+):(.+)\((.*)\)/)
      event = parts[1]
      method = parts[2]
      args = if parts[3] then parts[3].replace(/\s/g, '').split(',') else []

      $(this).on event, (e) ->
        e.preventDefault()
        that.sync()
        that.viewmodel.run(method, args)

  unbind: ->

    if @bindings
      _.each @bindings, (events, selector) =>
        _.each events, (callback, event) =>
          if typeof this[callback] == 'function'
            @$el.off(event, selector, this[callback])

    @$el.off('click', '[data-link]')

    @$el.find('[data-bind]').each ->
      bind = $(this).attr('data-bind')
      parts = bind.match(/(.+):(.+)\((.*)\)/)
      event = parts[1]

      $(this).off(event)

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

    Log.debug('Refreshing view "' + @constructor.name + '"')

  change: =>

    return if !@rendered

    if @viewmodel.loading
      @$el.addClass('loading')
    else
      @$el.removeClass('loading')

    if @viewmodel.inactive
      @$el.addClass('inactive')
    else
      @$el.removeClass('inactive')

  destroy: (callback) ->

    return if !@rendered

    @viewmodel.detach('refresh', @refresh) if @viewmodel

    @$el.removeClass('rendered')

    @unbind()

    @$el.empty()

    @$el = null

    @rendered = false

    if callback
      callback.call(this)

module.exports = View