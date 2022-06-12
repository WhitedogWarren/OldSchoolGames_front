import { useContext } from "react";
import MorpionContext from "../Contexts/MorpionContext";

const useMorpion = () => {
    return useContext(MorpionContext);
}

export default useMorpion;