import "./App.css";
import videoSrc from '../public/assets/video.mp4';

function App() {
  return (
    <div className="logo-container">
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: '30vw',
          height: '30vh',
          objectFit: 'cover',
          position: 'fixed',
          top: '35vh',
          left: '35vw'
        }}
      />
    </div>
  );
}

export default App;