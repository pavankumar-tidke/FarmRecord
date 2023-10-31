import React, { useState, useRef } from 'react';
// import { BsPlayFill, BsStopFill, BsDownload } from 'react-icons/bs';
// import { saveAs } from 'file-saver';
import axios from 'axios';

const RecordButton = () => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [chunks, setChunks] = useState([]); 

  const mediaRecorderRef = useRef(null); 

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (e) => {
          console.log('Data available:', e.data);
          if (e.data.size > 0) {
            // setChunks((prev) => [...prev, e.data]);
            setChunks(e.data);
            console.log(e.data);
            console.log(chunks);
          } else {
            console.log(chunks);
            console.log('Data size is 0');
          }
        };
        mediaRecorderRef.current.start();
        setRecording(true);
        console.log('Media recorder started:', mediaRecorderRef.current);
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error);
      });
  };

  const stopRecording = () => {
    console.log(chunks);
    if (mediaRecorderRef.current) {
      console.log(chunks);
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' }); 
        console.log(chunks);
        setAudioBlob(audioBlob);
        sendAudioToBackend(audioBlob);
        // chunks = [];
        setRecording(false);
      };
    }
  };

  const sendAudioToBackend = (blob) => {
    const formData = new FormData();
    formData.append('audio', blob);

    axios
      .post('/your-backend-endpoint', formData)
      .then((response) => {
        console.log('Audio sent to the backend successfully:', response);
      })
      .catch((error) => {
        console.error('Error sending audio to the backend:', error);
      });
  };

  return (
    <div className='py-5 w-full '>
      {recording ? (
        <button className='bg-red-500 p-2 rounded-lg' onClick={stopRecording}>Stop Recording</button>
      ) : (
        <button className='bg-green-500 p-2 rounded-lg' onClick={startRecording}>Start Recording</button>
      )}
      {audioBlob && (
        <audio controls>
          <source src={URL.createObjectURL(audioBlob)} type="audio/webm" />
        </audio>
      )}
    </div>
  );
}

export default RecordButton;