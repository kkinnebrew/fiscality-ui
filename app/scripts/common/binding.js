module.exports = {

  handle: function(e, event, message, arguments) {

    console.log('handing');

    return {
      message: message,
      arguments: arguments
    }

  }

};