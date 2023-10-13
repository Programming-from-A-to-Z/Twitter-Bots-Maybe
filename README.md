# Twitter Bot with Node.js

At the present time, the hellscape formerly known as Twitter has made drastic changes to the API and its policies. The free tier of the API is now extremely limited. All v1 endpoints are no longer available or supported I think? The node.js package I'm using here is also no longer maintained.

[You can read more in this discussion](https://github.com/PLhery/node-twitter-api-v2/discussions/459).

But if you still want to try, here is the basic setup for creating a Twitter bot using Node.js and the `twitter-api-v2` library.

## Setup

- Node.js: [Download & Install](https://nodejs.org/)
- Twitter Developer Account and API keys: [Apply here](https://developer.twitter.com/)

### Dependencies

```bash
npm install dotenv twitter-api-v2
```

### Configure Environment Variables

Create a `.env` file and add your keys:

```env
TWITTER_API_KEY=your_api_key
TWITTER_API_SECRET=your_api_secret
TWITTER_ACCESS_TOKEN=your_access_token
TWITTER_ACCESS_TOKEN_SECRET=your_access_token_secret
```

#### Initialize API Client

```javascript
import { config } from 'dotenv';
import { TwitterApi } from 'twitter-api-v2';

config();

const twitterKeys = {
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
};

const client = new TwitterApi(twitterKeys);
```

#### Tweet

This function generates a random number and tweets a message containing that number.

```javascript
async function tweet() {
  const r = Math.floor(Math.random() * 100000);
  const response = await client.v2.tweet(
    `Today's tweet is brought to you by the number ${r}!`
  );
  const { id, text } = response.data;
  console.log(`${id} : ${text}`);
}
```

#### Upload Media

This function tweets an image with alt text.

```javascript
async function tweetImage() {
  const mediaId = await client.v1.uploadMedia('rainbow.png', { mimeType: 'image/png' });
  await client.v1.createMediaMetadata(mediaId, { alt_text: { text: 'Rainbow!' } });
  const response = await client.v2.tweet({
    text: 'Rainbow!',
    media: { media_ids: [mediaId] },
  });
  const { id, text } = response.data;
  console.log(`${id} : ${text}`);
}
```

## Usage

To tweet text or an image, uncomment the respective function call in your code and run the script.

```bash
node bot.js
```

## Additional Resources

- [twitter-api-v2 Documentation](https://github.com/PLhery/node-twitter-api-v2)
- [dotenv Documentation](https://github.com/motdotla/dotenv)
- [Node.js Documentation](https://nodejs.org/docs/)
- [Twitter API Documentation](https://developer.twitter.com/en/docs)
