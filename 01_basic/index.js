import { config } from 'dotenv';
config();

import { TwitterApi } from 'twitter-api-v2';

const twitterKeys = {
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
};

const client = new TwitterApi(twitterKeys);

// tweet();
// tweetImage();

async function tweet() {
  const r = Math.floor(Math.random() * 100000);
  const response = await client.v2.tweet(
    `Today's tweet is brought to you by the number ${r}!`
  );
  const { id, text } = response.data;
  console.log(`${id} : ${text}`);
}

async function tweetImage() {
  const mediaId = await client.v1.uploadMedia('rainbow.png', { mimeType: 'png' });
  console.log(mediaId);
  await client.v1.createMediaMetadata(`${mediaId}`, { alt_text: { text: 'Rainbow!' } });
  const response = await client.v2.tweet({
    text: 'Rainbow!',
    media: { media_ids: [mediaId] },
  });
  const { id, text } = response.data;
  console.log(`${id} : ${text}`);
}
