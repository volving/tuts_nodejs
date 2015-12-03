var net = require('net');
var chat_server = net.createServer();

var client_list = [];
var addrport_client_map = {}; //(addr:port)-obj
var nickname_addport_map = {}; // nickName - (addr:port)


chat_server.on('connection', function(client) {
    var client_name_str = client.remoteAddress + ':' + client.remotePort;
    var client_obj = {
        name_str: client_name_str,
        client_obj: client,
        message_list: []
    };
    var index_number = client_list.length;
    client_list.push(client_obj);

    addrport_client_map[client_name_str] = client_obj;
    //	nickname_addport_map
    var incoming_message_str = '';
    client.on('data', function(data) {
        incoming_message_str = data.toString();
        client_obj.message_list.push[incoming_message_str];
        send_message(incoming_message_str, client_name_str);
    });
    client.on('end', function() {
        client_list.splice(index_number, 1);
        delete addrport_client_map[client_name_str];
        broadcast_message('~~~'.concat(client_name_str, ' has left'));
    });
});

var get_client = function(client_name_str) {
    // addr:port
    if (client_name_str.indexOf(':') > -1) {
        return addrport_client_map[client_name_str];
    }
    return addrport_client_map[nickname_addport_map[client_name_str]];
};
var broadcast_message = function(msg_str, sender_str) {
    if (msg_str) {
        if (sender_str) {
            msg_str = '~~~'.concat(sender_str, ': ', msg_str);
        }
        client_list.map(function(item) {
            if (item.name_str !== sender_str) {
                item.client_obj.write(msg_str);
            }
        });
    }
};

var sendto_message = function(msg_str, to_whom_str, sender_str) {
    if (msg_str) {
        var target_client_obj = get_client(to_whom_str); // client_list[arguments[0]];
        if (sender_str) {
            msg_str = sender_str.concat(': ', msg_str);
        }
        if (target_client) {
            target_client.client_obj.write(msg_str);
        } else {
            broadcast_message(msg_str, sender_str);
        }
    }
};

var mode_message = function(msg_str) {
    var msg_obj = {};
    if (msg_str) {
        var reg = /^(?:(\w*)>([\w, ;]*)#)?([\w\W]*)/i;
        var segment_list = msg_str.match(reg);
        if (segment_list[1]) {
            msg_obj['verb_str'] = segment_list[1];
        }
        if (segment_list[2]) {
            msg_obj['name_list'] = segment_list[2].split(/[,;]/i).map(function(elt, i) {
                return elt.trim();
            });
        }
        if (segment_list[3]) {
            msg_obj['msg_str'] = segment_list[3];
        }
    }
    return msg_obj;
};

var send_message = function(msg_str, sender_str) {
    var msg_obj = mode_message(msg_str);
    if (msg_obj.name_list) {
        msg_obj.name_list.map(function(elm, index) {
            sendto_message(msg_obj.msg_str, elm, sender_str);
        });
    } else {
        broadcast_message(msg_obj.msg_str, sender_str);
    }
};



var PORT = process.env.PORT || 7777;
chat_server.listen(PORT, function() {
    console.log('Server starts listening PORT: ' + PORT);
});
