// // YOUR CODE HERE:
// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };

var app = {
  init: function() {
    $( '#main .username' ).on('click', app.handleUsernameClick);
  },

  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',

  send: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: message,
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  fetch: function() {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      data: message,
      contentType: 'application/json',
      success: function (data) {
        app.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  clearMessages: function() {
    $('#chats').empty(); 
  }, 

  renderMessage: function(message) {
    $('#chats').append('<div class="username">' + message + '</div>'); 
  }, 

  renderRoom: function(room) {
    $('#roomSelect').append('<div>' + room + '</div>');
  },
  
  handleUsernameClick: function() {
    return true; 
  } 
};


