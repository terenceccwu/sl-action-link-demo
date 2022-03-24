const fetch = require('node-fetch')

const AIR_TABLE_ENDPOINT = 'https://api.airtable.com/v0/appMKnf5itvZqBkez';
const TOKEN = process.env.AIR_TABLE_API_KEY || '';

async function request(method, url) {
  const response = await fetch(`${AIR_TABLE_ENDPOINT}${url}`, {
    method,
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    }
  });
  return {
    status: response.status,
    data: await response.json(),
  };
}

module.exports = {
  request,
};
