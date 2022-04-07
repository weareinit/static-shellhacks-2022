import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import "./index.css";
import FormContent from "../../sections/FormContent";
import * as Yup from "yup";

const ApplicationPage: React.FC = () => {
  return (
    <div className="formWrapper">
      <h2>Shellhacks Application</h2>
      <FormContent />
    </div>
  );
};

export default ApplicationPage;
