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
 * メール本文のHTMLを作成する
 */
const createHtml = (tweets: Tweet[]) =>
  tweets
    .map(
      ({ title, username, tweetCreatedAt, url }) => `
<div style="max-width: 600px; margin: 20px auto; background-color: #fff; border: 1px solid #e1e8ed; border-radius: 5px; overflow: hidden;">
    <div style="background-color: #55acee; color: #fff; padding: 10px 20px;">
        <b>${title.replaceAll("\n", "<br>")}</b>
    </div>
    <div style="padding: 20px;">
        <div style="display: flex; align-items: center; border-bottom: 1px solid #e1e8ed; padding-bottom: 10px; margin-bottom: 10px;">
            <div style="font-weight: bold; color: #1da1f2;">${username}</div>
            <div style="color: #657786; font-size: 0.85em; margin-left: 10px;">${tweetCreatedAt}</div>
        </div>
        <a href="${url}" style="display: inline-block; text-decoration: none; color: #1da1f2; border: 1px solid #1da1f2; border-radius: 20px; padding: 6px 12px; font-size: 0.85em;">View Tweet</a>
    </div>
</div>`
    )
    .join("\n");

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
    html: createHtml(tweet),
  });
};
