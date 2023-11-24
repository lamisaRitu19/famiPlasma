import React from "react";
import plus from "../../assets/images/plus.png";

const InputSet = ({
  editable,
  inputCount,
  setInputCount,
  inputValues,
  setInputValues,
}) => {
  const diseases = [
    "Arthritis",
    "Asthma",
    "Autoimmune Disease",
    "Cardiovascular Diseases",
    "Cancer",
    "Chronic Kidney Disease",
    "Chronic Liver Disease",
    "Chronic Respiratory Disease",
    "Chronic Pain Syndrome",
    "Depression",
    "Diabetes",
    "Gastrointestinal Disorder",
    "Heart disease",
    "HIV/AIDS",
    "Hypertension",
    "Lung cancer",
    "Mental Health Disorder",
    "Neurological Disorder",
    "Obesity",
    "Osteoporosis",
    "Stroke",
    "Thalassemia",
    "Thyroid Disorder",
    "Other",
  ];

  const handleAddInput = () => {
    setInputCount(inputCount + 1);
    setInputValues([...inputValues, { inputValueName: "", inputValueDes: "" }]);
  };

  const handleSelectChange = (index, value) => {
    const updatedValues = [...inputValues];
    updatedValues[index].inputValueName = value;
    setInputValues(updatedValues);
  };

  const handleInputChange = (index, value) => {
    const updatedValues = [...inputValues];
    updatedValues[index].inputValueDes = value;
    setInputValues(updatedValues);
  };

  return (
    <div className="sm:grid grid-cols-9 gap-3">
      {inputValues.map((value, index) => (
        <div
          key={index}
          className="sm:col-span-8 sm:grid grid-cols-8 gap-3 mb-2 sm:mb-0"
        >
          <select
            name="diseaseName"
            value={
              value.inputValueName === ""
                ? "Select your health issues"
                : value.inputValueName
            }
            onChange={(e) => handleSelectChange(index, e.target.value)}
            disabled={editable === 0}
            className="select col-span-3 bg-white border-2 border-borderGrey w-full"
          >
            <option disabled>Select your health issues</option>
            {diseases.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={value.inputValueDes}
            onChange={(e) => handleInputChange(index, e.target.value)}
            disabled={editable === 0}
            placeholder="Your health issues description"
            className="input col-span-5 bg-white border-2 border-borderGrey w-full"
          />
        </div>
      ))}
      {editable !== 0 && (
        <button
          type="button"
          onClick={handleAddInput}
          className="text-lg font-bold rounded-lg mx-auto sm:mx-0"
        >
          <img
            src={plus}
            alt="plus"
            className="bg-borderGrey w-10 rounded-full p-3 ml-auto"
          />
        </button>
      )}
    </div>
  );
};

export default InputSet;
