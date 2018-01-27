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
  
  friends: {},
  
  handleUsernameClick: function() {
    console.log('hi'); 

    $('.username').on('click', function () {
      if (!app.friends[$(this).text()]) {
        $('#friendList').append('<div class="friends" id="' + $(this).text() + '">' + $(this).text() + '</div>');
        app.friends[$(this).text()] = 1;
      }
      
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
        app.handleUsernameClick();
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
    var user = _.escape(message.username);
    var mess = _.escape(message.text);
    var time = _.escape(message.createdAt);
    var room = _.escape(message.roomname);
    var $container = $('<div class="' + room + '" id="' + user + '"> </div>');
    $container.html('username: ' + '<span class="username">' + user + '</span>' + '<br>' + JSON.stringify(mess) + '<br>' + time);
    // $('#chats').append('<div class="username" class="' + user + '">' + user + '</div>');
    // $('#chats').append('<div class="message">' + JSON.stringify(mess) + '</div>');
    // $('#chats').append('<div class="time">' + time + '</div>'); 
    // $('#chats').append('<div class="room" class="' + room + '">' + room + '</div>'); 
    $('#chats').append($container);
  }, 

  renderRoom: function(message) {
    console.log(message);
    var roomname = message;
    $('#roomSelect').append('<option>' + roomname + '</option>');
  }
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
