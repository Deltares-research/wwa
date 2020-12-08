const axios = require('axios');
const querystring = require('querystring');

exports.handler = async function (event) {
  const API_PARAMS = querystring.stringify(event.queryStringParameters);
  const config = {
    headers: { Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}` },
  };
  const URL = `https://api.twitter.com/1.1/statuses/user_timeline.json?${API_PARAMS}`;

  try {
    const { data } = await axios.get(
      URL,
      config,
    );
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    const { status, statusText, headers, data } = error.response;
    return {
      statusCode: error.response.status,
      body: JSON.stringify({ status, statusText, headers, data }),
    };
  }
};
