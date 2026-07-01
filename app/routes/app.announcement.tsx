// import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router";
// import { useFetcher } from "react-router";
// import { authenticate } from "../shopify.server";

// export async function loader({ request }: LoaderFunctionArgs) {
//     await authenticate.admin(request);
//     return null;
// }

// export async function action({ request }: ActionFunctionArgs) {
//     await authenticate.admin(request);

//     const formData = await request.formData();

//     const announcement = formData.get("announcement");

//     console.log("Announcement:", announcement);

//     return {
//         success: true,
//     };
// }
// export default function Announcement() {
//     const fetcher = useFetcher<typeof action>();

//     return (
//         <s-page heading="Announcement">
//             <s-section>
//                 <fetcher.Form method="post">

//                     <s-text-field
//                         name="announcement"
//                         label="Announcement"
//                         placeholder="Enter announcement"
//                     />

//                     <br />

//                     <button type="submit">
//                         Save
//                     </button>

//                 </fetcher.Form>
//             </s-section>
//         </s-page>
//     );
// }









import { Form, type LoaderFunctionArgs, type ActionFunctionArgs } from "react-router";
import { authenticate } from "../shopify.server";

export async function loader({ request }: LoaderFunctionArgs) {
    await authenticate.admin(request);
    return null;
}

export async function action({ request }: ActionFunctionArgs) {
    await authenticate.admin(request);

    const formData = await request.formData();
    const announcement = formData.get("announcement");

    console.log("Announcement:", announcement);

    return { success: true };
}

export default function Announcement() {
    return (
        <Form method="post">
            <input
                name="announcement"
                placeholder="Enter announcement"
            />

            <button type="submit">
                Save
            </button>
        </Form>
    );
}