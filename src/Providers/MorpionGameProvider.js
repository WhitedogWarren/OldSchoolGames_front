import { useState } from "react";

import MorpionContext from '../Contexts/MorpionContext';

function MorpionGameProvider({children}) {
    const [players, setPlayers] = useState({host: null, guest:null});

    const value = {
        players,
        setPlayers
    }
    
    return (
        <MorpionContext.Provider value={value}>
            {children}
        </MorpionContext.Provider>
    )
}

export default MorpionGameProvider;