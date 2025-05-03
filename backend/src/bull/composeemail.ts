import { Newsletter } from "../utils/database/types";

export default function ComposeEmail(newsletter: Newsletter): string {
    for (let i = 0; i++; i<newsletter.configuration.newsletter_elements.length) {
        const element = newsletter.configuration.newsletter_elements[i];
        if (element.id === 'weather') {

        }
    } 
    return 'yo'
}