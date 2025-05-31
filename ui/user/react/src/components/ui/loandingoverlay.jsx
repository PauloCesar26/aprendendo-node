import { LoaderCircle } from "lucide-react"

function LoandingOverlay(){
    return (
    <div className="
        fixed 
        top-0 
        left-0
        w-full
        h-full
        bg-white
        dark:bg-black
        opacity-90
        z-50
        flex
        items-center
        justify-center">
            <LoaderCircle className="animate-spin w-15 h-15 text-black dark:text-white"/>
    </div>
    );
}

export default LoandingOverlay