export async function updateAnnouncementMetafield(
    admin: any,
    announcement: string
) {
    const shopResponse = await admin.graphql(`
    query {
      shop {
        id
      }
    }
  `);

    const shopData = await shopResponse.json();

    const ownerId = shopData.data.shop.id;

    const response = await admin.graphql(
        `#graphql
      mutation SaveAnnouncement($metafields: [MetafieldsSetInput!]!) {
        metafieldsSet(metafields: $metafields) {
          metafields {
            id
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
        {
            variables: {
                metafields: [
                    {
                        ownerId,
                        namespace: "announcement",
                        key: "banner_text",
                        type: "single_line_text_field",
                        value: announcement,
                    },
                ],
            },
        }
    );

    return await response.json();
}