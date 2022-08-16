import bgImage from "../imgs/bg-image.webp";
import LandingPage from "./landingPage";
import Quiz from "./quiz";

export default function Box() {
    return (
        <div style={{ backgroundImage: `url(${bgImage})`, opacity: 0.7 }} className="w-[800px] h-full mx-auto rounded-2xl border-4 border-white">
            {/* <LandingPage /> */}
            <Quiz />
        </div>
    )
}