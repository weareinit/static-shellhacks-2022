import React from "react";
import "./index.css";
import FormContent from "../../sections/FormContent";

const ApplicationPage: React.FC = () => {
  return (
    <div className="formWrapper">
      <h2>Shellhacks Application</h2>
      <FormContent />
    </div>
  );
};

export default ApplicationPage;
