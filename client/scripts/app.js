// YOUR CODE HERE:
// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };

var app = {
  init: function() {
    app.handleUsernameClick();
    app.handleSubmit();
    app.fetch();
    app.rooms();
  },

  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',

  handleUsernameClick: function() {
    $( '#main .username' ).on('click', function () {
      console.log('click'); 
    });
  },
  
  handleSubmit: function() {
    $( '#main .submit' ).on('click', function () {
      return true; 
    });
  },
  
  send: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
        app.fetch(); 
        app.clearMessages(); 
        location.reload();
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
      data: {
        order: "-createdAt"
      },
      contentType: 'application/json',
      success: function (data) {
        for (var i = 0; i < data['results'].length; i++) {
          app.renderMessage(data['results'][i]);
        }
      },
    });
  },

  rooms: function() {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      data: {
        order: "-createdAt"
      },
      contentType: 'application/json',
      success: function (data) {
        var obj = {};
        for (var i = 0; i < data['results'].length; i++) {
          obj[data['results'][i].roomname] = data['results'][i].roomname;
        }
        for (var key in obj) {
          app.renderRoom(obj[key]);
        }
      },
    });
  },

  clearMessages: function() {
    $('#chats').empty(); 
  }, 

  renderMessage: function(message) {
    var user = message.username;
    var mess = message.text;
    var time = message.createdAt;
    var room = message.roomname;
    $('#chats').append('<div class="username">' + user + '</div>');
    $('#chats').append('<div class="message">' + JSON.stringify(mess) + '</div>');
    $('#chats').append('<div class="time">' + time + '</div>'); 
    $('#chats').append('<div class="room">' + room + '</div>'); 
     
  }, 

  renderRoom: function(message) {
    console.log(message);
    var roomname = message;
    $('#roomSelect').append('<option>' + roomname + '</option>');
  },

};


$(document).on('ready', function() {
  app.init();

  $('#submit').on('click', function () {
    var message = {
      username: name,
      text: $( ':text' ).val(),
      roomname: $('#roomSelect').val()
    };
    app.send(message);
  });

  $('#refresh').on('click', function () {
    location.reload();
  });
  
  $('#name').on('click', function () {
    name = prompt('What is your name?');
    window.location.search = 'username=' + name;  
  });
});
