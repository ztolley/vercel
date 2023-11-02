import { createClient, OAuthStrategy } from "@wix/sdk";
import { items } from "@wix/data";

const wixClient = createClient({
  modules: { items },
  auth: OAuthStrategy({ clientId: "2e7c7836-1b4e-4c2d-8d8c-f8a6e6a7d4d5" }),
});

interface Team extends items.DataItem {
  name: string;
}

export default async function Page() {
  const dataItemsList = await wixClient.items
    .queryDataItems({
      dataCollectionId: "Team",
      // Please specify the dataCollectionId you require
    })
    .find();

  console.log("My Data items:");
  console.log("Total: ", dataItemsList.items.length);

  dataItemsList.items.map((item) => console.log(item));
  return (
    <>
      <p>Invoices Page</p>
      <ul>
        {dataItemsList.items.map((item) => (
          <li key={item._id}>{item.data ? item.data.title : ""}</li>
        ))}
      </ul>
    </>
  );
}
