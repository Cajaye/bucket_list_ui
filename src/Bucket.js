import { Link } from "react-router-dom";
import Button from "./Button";

const Bucket = ({ count, id, createdAt, title, onClick }) => {
    return (
        <div className="bucket">
            <Link to={`/bucket/${id}`}>
                <p style={{ color: "#60ab9a", marginBottom: "5px" }}>{'Created  - ' + new Date(createdAt).toDateString()}</p>
                <h2>{title}</h2>
                <p>{count}</p>
            </Link>
            <Button buttonName={"Delete"} onClick={onClick} />
        </div>
    );
}

export default Bucket;