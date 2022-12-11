import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
    return (
        <div className="header">
            <motion.h2
                animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 0, 360, 360, 0],
                }}
                transition={{ duration: 1.5 }}>CB</motion.h2>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/logout">Logout</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;