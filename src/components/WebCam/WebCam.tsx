import Webcam from "react-webcam";
import { forwardRef, useImperativeHandle, useRef } from "react";
import "./WebCam.css"

export type WebCamProps = {
  onCapture: (image: string) => void;
};

export type WebCamHandle = {
  capture: () => void;
};

const videoConstraints = {
  width: 300,   // 3
  height: 400,  // 4
  facingMode: "user",
};

const WebCam = forwardRef<WebCamHandle, WebCamProps>(({ onCapture }, ref) => {
  const webcamRef = useRef<Webcam | null>(null);

  useImperativeHandle(ref, () => ({
    capture: () => {
      if (webcamRef.current) {
        const screenshot = webcamRef.current.getScreenshot();
        if (screenshot) {
          onCapture(screenshot);
        }
      }
    },
  }));

  return (
    <Webcam
      className="webcam"
      ref={webcamRef}
      audio={false}
      screenshotFormat="image/jpeg"
      height={400}
      width={300}
      videoConstraints={videoConstraints}
    />
  );
});

export default WebCam;
