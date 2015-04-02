module.exports = {

  info: (message) ->

    console.log('[INFO] ' + message)

  debug: (message) ->

    console.debug('[DEBUG] ' + message)

  warn: (message) ->

    console.warn('[WARN] ' + message)

  error: (message) ->

    console.error('[ERROR] ' + message)

}