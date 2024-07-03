"use client"
import React, { useRef, useState } from 'react';
import RecordRTC from 'recordrtc';

const Page = () => {
    const [recording, setRecording] = useState(false);
    const [recordedBlob, setRecordedBlob] = useState(null);
    const [uploadedVideo, setUploadedVideo] = useState<any>(null);
    const recorderRef = useRef<any>(null);
    const [videoURL, setVideoURL] = useState<string>('');
    const [compressedVideo, setCompressedVideo] = useState<string | null>(null);
    const [recordedUrl, setRecordedUrl] = useState<any>(null);
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
        if (recorderRef?.current) {
            recorderRef?.current.stopRecording(() => {
                setRecording(false);
                const blob = recorderRef?.current.getBlob();
                setRecordedBlob(blob);
                const url = URL.createObjectURL(blob);
                setRecordedUrl(url); 
                console.log('Recorded Video Blob:', url);
            });
        }
    };

    const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event?.target?.files?.[0];
        if (file) {
            setUploadedVideo(URL.createObjectURL(file));
            setCompressedVideo(null);
        }
    };

    const reduceVideoSize = async () => {
        if (uploadedVideo||recordedUrl) {
            try {
                const compressedUrl = await compressVideoWithAI(uploadedVideo?uploadedVideo:recordedUrl);
                setCompressedVideo(compressedUrl);
            } catch (error) {
                console.error('Error compressing video:', error);
            }
        }
    };

    const compressVideoWithAI = async (videoUrl: string): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            setTimeout(() => {
                const compressedUrl = `${videoUrl}?compressed=true`; 
                resolve(compressedUrl);
            }, 1000); 
        });
    };

let url:any = compressedVideo;

let cleanUrl = url ? url.split('?')[0] : '';
console.log(recordedUrl,"recordedUrl");

    return (
        <div style={styles.container}>
            <div style={styles.recordContainer}>
                <div className="mb-2">

                {!recording ? (
                    <button style={styles.button} onClick={startRecording}>Start Recording</button>
                ) : (
                    <button style={styles.button} onClick={stopRecording}>Stop Recording</button>
                )}
                </div>
                {recordedUrl && (
                    <>
                <div className='mb-2'>
                    <video controls src={recordedUrl} style={styles.video} />
                </div>
                    <a href={recordedUrl} download="recorded-video.webm">Download Video</a>
                    </>
            )}
            </div>
            <div style={styles.uploadContainer}>
            <input type="file" accept="video/*" onChange={handleVideoUpload} />
            {uploadedVideo||recordedUrl && (
                <>
                <div className='mt-3'>
                    <video controls src={uploadedVideo||recordedUrl} width="400" />
                </div>
                <div className="mt-3">

                    <button onClick={reduceVideoSize}>Reduce Video Size</button>
                </div>
                {compressedVideo && (
                        <div className='mt-3'>
                            <p>Compressed Video:</p>
                            <video controls src={cleanUrl} width="400"/>
                        
                        </div>
                    )}
                    </>
            )}
            </div>
            {/* {recordedBlob && (
                <video style={styles.video} controls src={window.URL.createObjectURL(recordedBlob)} />
            )} */}
            {/* {uploadedVideo && (
                <video style={styles.video} controls src={uploadedVideo} />
            )} */}
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } =  {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
        padding: '20px',
    },
    recordContainer: {
        marginBottom: '20px',
    },
    uploadContainer: {
        marginBottom: '20px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#007BFF',
        color: '#fff',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
    input: {
        padding: '10px 0',
        fontSize: '16px',
        cursor: 'pointer',
    },
    video: {
        width: '80%',
        maxWidth: '600px',
        borderRadius: '5px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    }
};

export default Page;
