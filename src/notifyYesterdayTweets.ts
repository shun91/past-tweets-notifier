import { fetchAllCreatedYesterday } from "./notion";
import { sendMail } from "./sendMail";

const main = async () => {
  const tweets = await fetchAllCreatedYesterday();
  const mailResult = await sendMail("Yesterday's Tweet", tweets);

  console.info(JSON.stringify({ tweets, mailResult }, null, 2));
  console.info("✨ Mail sent successfully!");

  // 定期実行を設定
};

main();
