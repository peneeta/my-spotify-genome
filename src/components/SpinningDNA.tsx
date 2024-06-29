import Lottie from "lottie-react";
import dna from "../assets/lottie/dna.json";
import { useRef } from "react";

const style = {
    width: 300
};

export default function SpinningDNA(){

    // const lottieRef = useRef()

    return (
        <Lottie 
            animationData={dna} 
            style={style}
        />
    )
}