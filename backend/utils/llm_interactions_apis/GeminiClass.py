import google.generativeai as genai
import json
import os
import dotenv

# Load environment variables from .env file
dotenv.load_dotenv()

class GeminiClass:
    """
    A class to interact with a Large Language Model (LLM) like Gemini
    for analyzing student data and generating development plans.
    """
    
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "")

    @staticmethod
    def analyze_student_data(data: str):
        """
        Analyzes student data provided in JSON format using Gemini API
        and returns future development plans and learning improvement strategies.

        Args:
            json_data (dict): Student data in JSON format.

        Returns:
            str: Gemini's response containing future development plans and learning improvement suggestions,
                 or an error message if the API call fails.
        """
        # Configure Gemini API (ensure GOOGLE_API_KEY environment variable is set)
        genai.configure(api_key=GeminiClass.GOOGLE_API_KEY)
        model = genai.GenerativeModel('gemini-pro')

        prompt = f"""
        Gemini, analyze the following student data, which may include assignment scores, feedback, submission times, and other academic performance details. 

        Some of this data may be **useful**, while some may be **irrelevant**. Your task is to:
        - **Identify and prioritize** the most meaningful information for analysis.
        - **Filter out** any unhelpful or redundant details.
        - **Extract key insights**, such as strengths, weaknesses, learning patterns, and potential challenges.
        - Provide **personalized, actionable strategies** for academic growth and skill enhancement.

        Ensure your response is **concise yet thorough**, structured as **one well-formed paragraph**, focusing only on **relevant** insights.

        Here is the student data:
        {data}
        """



        try:
            response = model.generate_content(prompt)
            return response.text
        except Exception as e:
            return f"Error: Gemini API call failed - {e}"
        

if __name__ == '__main__':
    # Example Usage:
    student_data = {
        "name": "Alice",
        "grades": {
            "Math": 85,
            "Science": 92,
            "English": 78
        },
        "learning_style": "Visual",
        "interests": ["Coding", "Robotics"]
    }

    gemini_response = GeminiClass.analyze_student_data(student_data)
    print("Gemini's Response:\n", gemini_response)