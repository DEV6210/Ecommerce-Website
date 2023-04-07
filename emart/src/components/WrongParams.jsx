import { useParams } from "react-router";
import './css/wrongparams.css'
const WrongParams = () => {
    const { id } = useParams()
    return (
        <>
            <div className="paramsbody">
                {`{ Flag_Error: ${id} }`}
            </div>
        </>
    );
}

export default WrongParams;