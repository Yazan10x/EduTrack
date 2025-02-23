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
    def analyze_student_data(json_data):
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

        prompt = """Okay Gemini, analyze student data I will provide in JSON format (e.g., {"name": "...", "grades": {...}, ...}).
        Based on this data, suggest future development plans focusing on academic growth and skill enhancement.
        Recommend actionable strategies to improve their learning effectiveness. Respond concisely, within 100 words as a paragraph.
        Here is the student data in JSON format:
        """ + json.dumps(json_data, indent=2) # Add the JSON data to the prompt, nicely formatted

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