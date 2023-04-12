import Lottie from "lottie-react";
// import groovyWalkAnimation from "./98288-loading.json";
import groovyWalkAnimation from "../components/json_image/smart-key-loading.json"
import './loading.css'
const Loading = () => {
  return (
    <>

      {
        <div class="loading">
          <Lottie className='lottie' animationData={groovyWalkAnimation} loop={true} />
        </div>
      }
    </>
  )
}
export default Loading;