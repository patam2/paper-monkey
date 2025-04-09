export default function ComposeNewsletterPage () {
    const handleSubmit = (event: React.MouseEvent<HTMLInputElement>) => {
        let email = (document.getElementById("email_address") as HTMLInputElement).value;
        console.log("Submit button clicked", email);
    }
    return (
        <>
            <h3>Compose your new newsletter here!</h3>
            <input type="text" id="email_address" placeholder="Your email" />
            <input type="submit" onClick={(e) => handleSubmit(e)}></input>

        </>
    )
}
