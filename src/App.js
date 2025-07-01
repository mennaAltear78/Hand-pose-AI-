import './App.css';
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from 'react-webcam';
import { useRef, useEffect } from 'react';
import { drawHand } from './utilities';

function App() {
  const WebcamRef = useRef(null);
  const canvaRef = useRef(null);

  useEffect(() => {
    const runHandPose = async () => {
      const net = await handpose.load();
      console.log("Hand model loaded");

      setInterval(() => {
        detect(net);
      }, 100);
    };

    runHandPose();
  }, []);

  const detect = async (net) => {
    if (
      typeof WebcamRef.current !== "undefined" &&
      WebcamRef.current !== null &&
      WebcamRef.current.video.readyState === 4
    ) {
      const video = WebcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      // Set video width and height
      video.width = videoWidth;
      video.height = videoHeight;

      // Set canvas width and height
      canvaRef.current.width = videoWidth;
      canvaRef.current.height = videoHeight;

      const hand = await net.estimateHands(video);
      console.log(hand);

      const ctx = canvaRef.current.getContext("2d");

      // Clear canvas before drawing
      ctx.clearRect(0, 0, videoWidth, videoHeight);

      drawHand(hand, ctx);
    }
  };
//should add style to make canva abouve Webcame
  return (
    <div>
      <header>
        <Webcam
          ref={WebcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            width: 640,
            height: 480,
          }}
        />
        <canvas
          ref={canvaRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 10,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default App;
