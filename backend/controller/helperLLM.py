import google.generativeai as genai
import os
import json
import matplotlib
import matplotlib.pyplot as plt

os.environ["KMP_DUPLICATE_LIB_OK"]="TRUE"
matplotlib.use('agg')
genai.configure(api_key=os.environ['GEMINI_API_KEY'])
MODEL = genai.GenerativeModel('gemini-1.5-flash')

project_intentions = {
  "deforestation": "In the **first part**, provide a concise summary in bullet points, detailing the total number of trees to be cut, the total percentage of area that will be damaged, and the environmental impact in terms of parameters such as biodiversity loss, carbon sequestration impact, water cycle disruption, and soil erosion. Clearly indicate any assumptions made due to missing data.",
  "conservation": "In the **first part**, provide a concise summary in bullet points, detailing the total number of trees identified, the percentage of land covered by green vegetation, and key environmental benefits such as carbon sequestration potential, biodiversity richness, and water retention capacity. Highlight any critical ecological zones and suggest conservation measures. Clearly indicate any assumptions made due to missing data.",
  "sustainable_logging": "In the **first part**, provide a concise summary in bullet points, detailing the total number of trees identified, the number of trees recommended for sustainable harvesting, and the expected regeneration rate. Include the impact on biodiversity, carbon storage, and water cycle stability. Clearly indicate any assumptions made due to missing data.",
  "land_development": "In the **first part**, provide a concise summary in bullet points, detailing the total number of trees that need to be cleared, the percentage of area that will be repurposed, and the projected environmental impact in terms of biodiversity loss, carbon sequestration changes, and soil stability. Clearly indicate any assumptions made due to missing data.",
  "reforestation": "In the **first part**, provide a concise summary in bullet points, detailing the current tree coverage, the percentage of land available for afforestation, and the expected environmental benefits such as increased biodiversity, enhanced carbon sequestration, and improved soil and water retention. Clearly indicate any assumptions made due to missing data.",
  "environmental_assessment": "In the **first part**, provide a concise summary in bullet points, detailing the total tree count, the percentage of green cover, and key ecological parameters such as carbon sequestration capacity, biodiversity index, and soil health status. Include an assessment of potential environmental risks and mitigation measures. Clearly indicate any assumptions made due to missing data."
}

def load_data(pathToData):
    with open(pathToData, "r") as f:
        return json.loads(f.read())
    

def generate_Analysis(data):
    response = MODEL.generate_content(f'''Generate a detailed report in four parts based on the provided project data. Do not add a main heading to the report. 
    {project_intentions.get(data['project_intention'], project_intentions["conservation"])}\n 
    In the **second part**, give brief information pertaining to "{data['custom_prompt']}". Keep the information strictly related to forestry and environmental context. 
    In the **third part**, based on the project's location, summarize the laws and regulations that govern regarding {data['project_intention']} in that region. Provide detailed information on how to comply with these laws, including steps for acquiring permits, conducting an Environmental Impact Assessment (EIA) if required, and compensatory measures like tree planting. Offer actionable recommendations to ensure legal compliance and environmental sustainability.
    Finally, conclude the report by summarizing the findings, identifying gaps in the provided data, and recommending next steps for a more comprehensive analysis, compliance, and mitigation of environmental impact. Emphasize the importance of consulting legal and environmental experts to align the project with regional regulatory requirements. Include the following data for the analysis: {data}''')
    return response.text


'''
    # In the **second part**, give a detailed analysis of each annotated image provided. For each image, include the URL, the number of trees to be cut, the percentage of the area damaged, and any observations or clarifications regarding the data represented by the image.
'''