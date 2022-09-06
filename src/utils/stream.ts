import Peer from "simple-peer";
export type StreamCallback = (stream: MediaStream) => void;
export type TrackCallback = (stream: MediaStreamTrack) => void;
export type TrackChecker = (peer: Peer.Instance) => boolean;
export type BooleanSetter = React.Dispatch<React.SetStateAction<boolean>>;
export type TrackEditor = (
  peer: Peer.Instance | null,
  callback?: StreamCallback
) => boolean;
/**Get the local stream */
export async function getLocalStream(): Promise<MediaStream>;
/**Get the local stream and run a callback function with the function */
export async function getLocalStream(callback: StreamCallback): Promise<void>;

export async function getLocalStream(callback?: StreamCallback) {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      autoGainControl: false,
      channelCount: 2,
      echoCancellation: true,
      latency: 0,
      noiseSuppression: true,
      sampleRate: 48000,
      sampleSize: 16,
    },
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

/**Add audio to the peer on the supplied stream*/
export function addAudio(
  peer: Peer.Instance | null,
  callback?: StreamCallback
) {
  if (peer === null) throw "There is no peer";
  const stream = peer.streams[0];
  if (stream)
    stream.getAudioTracks().forEach((track) => {
      track.enabled = true;
      if (callback) callback(stream);
      return stream;
    });
  return false;
}

/**Remove audio from the stream */
export function removeAudio(
  peer: Peer.Instance | null,
  callback?: StreamCallback
) {
  if (peer === null) throw "There is no peer";
  const stream = peer.streams[0];
  if (stream) {
    stream.getAudioTracks().forEach((track) => {
      track.enabled = false;
    });
    if (callback) callback(stream);
    return true;
  }
  return false;
}

/**Add video to the peer on the supplied stream*/
export function addVideo(
  peer: Peer.Instance | null,
  callback?: StreamCallback
) {
  if (peer === null) throw "There is no peer";
  const stream = peer.streams[0];
  if (stream)
    stream.getVideoTracks().forEach((track) => {
      track.enabled = true;
      if (callback) return callback(stream);
      return true;
    });
  return false;
}

/**Remove video from the stream */
export function removeVideo(
  peer: Peer.Instance | null,
  callback?: StreamCallback
) {
  if (peer === null) throw "There is no peer";
  const stream = peer.streams[0];

  if (stream) {
    stream.getVideoTracks().forEach((track) => {
      track.enabled = false;
      if (callback) callback(stream);
      return true;
    });
  }
  return false;
}
/**Get the local video stream */
export async function screenShare(
  peer: Peer.Instance | null,
  callback?: TrackCallback
) {
  if (peer === null) throw "There is no peer";
  const stream = await navigator.mediaDevices.getDisplayMedia({
    video: true,
  });
  const localStream = peer.streams[0];
  if (!localStream) return;
  const screenSharetrack = stream.getVideoTracks()[0]
  const videotrack = localStream.getVideoTracks()[0];
  if (!videotrack || !screenSharetrack) return;
  peer.replaceTrack(videotrack, screenSharetrack, localStream);

  if (callback) return callback(screenSharetrack);
  else return stream;
}
/**Stops the screen sharing by stoping all tracks associated with the stream and returns whether it has done the job */
export async function stopScreenShare(
  peer: Peer.Instance | null,
  callback?: StreamCallback
) {
  if (peer === null) throw "There is no peer";
  const stream = peer.streams[0];
  if (!stream) throw "no stream";

  const localVideo = (await getLocalStream()).getVideoTracks()[0];
  if (!localVideo) throw "No local video";
  const screenShare = stream.getVideoTracks()[0];
  if(!screenShare) throw "Screen is not shared"
  peer.replaceTrack(screenShare, localVideo, stream);
  if (callback) return callback(stream);
  else return stream;

  return false;
}

/**Remove the local video stream */
export function addAudioMedia(
  peer: Peer.Instance | null,
  callback?: StreamCallback
) {
  if (peer === null) throw "There is no peer";
  const stream = peer.streams[1];
  if (stream) {
    stream.getAudioTracks().forEach((track) => {
      track.enabled = true;
    });
    if (callback) callback(stream);
    return true;
  }
  return false;
}
/**Remove the local video stream */
export function removeAudioMedia(
  peer: Peer.Instance | null,
  callback?: StreamCallback
) {
  if (peer === null) throw "There is no peer";
  const stream = peer.streams[1];
  if (stream) {
    stream.getAudioTracks().forEach((track) => {
      track.enabled = false;
    });
    if (callback) callback(stream);
    return true;
  }
  return false;
}
/**Stop the local video stream */
export function stopLocalVideo(
  stream: MediaStream | null,
  callback?: StreamCallback
) {
  if (stream === null) throw "The stream is null";
  stream.getVideoTracks().forEach((track) => {
    track.enabled = false;

    if (callback) callback(stream);
    return true;
  });
  return false;
}

/**Start the local video stream */
export function startLocalVideo(
  stream: MediaStream | null,
  callback?: StreamCallback
) {
  if (stream === null) throw "The stream is null";
  stream.getVideoTracks().forEach((track) => {
    track.enabled = true;

    if (callback) callback(stream);
    return true;
  });
  return false;
}
export function startLocalAudio(
  stream: MediaStream | null,
  callback?: StreamCallback
) {
  if (stream === null) throw "The stream is null";
  stream.getAudioTracks().forEach((track) => {
    track.enabled = true;

    if (callback) callback(stream);
    return true;
  });
  return false;
}

export function stopLocalAudio(
  stream: MediaStream | null,
  callback?: StreamCallback
) {
  if (stream === null) throw "The stream is null";
  stream.getAudioTracks().forEach((track) => {
    track.enabled = false;

    if (callback) callback(stream);
    return true;
  });
  return false;
}