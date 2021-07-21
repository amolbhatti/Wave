import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay,faAngleLeft,faAngleRight,faPause } from '@fortawesome/free-solid-svg-icons'





const Player= ({currentSong,isPlaying,setIsPlaying,audioRef,songs,setCurrentSong,setSongs}) => {

   
// animation
const activeLibraryHandler=(nextSong)=>{
    const newSong=songs.map((s)=>{
        if(s.id === nextSong.id){
                return{
                    ...s,
                    active:true
                }
        }else{
            return{
                ...s,
                active:false
            }
        }
    });
        setSongs(newSong);
}
//Event Handlers
const dragHandler=(e)=>{
    audioRef.current.currentTime=e.target.value
    setSongInfo({...songInfo ,  currentTime:e.target.value})
}

const songEndHandler= async()=>{
    const currentIndex=songs.findIndex((song)=>song.id===currentSong.id);
    await  setCurrentSong(songs[(currentIndex+1)%songs.length])
    if(isPlaying) audioRef.current.play()
}

const playSongHandler=()=>{
    if(isPlaying){
        audioRef.current.pause()
        setIsPlaying(!isPlaying)
    }else{
        audioRef.current.play()
        setIsPlaying(!isPlaying)
    }
}
const timeUpdateHandler=(e)=>{
    const current=e.target.currentTime;
    const duration=e.target.duration
    //calculate percentage
    const roundedCurrent=Math.round(current);
    const roundedDuration=Math.round(duration);
    const percent=Math.round((roundedCurrent/roundedDuration)*100);
    setSongInfo({...songInfo ,  currentTime:current,duration:duration,animationPercentage:percent})

}
const getTime=(time)=>{
    return(
        Math.floor(time/60)+":"+("0"+Math.floor(time % 60)).slice(-2)
    )
}

const skipTrackHandler= async (direction)=>{
    const currentIndex=songs.findIndex((song)=>song.id===currentSong.id);
    if(direction==='skip-forward'){
     await  setCurrentSong(songs[(currentIndex+1)%songs.length]) 
     activeLibraryHandler(songs[(currentIndex+1)%songs.length])
       
    }else if(direction==='skip-backward'){
        if((currentIndex-1)%songs.length=== -1){
            await  setCurrentSong(songs[songs.length-1])
            activeLibraryHandler(songs[songs.length-1])
        }else{
            await setCurrentSong(songs[(currentIndex-1)%songs.length])
            activeLibraryHandler(songs[(currentIndex-1)%songs.length])
        }

        
        
    }
    if(isPlaying) audioRef.current.play()

}

//State

const [songInfo, setSongInfo] = useState({
    currentTime:0,
    duration:0,
    animationPercentage:0
});


//Add style

const trackAnimation={
    transform:`translateX(${songInfo.animationPercentage}%)`
}



    return (    <div className="player">
        <div className="time-control">
            <p>{getTime(songInfo.currentTime)}</p>
            <div style={{background:`linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})`}} className="track">
            <input min={0} max={songInfo.duration || 0} value={songInfo.currentTime} onChange={dragHandler} type="range" />
            <div style={trackAnimation} className="animate-track"></div>
            </div>
            <p>{songInfo.duration? getTime(songInfo.duration): "0:00"}</p>
        </div>
        <div className="play-control">
        <FontAwesomeIcon  onClick={()=>skipTrackHandler('skip-backward')}  className="skip-back" size="2x" icon={faAngleLeft}/>
        <FontAwesomeIcon onClick={playSongHandler}   className="play" size="2x" icon={isPlaying ?faPause:faPlay}/>
        <FontAwesomeIcon  onClick={()=>skipTrackHandler('skip-forward')}   className="skip-forward" size="2x" icon={faAngleRight}/>
        </div>
        <audio onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler}  ref={audioRef} src={currentSong.audio} onEnded={songEndHandler}/>
    </div>  
    );
}
 
export default Player ;