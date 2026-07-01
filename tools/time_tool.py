from datetime import datetime

def current_time() -> str :
    """
    Returns the current local  date and time.
    """
    return datetime.now().strftime("%A, %d %B %Y %I:%M:%S %p")