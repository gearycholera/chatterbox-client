// YOUR CODE HERE:
// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };
var roomsObj = {};

var app = {
  init: function() {
    app.handleUsernameClick();
    app.handleFriendClick(); 
    app.handleSubmit();

    app.fetch();
    app.rooms();
  },

  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',

  friends: {},
  
  handleUsernameClick: function() {

    $('.username').on('click', function () {
      if (!app.friends[$(this).text()]) {
      //id="' + $(this).text() + '"
        var $buddy = $('<div class="friendName"> </div>');
        $buddy.html('<div id="' + $(this).text() + '">' + $(this).text() + '</div>');
        $('#friendList').append($buddy);
        app.friends[$(this).text()] = 1;
        app.init();
      }
      
    }); 
  },
  
  roomPicker: function() {
    var temproom = $('#roomSelect').val();
    $('#chats').empty();
    app.fetch(temproom);
  },

  handleFriendClick: function () {
    $('.friendName').on('click', function () {
      $('#chats').empty();
      app.fetch($(this).text());
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
        app.init();
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  fetch: function(name) {
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
          if (name === undefined) {
            app.renderMessage(data['results'][i]);
          }
         
          if (name === data['results'][i].username) {
            app.renderMessage(data['results'][i]);
          }
          
          if (name === data['results'][i].roomname) {
            app.renderMessage(data['results'][i]);
          }
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
        $('#roomSelect').empty();
        for (var i = 0; i < data['results'].length; i++) {
          roomsObj[data['results'][i].roomname] = data['results'][i].roomname;
        }
        for (var key in roomsObj) {
          app.renderRoom(roomsObj[key]);
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
    $container.html('username: ' + '<span class="username">' + user + '</span>' + '<br>' + JSON.stringify(mess) + '<br>' + time + '<br>' + room);
    // $('#chats').append('<div class="username" class="' + user + '">' + user + '</div>');
    // $('#chats').append('<div class="message">' + JSON.stringify(mess) + '</div>');
    // $('#chats').append('<div class="time">' + time + '</div>'); 
    // $('#chats').append('<div class="room" class="' + room + '">' + room + '</div>'); 
    $('#chats').append($container);
  }, 

  renderRoom: function(message) {
    var roomname = message;
    $('#roomSelect').append('<option class="channels">' + roomname + '</option>');
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
    app.fetch(); 
    app.clearMessages(); 
    app.init();
  });
  
  $('#name').on('click', function () {
    name = prompt('What is your name?');
    window.location.search = 'username=' + name;  
  });
  
  $('#delete').on('click', function () {
    $('#chats').empty();
  });
  
  $('#addRoom').on('click', function () {
    var newRoom = prompt('What is the name of your new room?');
    $('#chats').empty();
  });

  
});
