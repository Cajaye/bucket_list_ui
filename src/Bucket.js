import { Link } from "react-router-dom";

const Bucket = ({ id, createdAt, title }) => {
    return (
        <div className="bucket">
            <Link to={`/bucket/${id}`}>
                <p style={{ color: "#60ab9a", marginBottom: "5px" }}>{'Created  - ' + new Date(createdAt).toDateString()}</p>
                <h2>{title}</h2>
                <p style={{ textAlign: "right" }}>Completed:10/20</p>
            </Link>
        </div>
    );
}

export default Bucket;