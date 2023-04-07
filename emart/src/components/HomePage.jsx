import { BottomNav, Navbar } from "./Navbar"
import './css/home.css'
import { Product_dashboard } from "./Product/Product_dashboard";
const Home = () => {
    return (
        <>
            {/* <Navbar /> */}
            {/* <div className="home"> */}
                <Product_dashboard />
                {/* <Product/> */}
            {/* </div> */}
            <BottomNav cssvalue='buttontap-1'/>
        </>
    )
}
export default Home;