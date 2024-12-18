import google.generativeai as genai
import os
import json
import matplotlib
import matplotlib.pyplot as plt

os.environ["KMP_DUPLICATE_LIB_OK"]="TRUE"
matplotlib.use('agg')
genai.configure(api_key=os.environ['GEMINI_API_KEY'])
MODEL = genai.GenerativeModel('gemini-1.5-flash')

def load_data(pathToData):
    with open(pathToData, "r") as f:
        return json.loads(f.read())
    

def generate_Analysis(data):
    response = MODEL.generate_content(f'''Generate a detailed report in four parts based on the provided project data. 
    In the **first part**, provide a concise summary in bullet points, detailing the total number of trees to be cut, the total percentage of area that will be damaged, and the environmental impact in terms of parameters such as biodiversity loss, carbon sequestration impact, water cycle disruption, and soil erosion. Clearly indicate any assumptions made due to missing data. 
    In the **second part**, give a detailed analysis of each annotated image provided. For each image, include the URL, the number of trees to be cut, the percentage of the area damaged, and any observations or clarifications regarding the data represented by the image.
    In the **third part**, based on the project's location, summarize the laws and regulations that govern deforestation in that region. Provide detailed information on how to comply with these laws, including steps for acquiring permits, conducting an Environmental Impact Assessment (EIA) if required, and compensatory measures like tree planting. Offer actionable recommendations to ensure legal compliance and environmental sustainability.
    In the **fourth part**, conclude the report by summarizing the findings, identifying gaps in the provided data, and recommending next steps for a more comprehensive analysis, compliance, and mitigation of environmental impact. Emphasize the importance of consulting legal and environmental experts to align the project with regional regulatory requirements. Include the following data for the analysis: {data}''')
    return response.text
