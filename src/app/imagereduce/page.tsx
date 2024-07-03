"use client"
import { useRef, useState } from 'react';
import imageCompression from 'browser-image-compression';
import Webcam from 'react-webcam';
import RecordRTC from 'recordrtc';
const Upload = () => {
  const [recording, setRecording] = useState<any>(false);
  const [recordedBlob, setRecordedBlob] = useState<any>(null);
  const recorderRef = useRef<any>(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true,
    });

    const recorder = new RecordRTC(stream, {
      type: 'video',
    });

    recorder.startRecording();
    setRecording(true);
    recorderRef.current = recorder;
  };

  const stopRecording = () => {
    if (recorderRef.current) {
      recorderRef.current.stopRecording(() => {
        setRecording(false);
        const blob = recorderRef.current.getBlob();
        setRecordedBlob(blob);
      });
    }
  };
  console.log(recording, "hhhh");

  const [file, setFile] = useState(null);
  const [compressedImage, setCompressedImage] = useState<any>(null);
  const [compressionRate, setCompressionRate] = useState(0.7);
  const webcamRef = useRef<any>(null);
  const [imageSrc, setImageSrc] = useState(null);
  const captureImage = () => {
    if (webcamRef?.current) {
      const image = webcamRef.current.getScreenshot();
      if (image) {
        setImageSrc(image);
      } else {
        alert('Failed to capture image. Webcam not detected or not accessible.');
      }
    } else {
      alert('Webcam reference not available. Please ensure the webcam is connected and accessible.');
    }
  };
  console.log(captureImage, "saasa");

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleCompressionRateChange = (e: any) => {
    setCompressionRate(e?.target?.value / 100);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!file) {
      alert('Please upload a file first!');
      return;
    }

    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
        initialQuality: compressionRate,
      };

      const compressedFile = await imageCompression(file, options);
      const compressedFileDataUrl = await imageCompression.getDataUrlFromFile(compressedFile);

      setCompressedImage(compressedFileDataUrl);
    } catch (error) {
      console.error('Error compressing the image:', error);
    }
  };
  console.log(imageSrc, "imageSrc");

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm uploadForm">
        <h2 className="mb-4 text-center">Photo Size Reducer</h2>
        <div className="mb-4 d-flex align-items-center">
          <input type="file" accept="image/*" onChange={handleFileChange} className="form-control" />
          <button type="button" onClick={captureImage} className="btn btn-secondary">Camera</button>
        </div>

        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={320}
          height={240}
        />
        {imageSrc && (
          <div>
            <h3>Captured Image:</h3>
            <img src={imageSrc} alt="Captured" className="img-fluid" />
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="compressionRate" className="form-label">Compression Rate:</label>
          <input
            type="range"
            id="compressionRate"
            name="compressionRate"
            min="1"
            max="100"
            value={compressionRate * 100}
            onChange={handleCompressionRateChange}
            className="form-range"
          />
          <span>{compressionRate * 100}%</span>
        </div>
        <button type="submit" className="btn btn-primary w-100">Compress Image</button>
      </form>
      {compressedImage && (
        <div className="mt-5 text-center">
          <h3>Compressed Image:</h3>
          <img src={compressedImage} style={{height: "450px"}} alt="Compressed" className="img-fluid compressedImage" />
        </div>
      )}
      <style jsx>{`
          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
      
          .uploadForm {
            background: #fff;
            border-radius: 8px;
          }
          .text-center {
            text-align: center;
          }
          .mb-4 {
            margin-bottom: 1.5rem;
          }
          .d-flex {
            display: flex;
          }
          .align-items-center {
            align-items: center;
          }
          .form-control {
            width: calc(100% - 130px);
            margin-right: 10px;
          }
          .btn-secondary {
            width: 120px;
          }
          .img-fluid {
            max-width: 100%;
            height: auto;
          }
          .shadow-sm {
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          }
          .form-range {
            width: 100%;
          }
          .w-100 {
            width: 100%;
          }
        `}</style>
    </div>
  );
};

export default Upload;
