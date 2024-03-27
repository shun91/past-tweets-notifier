import { randomlyFetchNotionPages } from "./randomlyFetchNotionPage";
import { sendMail } from "./sendMail";

const main = async () => {
  const tweet = await randomlyFetchNotionPages();
  const mailResult = await sendMail(tweet);

  console.info(JSON.stringify({ tweet, mailResult }, null, 2));
  console.info("✨ Mail sent successfully!");
};

main();
