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
const createText = ({
  title,
  username,
  tweetCreatedAt,
  url,
}: Tweet) => `${title}

■ Tweeted by
${username}

■ Tweeted at
${tweetCreatedAt}

■ URL
${url}`;

/**
 * メールを送信する
 */
export const sendMail = async (tweet: Tweet) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: email, pass: appPass },
  });

  return transporter.sendMail({
    from: email,
    to: email,
    subject: "Today's Tweet",
    text: createText(tweet),
  });
};
