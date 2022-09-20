enum SocketEvent {
  iam_online = "iam_online",
  are_you_online = "are_you_online",
  ringing = "ringing",
  clientInfo = "clientInfo",
  serverMessege = "serverMessege",
}
enum RoomEvent {
  joinRooms = "joinRooms",
  joinRoom = "joinRoom",
  leaveRoom = "leaveRooom",
}
enum MessageEvent {
  sendMessege = "sendMessege",
  sendPrivateMessage = "sendPrivateMessage",
  chat = "chat",
  privateChat = "privateChat",
}
enum CallEvent {
  callUser = "callUser",
  callRejected = "callRejected",
  answerCall = "answerCall",
  answered = "answered",
  called = "called",
  startRoomCall = "startRoomCall",
  sendOffer = "sendOffer",
}
enum PeerEvent {
  connect = "connect",
  stream = "stream",
  close = "close",
  signal = "signal",
  track = "track",
  data = "data",
  end = "end",
  error = "error",
  pause = "pause",
  resume = "resume",
  readable = "readable",
}
export { SocketEvent, MessageEvent, RoomEvent, CallEvent, PeerEvent };
