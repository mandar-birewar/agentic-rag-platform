from tools.calculator import calculator
from tools.time_tool import current_time
from tools.weather import get_weather
from tools.news import get_top_news
from tools.rag_search import search_document

ALL_TOOLS = [
    calculator,
    current_time,
    get_weather,
    get_top_news,
    search_document
]