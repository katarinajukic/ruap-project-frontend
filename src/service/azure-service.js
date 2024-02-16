import axios from "axios";

class AzureLungCancerService {
  async getLungCancerPrediction(
    age,
    gender,
    airPollution,
    alcoholUse,
    dustAllergy,
    occupationalHazards,
    geneticRisk,
    chronicLungDisease,
    balancedDiet,
    obesity,
    smoking,
    passiveSmoker,
    chestPain,
    coughingOfBlood,
    fatigue,
    weightLoss,
    shortnessOfBreath,
    wheezing,
    swallowingDifficulty,
    clubbingOfFingerNails,
    frequentCold,
    dryCough,
    snoring
  ) {
    const requestBody = {
        Inputs: {
          input1: [
            {
              Age: age,
              Gender: gender,
              "Air Pollution": airPollution,
              "Alcohol use": alcoholUse,
              "Dust Allergy": dustAllergy,
              "OccuPational Hazards": occupationalHazards,
              "Genetic Risk": geneticRisk,
              "Chronic Lung Disease": chronicLungDisease,
              "Balanced Diet": balancedDiet,
              "Obesity": obesity,
              "Smoking": smoking,
              "Passive Smoker": passiveSmoker,
              "Chest Pain": chestPain,
              "Coughing of Blood": coughingOfBlood,
              "Fatigue": fatigue,
              "Weight Loss": weightLoss,
              "Shortness of Breath": shortnessOfBreath,
              "Wheezing": wheezing,
              "Swallowing Difficulty": swallowingDifficulty,
              "Clubbing of Finger Nails": clubbingOfFingerNails,
              "Frequent Cold": frequentCold,
              "Dry Cough": dryCough,
              "Snoring": snoring
            },
          ],
        },
        GlobalParameters: {},
      };

    const apiKey = "o84N8NkdpKnrOBeeeKca53K82pFJD1sP";
    if (!apiKey) {
      throw new Error("A key should be provided to invoke the endpoint");
    }

    const headers = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    };

    const url = "http://d8e263fa-13c0-4f0e-b374-b7e4e66be6e2.westeurope.azurecontainer.io/score";


    try {
      const response = await axios.post(url, requestBody, { headers });
      const result = response.data;
      
      if (
        result &&
        result.Results &&
        result.Results.WebServiceOutput0 &&
        result.Results.WebServiceOutput0[0] &&
        result.Results.WebServiceOutput0[0].LungCancerPrediction !== undefined
      ) {
        const prediction = result.Results.WebServiceOutput0[0];
        console.log("Prediction Result:", prediction, result);
        return prediction;
      } else {
        console.log("LungCancerPrediction property is undefined in the result:", result);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
    
  }
}

export default AzureLungCancerService;
