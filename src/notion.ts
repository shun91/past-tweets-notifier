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

const toTweet = (page: PageObjectResponse) => ({
  title: getTitle(page),
  username: getUsername(page),
  tweetCreatedAt: getTweetCreatedAt(page),
  url: getTweetUrl(page),
});

export async function fetchRandomly() {
  const { results } = await notion.databases.query({
    database_id: databaseId,
    sorts: [{ property: "rand", direction: "ascending" }],
    page_size: 1,
  });

  const first = results[0] as PageObjectResponse;
  return toTweet(first);
}

export async function fetchAllCreatedYesterday() {
  const yesterday = new Date();
  yesterday.setHours(yesterday.getHours() + 9); // timezoneを考慮
  yesterday.setDate(yesterday.getDate() - 1);
  const yyyymmdd = yesterday.toISOString().split("T")[0];

  const { results } = await notion.databases.query({
    database_id: databaseId,
    filter: { property: "created_at", date: { equals: yyyymmdd } },
  });

  return (results as PageObjectResponse[]).map(toTweet);
}
