import Lottie from "lottie-react";
import dna from "../assets/lottie/dna.json";

const style = {
    width: 300
};

export default function SpinningDNA(){
    return (
        <Lottie 
            animationData={dna} 
            style={style}
        />
    )
}