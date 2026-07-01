import requests


def get_top_news() -> str:
    """
    Returns latest technology news headlines.
    """

    url = "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml"

    response = requests.get(url)

    if response.status_code != 200:
        return "Unable to fetch news."

    xml = response.text

    headlines = []

    items = xml.split("<item>")[1:6]

    for item in items:

        try:
            title = item.split("<title>")[1].split("</title>")[0]
            headlines.append(title)

        except Exception:
            continue

    return "\n".join(
        f"{i+1}. {headline}"
        for i, headline in enumerate(headlines)
    )