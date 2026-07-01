import requests


def get_weather(city: str) -> str:
    """
    Returns the current weather of a city.

    Args:
        city: Name of the city.
    """

    # Get latitude & longitude
    geo_url = (
        f"https://geocoding-api.open-meteo.com/v1/search"
        f"?name={city}&count=1"
    )

    geo_response = requests.get(geo_url).json()

    if "results" not in geo_response:
        return f"Could not find location '{city}'."

    location = geo_response["results"][0]

    latitude = location["latitude"]
    longitude = location["longitude"]

    weather_url = (
        "https://api.open-meteo.com/v1/forecast"
        f"?latitude={latitude}"
        f"&longitude={longitude}"
        "&current=temperature_2m,wind_speed_10m"
    )

    weather = requests.get(weather_url).json()

    current = weather["current"]

    return (
        f"Weather in {city}\n"
        f"Temperature : {current['temperature_2m']} °C\n"
        f"Wind Speed  : {current['wind_speed_10m']} km/h"
    )