import React, { useState } from "react";
import AzureLungCancerService from "../service/azure-service";
import '../css/board-user.css';
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Legend, Tooltip } from 'chart.js'
Chart.register(ArcElement, Legend, Tooltip);

export const BoardUser = ({ content }) => {


  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [airPollution, setAirPollution] = useState("");
  const [alcoholUse, setAlcoholUse] = useState("");
  const [dustAllergy, setDustAllergy] = useState("");
  const [occupationalHazards, setOccupationalHazards] = useState("");
  const [geneticRisk, setGeneticRisk] = useState("");
  const [chronicLungDisease, setChronicLungDisease] = useState("");
  const [balancedDiet, setBalancedDiet] = useState("");
  const [obesity, setObesity] = useState("");
  const [smoking, setSmoking] = useState("");
  const [passiveSmoker, setPassiveSmoker] = useState("");
  const [chestPain, setChestPain] = useState("");
  const [coughingOfBlood, setCoughingOfBlood] = useState("");
  const [fatigue, setFatigue] = useState("");
  const [weightLoss, setWeightLoss] = useState("");
  const [shortnessOfBreath, setShortnessOfBreath] = useState("");
  const [wheezing, setWheezing] = useState("");
  const [swallowingDifficulty, setSwallowingDifficulty] = useState("");
  const [clubbingOfFingerNails, setClubbingOfFingerNails] = useState("");
  const [frequentCold, setFrequentCold] = useState("");
  const [dryCough, setDryCough] = useState("");
  const [snoring, setSnoring] = useState("");

  const [predictionData, setPredictionData] = useState(null);
  const [showPredictionResult, setShowPredictionResult] = useState(false);
  const [predictionResult, setPredictionResult] = useState("");
  const [showModal, setShowModal] = useState(false);
  const azureService = new AzureLungCancerService();

  const formData = {
    Age: age,
    Gender: gender,
    "What is the air pollution level where you live?": airPollution,
    "How often do you consume alcohol?": alcoholUse,
    "What is the level of your dust allergy?": dustAllergy,
    "Exposure to occupational hazards?": occupationalHazards,
    "What is the level of your genetic risk of having lung cancer?": geneticRisk,
    "Do you have a history of chronic lung disease (e.g., asthma, COPD)?": chronicLungDisease,
    "How would you rate your adherence to a balanced diet?": balancedDiet,
    "Are you currently overweight?": obesity,
    "How bad is your smoking?": smoking,
    "How often are you exposed to passive smoking?": passiveSmoker,
    "Do you experience chest pain or discomfort?": chestPain,
    "Do you experience coughing up blood?": coughingOfBlood,
    "How severe is your fatigue?": fatigue,
    "Have you experienced unexplained weight loss recently?": weightLoss,
    "How severe is your shortness of breath?": shortnessOfBreath,
    "Do you experience wheezing?": wheezing,
    "Do you have difficulty swallowing?": swallowingDifficulty,
    "Do you notice clubbing of your finger nails?": clubbingOfFingerNails,
    "How often do you experience cold symptoms?": frequentCold,
    "Do you experience a dry cough?": dryCough,
    "How severe is your snoring?": snoring,

  };

  const handleNumberClick = (fieldName, number) => {
    switch (fieldName) {
      case "What is the air pollution level where you live?": setAirPollution(number); break;
      case "How often do you consume alcohol?": setAlcoholUse(number); break;
      case "What is the level of your dust allergy?": setDustAllergy(number); break;
      case "Exposure to occupational hazards?": setOccupationalHazards(number); break;
      case "What is the level of your genetic risk of having lung cancer?": setGeneticRisk(number); break;
      case "Do you have a history of chronic lung disease (e.g., asthma, COPD)?": setChronicLungDisease(number); break;
      case "How would you rate your adherence to a balanced diet?": setBalancedDiet(number); break;
      case "Are you currently overweight?": setObesity(number); break;
      case "How bad is your smoking?": setSmoking(number); break;
      case "How often are you exposed to passive smoking?": setPassiveSmoker(number); break;
      case "Do you experience chest pain or discomfort?": setChestPain(number); break;
      case "Do you experience coughing up blood?": setCoughingOfBlood(number); break;
      case "How severe is your fatigue?": setFatigue(number); break;
      case "Have you experienced unexplained weight loss recently?": setWeightLoss(number); break;
      case "How severe is your shortness of breath?": setShortnessOfBreath(number); break;
      case "Do you experience wheezing?": setWheezing(number); break;
      case "Do you have difficulty swallowing?": setSwallowingDifficulty(number); break;
      case "Do you notice clubbing of your finger nails?": setClubbingOfFingerNails(number); break;
      case "How often do you experience cold symptoms?": setFrequentCold(number); break;
      case "Do you experience a dry cough?": setDryCough(number); break;
      case "How severe is your snoring?": setSnoring(number); break;
      default: break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    azureService.getLungCancerPrediction(
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
    )
      .then((prediction) => {
        console.log("Result from API:", prediction);
        if (prediction !== undefined) {
          console.log("Setting prediction result:", prediction);


          const totalProbability = prediction["Scored Probabilities_0"] +
            prediction["Scored Probabilities_1"] +
            prediction["Scored Probabilities_2"];


          const probability0Percentage = (prediction["Scored Probabilities_0"] / totalProbability) * 100;
          const probability1Percentage = (prediction["Scored Probabilities_1"] / totalProbability) * 100;
          const probability2Percentage = (prediction["Scored Probabilities_2"] / totalProbability) * 100;

          let resultText = "";
          if (probability0Percentage > probability1Percentage && probability0Percentage > probability2Percentage) {
            resultText = "Based on the assessment, your chances of developing lung cancer are low. The analysis suggests that you have a relatively low probability of developing lung cancer. The data indicates that your risk of lung cancer is minimal, providing reassurance for your health.";
          } else if (probability0Percentage < probability1Percentage && probability1Percentage > probability2Percentage) {
            resultText = "The evaluation reveals a moderate likelihood of developing lung cancer in your case. You fall into a category where the risk of lung cancer is neither high nor low, warranting attention. While not alarming, the analysis indicates a moderate risk of lung cancer, prompting consideration of preventive measures.";
          } else if (probability2Percentage > probability1Percentage && probability0Percentage < probability2Percentage) {
            resultText = "The results highlight a significant risk of developing lung cancer based on the data provided. Your assessment indicates a concerning probability of developing lung cancer, emphasizing the need for proactive health management. The analysis suggests a high risk of lung cancer, emphasizing the importance of early detection and lifestyle adjustments to mitigate this risk.";
          } else {
            resultText = "Your risk level is unclear";
          }

          setPredictionResult(resultText);

          setPredictionData({
            labels: ["Low risk", "Medium risk", "High risk"],
            datasets: [
              {
                label: ' Percentage (%)',
                data: [probability0Percentage, probability1Percentage, probability2Percentage],
                backgroundColor: [
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(200, 222, 76, 0.96)',
                  'rgba(232, 41, 41, 0.96)'
                ]
              }
            ]
          });
          setShowPredictionResult(true);
        } else {
          console.log("Prediction result is undefined");
          setShowPredictionResult(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching lung cancer prediction:", error);
        setShowPredictionResult(false);
      });



  };

  return (
    <div className="container2">
      <header className="jumbotron2">
        <h3>{content}</h3>
      </header>
      <p className="custom-h7">Please provide your personal information below.</p>
      <p className="custom-h6">Answer each question by rating it on a scale from 1 to 10.</p>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((fieldName) => (
          <div key={fieldName} className="form-group">
            <label htmlFor={fieldName} className="label-q">
              {fieldName}
            </label>
            {fieldName === "Age" ? (
              <input
                type="number"
                className="form-control"
                id={fieldName}
                name={fieldName}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="0"
                max="99"
                required
              />
            ) : fieldName === "Gender" ? (
              <select
                className="form-control"
                id={fieldName}
                name={fieldName}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select Gender</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
              </select>
            ) :
              (
                <div>
                  <div className="d-flex justify-content-between mt-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                      <div
                        key={number}
                        className={`number-selector${formData[fieldName] === String(number) ? ' selected' : ''}`}
                        onClick={() => handleNumberClick(fieldName, String(number))}
                      >
                        {number}
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        ))}
        <button type="submit" className="btn btn-primary btn-center mx-auto d-block">
          Predict
        </button>
      </form>


      <div className={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Prediction Result</h5>
              <button type="button" className="close" onClick={() => setShowModal(false)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{predictionResult}</p>
              {showPredictionResult && <Pie data={predictionData} />}
            </div>
          </div>
        </div>
      </div>

      {showPredictionResult && (
        <button type="button" className="btn btn-primary" onClick={() => setShowModal(true)}>
          Open Prediction Result
        </button>
      )}
      <br />
    </div>
  );
}

export default BoardUser;
