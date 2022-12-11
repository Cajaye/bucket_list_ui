import { motion } from "framer-motion";

const Button = ({ onClick, buttonName }) => {
    return (
        <motion.button className="main-button" whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }} onClick={onClick}>{buttonName}</motion.button>
    );
}

export default Button;