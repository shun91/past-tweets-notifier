import { fetchRandomly } from "./notion";
import { sendMail } from "./sendMail";

const main = async () => {
  const tweet = await fetchRandomly();
  const mailResult = await sendMail("Random Tweet", [tweet]);

  console.info(JSON.stringify({ tweet, mailResult }, null, 2));
  console.info("✨ Mail sent successfully!");
};

main();
