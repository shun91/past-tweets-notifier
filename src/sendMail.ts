import nodemailer from "nodemailer";

export type Tweet = {
  title: string;
  username: string;
  tweetCreatedAt: string;
  url: string;
};

const email = process.env.GMAIL_ADDRESS;
const appPass = process.env.GMAIL_APP_PASSWORD;

/**
 * メールの本文を作成する
 */
const createText = (tweets: Tweet[]) =>
  tweets
    .map(
      ({ title, username, tweetCreatedAt, url }) => `${title}

■ Tweeted by
${username}

■ Tweeted at
${tweetCreatedAt}

■ URL
${url}`
    )
    .join("\n\n==============================\n\n");

/**
 * メールを送信する
 */
export const sendMail = async (subject: string, tweet: Tweet[]) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: email, pass: appPass },
  });

  return transporter.sendMail({
    from: email,
    to: email,
    subject,
    text: createText(tweet),
  });
};
