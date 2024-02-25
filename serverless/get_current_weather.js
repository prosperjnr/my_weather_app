import fetch from 'node-fetch';

const { WEATHER_API_KEY } = process.env;

export const handler = async (event, context) => {
  const params = JSON.parse(event.body);
  const { lat, lon, units } = params;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${WEATHER_API_KEY}`;
  try {
    const currentWeatherStream = await fetch(url);
    const currentWeatherJson = await currentWeatherStream.json();
    return {
      statusCode: 200,
      body: JSON.stringify(currentWeatherJson),
    };
  } catch (err) {
    return { statusCode: 422, body: err.stack };
  }
};
