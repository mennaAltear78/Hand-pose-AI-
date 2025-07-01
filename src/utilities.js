const finguerJoints = {
  thumb: [0, 1, 2, 3, 4],
  indexfinger: [0, 5, 6, 7, 8],
  middleFinguer: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20], 
};

export const drawHand = (predictions, ctx) => {
  if (predictions.length > 0) {
    predictions.forEach(prediction => {
      const landmarks = prediction.landmarks;

     //draw join lines
      const fingerKeys = Object.keys(finguerJoints);
      for (let j = 0; j < fingerKeys.length; j++) {
        const finger = finguerJoints[fingerKeys[j]];
        for (let k = 0; k < finger.length - 1; k++) {
          const firstJoinIndex = finger[k];
          const secondJoinIndex = finger[k + 1];

          ctx.beginPath();
          ctx.moveTo(
            landmarks[firstJoinIndex][0],
            landmarks[firstJoinIndex][1]
          );
          ctx.lineTo(
            landmarks[secondJoinIndex][0],
            landmarks[secondJoinIndex][1]
          );
          ctx.strokeStyle = "plum";
          ctx.lineWidth = 4;
          ctx.stroke(); // مهم جدًا
        }
      }

    //draw ponits
      for (let i = 0; i < landmarks.length; i++) {
        const x = landmarks[i][0];
        const y = landmarks[i][1];
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 3 * Math.PI);
        ctx.fillStyle = "aqua";
        ctx.fill();
      }
    });
  }
};
  