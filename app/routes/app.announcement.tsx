import type { LoaderFunctionArgs } from "react-router";
import { authenticate } from "../shopify.server";

export async function loader({ request }: LoaderFunctionArgs) {
    await authenticate.admin(request);
    return null;
}

export default function Announcement() {
    return (
        <s-page heading="Announcement">
            <s-section>
                <s-heading>Announcement Manager</s-heading>
            </s-section>
        </s-page>
    );
}