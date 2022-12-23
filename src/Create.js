import Button from "./Button";

const Create = ({ handleSubmit, value, setValue, cssStyles, prompt, placeholder }) => {
    return (
        <main className="create">
            <form onSubmit={handleSubmit} style={cssStyles}>
                <label>{prompt}</label>
                <input required type="text" placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)} />
                <Button buttonName={"Enter"} />
            </form>
        </main>

    );
}

export default Create;