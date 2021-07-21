
import React,{useState,useRef} from 'react';
import './styles/app.scss'
import Player from './components/Player';
import Song from './components/Song';
import data from './data'
import Library from './components/Library';
import Nav from './components/Nav'







function App() {
  //State
  const [songs,setSongs]=useState(data())
  const [CurrentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);

   // Ref
   const audioRef=useRef(null)

  return (
    <div className={`App ${libraryStatus?'library-active':''}`}>
    <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
   <Song currentSong={CurrentSong}/>
   <Player setSongs={setSongs} setCurrentSong={setCurrentSong} songs={songs} audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={CurrentSong}/>
   <Library libraryStatus={libraryStatus} setSongs={setSongs} isPlaying={isPlaying}  audioRef={audioRef} songs={songs} setCurrentSong={setCurrentSong}/>
    </div>
    
  );
}

export default App;
