# Chat socket events

An socket event is a data transmission from the back-end to the front-end or from the front-end to the back-end.
Data transmission is represented by a name and transmitted data.

**Library :**

* [Socket.IO](https://socket.io/)

![Chat events](images/chat_socket_events.svg)

## Create new chat room

---

> ### name:  **createTchat**

This event is triggered whenever user wants to create a chat room.

**Emitter :** ReactJs app <br>
**Receiver :** NodeJs Server

**data :** null

---

## Join chat room events:

---

## a) Request

> ### name: **joinTchat**

This event is triggered whenever user wants to join a chat room or after creating one.

**Emitter :** ReactJs app <br>
**Receiver :** NodeJs Server

**data :** tchat code of room to join *(string)*

---

## b) Response

> ### name: **tchatJoined**

This event is the server response after joining request.

**Emitter :** NodeJs Server <br>
**Receiver :** ReactJs app

**data :** tchat code of joined room *(string)*

---

## Leave chat events:

---

## a) Request

> ### name: **leaveTchat**

This event is triggered whenever user wants to leave a chat room.

**Emitter :** ReactJs app <br>
**Receiver :** NodeJs Server

**data :** null

---

## b) Response

> ### name: **tchatLeft**

This event is the server response after leaving request.

**Emitter :** NodeJs Server <br>
**Receiver :** ReactJs app

**data :** null

---

## Update chat room members list:

---

> ### name: **usersListUpdate**

This event is triggered whenever user joind or left a chat room. The server will update users list and send it to chat members.

**Emitter :** NodeJs Server <br>
**Receiver :** ReactJs app

**data :** 

* *users* : New list of chat members *(Array of User)*
* *targetUser* : Last user that joined or left tchat *(User)*
* *joined* : true if this update is trigged because user joined chat room, otherwise false.

---

## Send messages events:

---

## a) Request

> ### name: **sendMessage**

This event is triggered whenever user sends textual message, image or file.

**Emitter :** ReactJs app <br>
**Receiver :** NodeJs Server

**data :**

* *content* : Textual message *(string)*
* *file* : File to send (can be null) *(JS object)*
    * *name* : Name of file *(string)*
    * *type* : Type of file *(string)*
    * *data* : File data in a 8 bits array *(Uint8Array)*

---

## b) Response

> ### name: **receiveMessage**

This event is the server response after a user sent a message. The server send the message to all members of chat room of sender.

**Emitter :** NodeJs Server <br>
**Receiver :** ReactJs app (all room members)

**data :**

* *user* : Message sender
  * *name* : username
  * *picture* url of user profile picture
* *msg* : Sent message
  * *content* : Textual message *(string)*
  * *file* : File to send (can be null) *(JS object)*
    * *name* : Name of file *(string)*
    * *type* : Type of file *(string)*
    * *data* : File data in the 8 bits array *(Uint8Array)*

---
