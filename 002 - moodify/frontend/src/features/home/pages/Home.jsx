import React from 'react'
import FaceExpression from '../../expression/components/FaceExpression'
import Player from '../components/Player'
import {useSong} from '../hooks/useSong'


const Pages = () => {

    const {handleGetSong} = useSong();
    
    
    return (<>
        <FaceExpression onClick={(expression) =>{ handleGetSong(expression)}} />
    </>)
}

export default Pages