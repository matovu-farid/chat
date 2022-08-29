import Peer from 'simple-peer'
export type StreamCallback = (stream: MediaStream) => void;
export type TrackChecker = (peer: Peer.Instance)=> boolean
export type BooleanSetter = React.Dispatch<React.SetStateAction<boolean>>
export type TrackRemover = (peer: Peer.Instance, callback?: StreamCallback)=> void | MediaStream
export type TrackAdder = (peer: Peer.Instance | null, callback?: StreamCallback)=> Promise<void | MediaStream>
/**Get the local stream */
export async function getLocalStream(): Promise<MediaStream>;
/**Get the local stream and run a callback function with the function */
export async function getLocalStream(callback: StreamCallback): Promise<void>;

export async function getLocalStream(callback?: StreamCallback) {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: {
      width: {
        min: 640,
        max: 1024,
      },
      height: {
        min: 480,
        max: 768,
      },
    },
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
export async function addAudio(peer:Peer.Instance|null,callback?: StreamCallback) {
  if(peer === null) throw 'There is no peer'
  const stream = peer.streams[0]
 if(stream)
  stream.getAudioTracks().forEach(track=>{
    track.enabled = true
  })
  if (callback && stream) return callback(stream);
  else return stream;
}

/**Remove audio from the stream */
export function removeAudio(peer:Peer.Instance|null,callback?: StreamCallback) {
  if(peer === null) throw 'There is no peer'
  const stream = peer.streams[0]
  if(stream){
  stream.getAudioTracks().forEach(track=>{
    track.enabled = false
  })
  if (callback) return callback(stream);
  else return stream;
}
}

/**Add video to the peer on the supplied stream*/
export async function addVideo(peer:Peer.Instance|null,callback?: StreamCallback) {
  if(peer === null) throw 'There is no peer'
  const stream = peer.streams[0]
 if(stream)
  stream.getVideoTracks().forEach(track=>{
    track.enabled = true
  })
  if (callback && stream) return callback(stream);
  else return stream;
}

/**Remove video from the stream */
export function removeVideo(peer:Peer.Instance|null,callback?: StreamCallback) {
  if(peer === null) throw 'There is no peer'
  const stream = peer.streams[0]

  if(stream){
  stream.getVideoTracks().forEach(track=>{
    track.enabled = false
  })
  
  if (callback) return callback(stream);
  else return stream;
}

}


