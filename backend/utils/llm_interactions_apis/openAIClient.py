import os
from openai import OpenAI


class OPEN_AI_CLIENTS:
    OPEN_AI_CLIENT_001 = OpenAI(api_key=os.getenv("OPENAI_API_KEY", ""))
