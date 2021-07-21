import React from 'react';




const LibrarySong = ({song,setCurrentSong,audioRef,isPlaying,songs,setSongs}) => {

    const songHandler= async ()=>{
        await setCurrentSong(song)
        if(isPlaying) audioRef.current.play()
        

        //Add Active State
    const newSong=songs.map((s)=>{
        if(s.id === song.id){
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

    
    
    return ( 

        <div  onClick={songHandler} className={`library-song ${song.active?'selected':""}`}>
            <img src={song.cover} alt={song.name}/>
            <div className="song-description">
            <h3>{song.name}</h3>
            <h4>{song.artist}</h4>
            </div>
        </div>
     );
}
 
export default LibrarySong;