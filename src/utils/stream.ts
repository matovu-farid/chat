import Peer from 'simple-peer'
export type StreamCallback = (stream: MediaStream) => void;
export type TrackCallback = (track: MediaStreamTrack) => void;
/**Get the local stream */
export async function getLocalStream(): Promise<MediaStream>;
/**Get the local stream and run a callback function with the function */
export async function getLocalStream(callback: StreamCallback): Promise<void>;

export async function getLocalStream(callback?: StreamCallback) {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  if (callback) return callback(stream);
  else return stream;
}
/**Get the local media */
export async function getMediaStream(): Promise<MediaStream>;
/**Get the local media and run a callback function with the function */
export async function getMediaStream(callback: StreamCallback): Promise<void>;

export async function getMediaStream(callback?: StreamCallback) {
  const stream = await navigator.mediaDevices.getDisplayMedia({
    video: true,
  });
  if (callback) return callback(stream);
  else return stream;
}
/**Add audio to the peer on the supplied stream*/
export async function addAudio(stream:MediaStream,peer:Peer.Instance,callback?: StreamCallback) {
  const newStream = await navigator.mediaDevices.getUserMedia({audio:true})
  newStream.getAudioTracks().forEach(track=>{

    peer.addTrack(track,stream)
  })
  if (callback) return callback(stream);
  else return stream;
}

/**Remove audio from the stream */
export async function removeAudio(stream:MediaStream,peer:Peer.Instance,callback?: StreamCallback) {
  stream.getAudioTracks().forEach(track=>{
    peer.removeTrack(track,stream)
  })
  if (callback) return callback(stream);
  else return stream;
}

/**Add video to the peer on the supplied stream*/
export async function addVideo(stream:MediaStream,peer:Peer.Instance,callback?: StreamCallback) {
  const newStream = await navigator.mediaDevices.getUserMedia({video:true})
  newStream.getVideoTracks().forEach(track=>{

    peer.addTrack(track,stream)
  })
  if (callback) return callback(stream);
  else return stream;
}

/**Remove video from the stream */
export async function removeVideo(stream:MediaStream,peer:Peer.Instance,callback?: StreamCallback) {
  stream.getVideoTracks().forEach(track=>{
    peer.removeTrack(track,stream)
  })
  if (callback) return callback(stream);
  else return stream;
}

