export default function Compose() {

    const handleSubmit = (event: React.MouseEvent<HTMLInputElement>) => {
        let email = (document.getElementById("email_address") as HTMLInputElement).value;
        console.log("Submit button clicked", email);
    }
    return (
        <>
            <h1>Welcome to the compose page</h1>
            <input type="text" id="email_address" placeholder="Your email" />
            <input type="submit" onClick={(e) => handleSubmit(e)}></input>
        </>
    )
}