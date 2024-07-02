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
    console.log(recording,"hhhh");
    
    const [file, setFile] = useState(null);
    const [compressedImage, setCompressedImage] = useState<any>(null);
    const [compressionRate, setCompressionRate] = useState(0.7);
    const webcamRef = useRef<any>(null);
    const [imageSrc, setImageSrc] = useState(null);
    const captureImage = () => {
        if (webcamRef.current) {
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
        setCompressionRate(e.target.value / 100);
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

    return (
        <div className='container'>

            <div>
                {!recording ? (
                    <button onClick={startRecording}>Start Recording</button>
                ) : (
                    <button onClick={stopRecording}>Stop Recording</button>
                )}
                {recordedBlob && (
                    <video controls src={window.URL.createObjectURL(recordedBlob)} />
                )}
            </div>
            <div className="row mt-5">
                <div className="col-md-8 offset-md-2">
                    <form onSubmit={handleSubmit} className="card p-4 shadow-sm uploadForm">
                        <h2 className="mb-4 text-center">Photo Size Reducer</h2>
                        <div className="mb-4">
                            <input type="file" accept="image/*" onChange={handleFileChange} className="form-control" />
                        </div>
                        <div className='mb-4'>
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
                            <img src={compressedImage} alt="Compressed" className="img-fluid compressedImage" />
                        </div>
                    )}
                </div>
            </div>
            <div className="row">
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={320}
                    height={240}
                />
                <button onClick={captureImage} className='mb-5'>Capture Image</button>
                {imageSrc && (
                    <div className=''>
                        <h3>Captured Image:</h3>
                        <img src={imageSrc} alt="Captured" />
                    </div>
                )}

            </div>
            <style jsx>{`
        .uploadForm {
          background-color: #f8f9fa;
          border-radius: 10px;
        }
        .compressedImage {
          max-width: 100%;
          border: 1px solid #ddd;
          border-radius: 5px;
          padding: 5px;
        }
      `}</style>
        </div>
    );
};

export default Upload;
