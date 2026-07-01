import { useEffect, useState } from "react";
import { connectDB } from "../mongodb.server";
import { useLoaderData } from "react-router";
import Announcement from "../models/announcement.server"
import { getAnnouncement, saveAnnouncement } from "../services/announcement.server";
import type {
  ActionFunctionArgs,
  HeadersFunction,
  LoaderFunctionArgs,
} from "react-router";
import { useFetcher } from "react-router";
import { useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { updateAnnouncementMetafield } from "app/services/metafield.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  return {
    announcement: await getAnnouncement(),
  }
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin } = await authenticate.admin(request);

  const formData = await request.formData();

  const announcementText = formData.get("announcement")?.toString() ?? "";

  if (typeof announcementText !== "string" || announcementText.trim() === "") {
    return {
      success: false,
      message: "Announcement is required",
    };
  }

  // const savedAnnouncement = await Announcement.create({
  //   text: announcementText,
  // });

  await saveAnnouncement(announcementText);

  const metafieldResult = await updateAnnouncementMetafield(admin, announcementText);

  // console.log("METAFIELD RESULT", metafieldResult);
  // console.log("METAFIELD RESULT", metafieldResult.data.metafieldsSet.metafields);

  if (metafieldResult.data.metafieldsSet.userErrors.length > 0) {
    console.error(metafieldResult.data.metafieldsSet.userErrors);

    return {
      success: false,
      errors: metafieldResult.data.metafieldsSet.userErrors,
    };
  }

  // console.log("Announcement:", savedAnnouncement);

  return {
    success: true,
  };
};


export default function Index() {
  // const [announcement, setAnnouncement] = useState("");
  const { announcement: initialAnnouncement } = useLoaderData<typeof loader>();

  const [announcement, setAnnouncement] = useState(initialAnnouncement);
  const fetcher = useFetcher<typeof action>();

  const saveAnnouncement = () => {
    console.log("Saving announcement:", announcement);
    fetcher.submit(
      {
        announcement,
      },
      {
        method: "POST",
      },
    );
  };

  const app = useAppBridge();

  useEffect(() => {
    if (fetcher.data?.success) {
      app.toast.show("Announcement saved successfully!", { duration: 3000 });
    }
  }, [fetcher.data, app]);

  return (
    <s-page heading="Announcement Manager">

      <s-section heading="Create Announcement">

        <s-text-field
          id="announcement"
          label="Announcement"
          placeholder="Enter announcement..."
          value={announcement}
          onChange={(e: any) => setAnnouncement(e.target.value)}
        />

        <br />

        <s-button
          onClick={saveAnnouncement}
          disabled={!announcement.trim()}
          loading={fetcher.state === "submitting"}
        >
          Save Announcement
        </s-button>

      </s-section>

    </s-page>
  );
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};
