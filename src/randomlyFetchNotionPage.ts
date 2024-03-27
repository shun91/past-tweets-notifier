import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const apiKey = process.env.NOTION_API_KEY;
const databaseId = process.env.NOTION_DATABASE_ID ?? "";

const notion = new Client({ auth: apiKey });

const getTitle = (page: PageObjectResponse) => {
  const { title } = page.properties;
  return title.type === "title" ? title.title[0].plain_text : "";
};

const getUsername = (page: PageObjectResponse) => {
  const { username } = page.properties;
  return username.type === "rich_text" ? username.rich_text[0].plain_text : "";
};

const getTweetCreatedAt = (page: PageObjectResponse) => {
  const { tweet_created_at } = page.properties;
  return tweet_created_at.type === "date"
    ? tweet_created_at.date?.start ?? ""
    : "";
};

const getTweetUrl = (page: PageObjectResponse) => {
  const { url } = page.properties;
  return url.type === "url" ? url.url ?? "" : "";
};

export async function randomlyFetchNotionPages() {
  const { results } = await notion.databases.query({
    database_id: databaseId,
    sorts: [{ property: "rand", direction: "ascending" }],
    page_size: 1,
  });

  const first = results[0] as PageObjectResponse;
  const title = getTitle(first);
  const username = getUsername(first);
  const tweetCreatedAt = getTweetCreatedAt(first);
  const url = getTweetUrl(first);

  return { title, username, tweetCreatedAt, url };
}
