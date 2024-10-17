import './Analysis.css';
import ReactMarkdown from 'react-markdown';
import {toast} from 'react-toastify'
import { UserState } from '../../Context/UserContext';
import axios from 'axios'
import { useEffect, useState } from 'react';
import MyLoader from '../../components/misc/MyLoader';

function Analysis() {
//   const markdown = `
// # Tree Enumeration Analysis 🌳📊

// ### A Deep Dive into the Key Metrics of Our Platform

// Tree enumeration plays a crucial role in understanding the state of our environment. By counting, categorizing, and analyzing trees, we can provide important insights on biodiversity, carbon sequestration, and forest health. This dashboard gives you a snapshot of the key statistics from our latest enumeration efforts.

// ![Forest Overview](https://raw.githubusercontent.com/vipulchaturvedi/treesense-imaging/refs/heads/main/screenshots/tree_count.png)

// ---

// ## 🌲 Total Trees Counted: **10,245**

// Our platform has successfully enumerated over 10,000 trees across various regions. This comprehensive count provides a baseline for understanding the growth, distribution, and health of forests in different areas.

// ![Trees Counted Graph](https://www.researchgate.net/profile/Malcolm-North-2/publication/45513775/figure/fig3/AS:306089284390933@1449988780757/A-graph-of-the-number-of-trees-established-each-year-between-1760-and-1920-by-species.png)

// ---

// ## 📏 Average Tree Height: **8.2 meters**

// The average height of the trees recorded is 8.2 meters, reflecting a healthy, mature population across surveyed regions. Taller trees are often an indication of healthy forest ecosystems.

// ![Tree Height Distribution](https://via.placeholder.com/600x300.png?text=Tree+Height+Distribution)

// ---

// ## 🌍 Carbon Absorption Rate: **12,000 kg CO2**

// One of the key benefits of a healthy tree population is carbon sequestration. Our enumeration data shows that these trees absorb approximately **12,000 kg** of carbon dioxide annually, contributing significantly to climate mitigation efforts.

// ---

// ## 📈 Growth Rate Over Time

// Below is a sample graph representing the growth rate of trees in the last five years. The chart illustrates how new saplings have grown into mature trees, steadily increasing the total tree count and height over time.

// ![Tree Growth Graph](https://8billiontrees.com/wp-content/uploads/2023/02/Basswood-Tree-Growth-Charts.png)

// ---

// ## 🌿 Tree Species Breakdown

// Our analysis also reveals the diversity of tree species in the regions surveyed. The pie chart below represents the percentage distribution of major tree species, with **Oak** and **Pine** making up the largest portions.

// ![Species Breakdown Pie Chart](https://www.frontiersin.org/files/Articles/1136289/frsen-04-1136289-HTML/image_m/frsen-04-1136289-g002.jpg)

// ---

// ## 🚧 Solutions to Avoid Tree Cutting and Promote Conservation 🌳🚫

// One of the key concerns in forestry management is minimizing unnecessary tree cutting while encouraging conservation and sustainable forestry practices. Here are some potential solutions:

// ### 1. **Sustainable Forestry Practices**

// - **Selective Logging**: Encourage selective logging practices where only certain trees are cut, based on their maturity and ecological value. This avoids large-scale deforestation and allows forests to regenerate naturally.
  
// - **Replanting Initiatives**: Mandate replanting programs for every tree that is cut down, ensuring that forest areas remain productive and sustainable.

// \`\`\`javascript
// const plantNewTrees = (cutDownCount) => {
//   const replantingRatio = 3; // Replant 3 trees for each one cut down
//   return cutDownCount * replantingRatio;
// };
// console.log(plantNewTrees(100)); // Outputs 300 new trees to plant
// \`\`\`

// ---

// ### 2. **Remote Sensing for Monitoring Illegal Logging**

// Using satellite imagery and drones, the platform can detect unauthorized logging activities in real-time. Combining this with machine learning algorithms will enable the detection of illegal tree felling and provide immediate alerts to local authorities.

// - **Solution**: Integrate AI-powered tools for continuous monitoring.
// - **Outcome**: Timely interventions to prevent unauthorized logging and safeguard forests.

// ### 3. **Carbon Credit Programs for Forest Preservation**

// Introduce carbon credit programs where individuals or companies can buy credits to support forest conservation projects. These programs incentivize landowners and governments to keep forests intact by rewarding them financially for not cutting down trees.

// - **Solution**: Allow users of the platform to calculate the carbon offset from conserving a given number of trees.
// - **Outcome**: Provide economic incentives to avoid tree cutting and preserve ecosystems.

// ---

// ### 4. **Community-Based Conservation Efforts**

// Empowering local communities to become custodians of forests can lead to more sustainable conservation practices:

// - **Education Programs**: Educate communities about the long-term environmental and economic benefits of forest conservation.
// - **Alternative Livelihoods**: Provide alternative livelihood options, such as eco-tourism or agroforestry, to reduce the economic dependence on tree-cutting activities.

// ---

// ### 5. **Policy Advocacy and Legal Frameworks**

// Work with governments and policymakers to strengthen laws that limit tree cutting, particularly in sensitive areas like rainforests or biodiversity hotspots. The platform can provide data that demonstrates the ecological value of forested areas, making a stronger case for conservation.

// - **Protected Zones**: Create legally protected zones where tree cutting is entirely prohibited.
// - **Green Taxes**: Implement taxes on industries that excessively cut down trees, encouraging them to explore sustainable alternatives.

// ---

// ## 📊 Conclusion

// This dashboard provides an overview of the key metrics from our tree enumeration project, and we have outlined several ways to reduce tree cutting and promote forest conservation. Implementing sustainable forestry practices, leveraging technology for monitoring, and involving communities in conservation efforts are essential strategies.

// Our goal is to ensure forests remain healthy, diverse, and intact for future generations while balancing human needs and economic activities.

// Together, we can make a significant impact in protecting our natural resources and curbing deforestation.
// `;

const [markdown,setMarkDown] = useState("");

const accessToken = JSON.parse(localStorage.getItem("accessToken"));
const {selectedProject} = UserState();

const fetchAnalysis = async() => {
  const config = {
    headers: {
        Authorization: `Bearer ${accessToken}`
      },
      withCredentials: true
  }
  try {
    const response = await axios.post('http://localhost:5000/api/v1/project/fetchAnalysis',{project_id: selectedProject._id},config)
    console.log(response)
    setMarkDown(response.data.analysis_json.analysis || "# No data loaded")
    toast.success(response.data.message);
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.error || "Error loading project Analysis");
  }
}

useEffect(()=>{
  fetchAnalysis();
})

  return (
    <div className="analysis-container">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  )
}

export default Analysis