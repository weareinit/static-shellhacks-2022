import {
    Formik,
    Form,
    Field,
    FormikHelpers,
    FormikComputedProps,
} from "formik";
import { Emoji, EmojiProvider } from "react-apple-emojis";
import emojiData from "react-apple-emojis/lib/data.json";
import * as Yup from "yup";
import styles from "./index.module.css";
import addHacker from "../../server/functions/addHacker";
import { HackerValues } from "../../../util/types";
import React, { useState } from "react";
import { auth } from "../../server/firebaseApp";
import { onAuthStateChanged } from "firebase/auth";
import ProgressModal from "../../components/ProgressModal";
import { ProgressState } from "../../components/ProgressModal";
import { FirebaseError } from "firebase/app";
import { formatError } from "../../util/errors";
import { useRouter } from "next/router";

const SELECT_PLACEHOLDER = "-- SELECT AN OPTION --";
const REQUIRED_FIELD_ERROR = "This field is required.";

type LabelProps = {
    name: string;
    emoji: string;
    title: string;
    description?: string;
    id?: string;
    optional?: boolean;
};

const FieldLabel: React.FC<LabelProps> = (props: LabelProps) => {
    return (
        <div className={styles.fieldLabel}>
            <label
                className={styles.fieldLabelTitle}
                htmlFor={props.name}
                id={props.id}
            >
                <Emoji className={styles.applicationEmoji} name={props.emoji} />
                {props.title}{" "}
                {props.optional ? null : (
                    <span className={styles.required}>*</span>
                )}
            </label>
            <p className={styles.fieldLabelDesc}>{props.description}</p>
        </div>
    );
};

const HackerForm: React.FC = () => {
    const [isRemote, setIsRemote] = React.useState(false);
    const [isAdult, setIsAdult] = React.useState(false);
    const [isSharingInfo, setIsSharingInfo] = React.useState(false);
    const [agreedMLH, setAgreedMLH] = React.useState(false);
    const [agreedTerms, setAgreedTerms] = React.useState(false);
    const [agreedCommunications, setAgreedCommunications] =
        React.useState(false);
    const [agreedPrize, setAgreedPrize] = React.useState(false);
    const [showOtherGender, setShowOtherGender] = React.useState(false);
    const [gender, setGender] = React.useState("Other");
    const [showOtherMajor, setShowOtherMajor] = React.useState(false);
    const [major, setMajor] = React.useState("Other");
    const [showOtherSchool, setShowOtherSchool] = React.useState(false);
    const [school, setSchool] = React.useState("Other");

    const SignupSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required(REQUIRED_FIELD_ERROR),
        lastName: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required(REQUIRED_FIELD_ERROR),
        // email: Yup.string()
        //     .email("Invalid email")
        //     .required(REQUIRED_FIELD_ERROR),
        country: Yup.string().required(REQUIRED_FIELD_ERROR),
        addressLine1: Yup.string().required(REQUIRED_FIELD_ERROR),
        city: Yup.string().required(REQUIRED_FIELD_ERROR),
        state: Yup.string().required(REQUIRED_FIELD_ERROR),
        zipcode: Yup.string()
            .required(REQUIRED_FIELD_ERROR)
            .matches(/^[0-9]+$/, "Must be only digits"),
        phoneNumber: Yup.string()
            .required(REQUIRED_FIELD_ERROR)
            .matches(/^[0-9]+$/, "Must be only digits")
            .min(10, "Must be exactly 10 digits")
            .max(10, "Must be exactly 10 digits"),
        school: Yup.string().required(REQUIRED_FIELD_ERROR),
        major: Yup.string().required(REQUIRED_FIELD_ERROR),
        gender: Yup.string().required(REQUIRED_FIELD_ERROR),
        ethnicity: Yup.string().required(REQUIRED_FIELD_ERROR),
        race: Yup.string().required(REQUIRED_FIELD_ERROR),
        whyAreYouInterestedInParticipatingInShellhacks:
            Yup.string().required(REQUIRED_FIELD_ERROR),
        file: Yup.mixed().required(REQUIRED_FIELD_ERROR),
        attendance: Yup.string().required(REQUIRED_FIELD_ERROR),
        isAdult: Yup.boolean().oneOf([true], REQUIRED_FIELD_ERROR),
        isSharingInfo: Yup.boolean().oneOf([true], REQUIRED_FIELD_ERROR),
        agreedMLH: Yup.boolean().oneOf([true], REQUIRED_FIELD_ERROR),
        agreedTerms: Yup.boolean().oneOf([true], REQUIRED_FIELD_ERROR),
        agreedCommunications: Yup.boolean().oneOf([true], REQUIRED_FIELD_ERROR),
        agreedPrize: Yup.boolean().oneOf([true], REQUIRED_FIELD_ERROR),
        haveYouAttendedAHackathonBefore:
            Yup.string().required(REQUIRED_FIELD_ERROR),
    });

    const initialValues: any = {
        firstName: "",
        lastName: "",
        // email: "",
        country: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        zipcode: "",
        phoneNumber: "",
        school: "",
        major: "",
        classStanding: "",
        graduationYear: "",
        gender: "",
        ethnicity: "",
        tshirtSize: "",
        whichRoleBestDescribesYou: "",
        haveYouAttendedAHackathonBefore: "",
        haveYouAttendedShellhacksBefore: [""],
        howDidYouHearAboutShellhacks: [""],
        whyAreYouInterestedInParticipatingInShellhacks: "",
        linkedIn: "",
        github: "",
        website: "",
        attendance: "",
        isAdult: isAdult,
        isSharingInfo: isSharingInfo,
        agreedMLH: agreedMLH,
        agreedTerms: agreedTerms,
        agreedCommunications: agreedCommunications,
        agreedPrize: agreedPrize,
    };

    const [user, setUser] = React.useState<any>({});
    onAuthStateChanged(auth, (currentUser: any) => {
        setUser(currentUser);
    });
    const [hasTriedSubmitting, setHasTriedSubmitting] = useState(false);
    const [displayPopup, setDisplayPopup] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [popupState, setPopupState] = React.useState(
        ProgressState.PROCESSING
    );
    const router = useRouter();

    return (
        <section className={styles.contentBackground}>
            <h2>Hacker Application</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={SignupSchema}
                onSubmit={(
                    values: HackerValues,
                    { setSubmitting }: FormikHelpers<HackerValues>
                ) => {
                    setPopupState(ProgressState.PROCESSING);
                    setDisplayPopup(true);
                    addHacker(values, user)
                        .then(() => {
                            setPopupState(ProgressState.COMPLETE);
                            setSubmitting(false);
                            setTimeout(() => {
                                router.push("/dashboard");
                            }, 3000);
                        })
                        .catch((e: FirebaseError) => {
                            setPopupState(ProgressState.FAILED);
                            setSubmitting(false);
                            setErrorMessage(formatError(e));
                        });
                }}
            >
                {({
                    errors,
                    touched,
                    values,
                    setFieldValue,
                    setFieldTouched,
                    isValid,
                    handleChange,
                }) => (
                    <Form id="form" className={styles.form}>
                        <EmojiProvider data={emojiData}>
                            <div className={styles.fieldWrapper}>
                                <FieldLabel
                                    name="firstName"
                                    emoji="smiling-face-with-sunglasses"
                                    title="First Name"
                                    description="Let's get to know you a bit!"
                                />
                                <Field
                                    className={styles.field}
                                    id="firstName"
                                    name="firstName"
                                    placeholder="John"
                                />
                                {errors.firstName && touched.firstName ? (
                                    <div className={styles.errors}>
                                        {errors.firstName}
                                    </div>
                                ) : null}
                            </div>

                            <div className={styles.fieldWrapper}>
                                <FieldLabel
                                    name="lastName"
                                    emoji="thinking-face"
                                    title="Last Name"
                                    description="Tell us a bit more"
                                />
                                <Field
                                    className={styles.field}
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Doe"
                                />
                                {errors.lastName && touched.lastName ? (
                                    <div className={styles.errors}>
                                        {errors.lastName}
                                    </div>
                                ) : null}
                            </div>

                            {/* <div className={styles.fieldWrapper}>
                                <FieldLabel
                                    name="email"
                                    emoji="love-letter"
                                    title="E-mail"
                                    description="We won't spam, promise!"
                                />
                                <Field
                                    className={styles.field}
                                    id="email"
                                    name="email"
                                    placeholder="Shell@hacks.com"
                                    type="email"
                                />
                                {errors.email && touched.email ? (
                                    <div className={styles.errors}>{errors.email}</div>
                                ) : null}
                            </div> */}

                            <div className={styles.fieldWrapper}>
                                <FieldLabel
                                    name="country"
                                    emoji="globe-showing-americas"
                                    title="Country"
                                    description="Where in the world are you located?"
                                />
                                <Field
                                    className={`${styles.field} ${styles.select}`}
                                    as="select"
                                    name="country"
                                    id="country"
                                    validate={(value: string) => {
                                        let errorMessage;
                                        if (
                                            value == undefined ||
                                            value.length == 0
                                        ) {
                                            errorMessage = REQUIRED_FIELD_ERROR;
                                        }
                                        return errorMessage;
                                    }}
                                >
                                    <option disabled value="">
                                        {SELECT_PLACEHOLDER}
                                    </option>
                                    <option value="United States">
                                        United States
                                    </option>
                                    <option value="Afghanistan">
                                        Afghanistan
                                    </option>
                                    <option value="Albania">Albania</option>
                                    <option value="Algeria">Algeria</option>
                                    <option value="American Samoa">
                                        American Samoa
                                    </option>
                                    <option value="Andorra">Andorra</option>
                                    <option value="Angola">Angola</option>
                                    <option value="Anguilla">Anguilla</option>
                                    <option value="Antartica">
                                        Antarctica
                                    </option>
                                    <option value="Antigua and Barbuda">
                                        Antigua and Barbuda
                                    </option>
                                    <option value="Argentina">Argentina</option>
                                    <option value="Armenia">Armenia</option>
                                    <option value="Aruba">Aruba</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Austria">Austria</option>
                                    <option value="Azerbaijan">
                                        Azerbaijan
                                    </option>
                                    <option value="Bahamas">Bahamas</option>
                                    <option value="Bahrain">Bahrain</option>
                                    <option value="Bangladesh">
                                        Bangladesh
                                    </option>
                                    <option value="Barbados">Barbados</option>
                                    <option value="Belarus">Belarus</option>
                                    <option value="Belgium">Belgium</option>
                                    <option value="Belize">Belize</option>
                                    <option value="Benin">Benin</option>
                                    <option value="Bermuda">Bermuda</option>
                                    <option value="Bhutan">Bhutan</option>
                                    <option value="Bolivia">Bolivia</option>
                                    <option value="Bosnia and Herzegowina">
                                        Bosnia and Herzegowina
                                    </option>
                                    <option value="Botswana">Botswana</option>
                                    <option value="Bouvet Island">
                                        Bouvet Island
                                    </option>
                                    <option value="Brazil">Brazil</option>
                                    <option value="British Indian Ocean Territory">
                                        British Indian Ocean Territory
                                    </option>
                                    <option value="Brunei Darussalam">
                                        Brunei Darussalam
                                    </option>
                                    <option value="Bulgaria">Bulgaria</option>
                                    <option value="Burkina Faso">
                                        Burkina Faso
                                    </option>
                                    <option value="Burundi">Burundi</option>
                                    <option value="Cambodia">Cambodia</option>
                                    <option value="Cameroon">Cameroon</option>
                                    <option value="Canada">Canada</option>
                                    <option value="Cape Verde">
                                        Cape Verde
                                    </option>
                                    <option value="Cayman Islands">
                                        Cayman Islands
                                    </option>
                                    <option value="Central African Republic">
                                        Central African Republic
                                    </option>
                                    <option value="Chad">Chad</option>
                                    <option value="Chile">Chile</option>
                                    <option value="China">China</option>
                                    <option value="Christmas Island">
                                        Christmas Island
                                    </option>
                                    <option value="Cocos Islands">
                                        Cocos (Keeling) Islands
                                    </option>
                                    <option value="Colombia">Colombia</option>
                                    <option value="Comoros">Comoros</option>
                                    <option value="Congo">Congo</option>
                                    <option value="Congo">
                                        Congo, the Democratic Republic of the
                                    </option>
                                    <option value="Cook Islands">
                                        Cook Islands
                                    </option>
                                    <option value="Costa Rica">
                                        Costa Rica
                                    </option>
                                    <option value="Cota D'Ivoire">
                                        Cote d'Ivoire
                                    </option>
                                    <option value="Croatia">
                                        Croatia (Hrvatska)
                                    </option>
                                    <option value="Cuba">Cuba</option>
                                    <option value="Cyprus">Cyprus</option>
                                    <option value="Czech Republic">
                                        Czech Republic
                                    </option>
                                    <option value="Denmark">Denmark</option>
                                    <option value="Djibouti">Djibouti</option>
                                    <option value="Dominica">Dominica</option>
                                    <option value="Dominican Republic">
                                        Dominican Republic
                                    </option>
                                    <option value="East Timor">
                                        East Timor
                                    </option>
                                    <option value="Ecuador">Ecuador</option>
                                    <option value="Egypt">Egypt</option>
                                    <option value="El Salvador">
                                        El Salvador
                                    </option>
                                    <option value="Equatorial Guinea">
                                        Equatorial Guinea
                                    </option>
                                    <option value="Eritrea">Eritrea</option>
                                    <option value="Estonia">Estonia</option>
                                    <option value="Ethiopia">Ethiopia</option>
                                    <option value="Falkland Islands">
                                        Falkland Islands (Malvinas)
                                    </option>
                                    <option value="Faroe Islands">
                                        Faroe Islands
                                    </option>
                                    <option value="Fiji">Fiji</option>
                                    <option value="Finland">Finland</option>
                                    <option value="France">France</option>
                                    <option value="France Metropolitan">
                                        France, Metropolitan
                                    </option>
                                    <option value="French Guiana">
                                        French Guiana
                                    </option>
                                    <option value="French Polynesia">
                                        French Polynesia
                                    </option>
                                    <option value="French Southern Territories">
                                        French Southern Territories
                                    </option>
                                    <option value="Gabon">Gabon</option>
                                    <option value="Gambia">Gambia</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Germany">Germany</option>
                                    <option value="Ghana">Ghana</option>
                                    <option value="Gibraltar">Gibraltar</option>
                                    <option value="Greece">Greece</option>
                                    <option value="Greenland">Greenland</option>
                                    <option value="Grenada">Grenada</option>
                                    <option value="Guadeloupe">
                                        Guadeloupe
                                    </option>
                                    <option value="Guam">Guam</option>
                                    <option value="Guatemala">Guatemala</option>
                                    <option value="Guinea">Guinea</option>
                                    <option value="Guinea-Bissau">
                                        Guinea-Bissau
                                    </option>
                                    <option value="Guyana">Guyana</option>
                                    <option value="Haiti">Haiti</option>
                                    <option value="Heard and McDonald Islands">
                                        Heard and Mc Donald Islands
                                    </option>
                                    <option value="Holy See">
                                        Holy See (Vatican City State)
                                    </option>
                                    <option value="Honduras">Honduras</option>
                                    <option value="Hong Kong">Hong Kong</option>
                                    <option value="Hungary">Hungary</option>
                                    <option value="Iceland">Iceland</option>
                                    <option value="India">India</option>
                                    <option value="Indonesia">Indonesia</option>
                                    <option value="Iran">
                                        Iran (Islamic Republic of)
                                    </option>
                                    <option value="Iraq">Iraq</option>
                                    <option value="Ireland">Ireland</option>
                                    <option value="Israel">Israel</option>
                                    <option value="Italy">Italy</option>
                                    <option value="Jamaica">Jamaica</option>
                                    <option value="Japan">Japan</option>
                                    <option value="Jordan">Jordan</option>
                                    <option value="Kazakhstan">
                                        Kazakhstan
                                    </option>
                                    <option value="Kenya">Kenya</option>
                                    <option value="Kiribati">Kiribati</option>
                                    <option value="Democratic People's Republic of Korea">
                                        Korea, Democratic People's Republic of
                                    </option>
                                    <option value="Korea">
                                        Korea, Republic of
                                    </option>
                                    <option value="Kuwait">Kuwait</option>
                                    <option value="Kyrgyzstan">
                                        Kyrgyzstan
                                    </option>
                                    <option value="Lao">
                                        Lao People's Democratic Republic
                                    </option>
                                    <option value="Latvia">Latvia</option>
                                    <option value="Lebanon">Lebanon</option>
                                    <option value="Lesotho">Lesotho</option>
                                    <option value="Liberia">Liberia</option>
                                    <option value="Libyan Arab Jamahiriya">
                                        Libyan Arab Jamahiriya
                                    </option>
                                    <option value="Liechtenstein">
                                        Liechtenstein
                                    </option>
                                    <option value="Lithuania">Lithuania</option>
                                    <option value="Luxembourg">
                                        Luxembourg
                                    </option>
                                    <option value="Macau">Macau</option>
                                    <option value="Macedonia">
                                        Macedonia, The Former Yugoslav Republic
                                        of
                                    </option>
                                    <option value="Madagascar">
                                        Madagascar
                                    </option>
                                    <option value="Malawi">Malawi</option>
                                    <option value="Malaysia">Malaysia</option>
                                    <option value="Maldives">Maldives</option>
                                    <option value="Mali">Mali</option>
                                    <option value="Malta">Malta</option>
                                    <option value="Marshall Islands">
                                        Marshall Islands
                                    </option>
                                    <option value="Martinique">
                                        Martinique
                                    </option>
                                    <option value="Mauritania">
                                        Mauritania
                                    </option>
                                    <option value="Mauritius">Mauritius</option>
                                    <option value="Mayotte">Mayotte</option>
                                    <option value="Mexico">Mexico</option>
                                    <option value="Micronesia">
                                        Micronesia, Federated States of
                                    </option>
                                    <option value="Moldova">
                                        Moldova, Republic of
                                    </option>
                                    <option value="Monaco">Monaco</option>
                                    <option value="Mongolia">Mongolia</option>
                                    <option value="Montserrat">
                                        Montserrat
                                    </option>
                                    <option value="Morocco">Morocco</option>
                                    <option value="Mozambique">
                                        Mozambique
                                    </option>
                                    <option value="Myanmar">Myanmar</option>
                                    <option value="Namibia">Namibia</option>
                                    <option value="Nauru">Nauru</option>
                                    <option value="Nepal">Nepal</option>
                                    <option value="Netherlands">
                                        Netherlands
                                    </option>
                                    <option value="Netherlands Antilles">
                                        Netherlands Antilles
                                    </option>
                                    <option value="New Caledonia">
                                        New Caledonia
                                    </option>
                                    <option value="New Zealand">
                                        New Zealand
                                    </option>
                                    <option value="Nicaragua">Nicaragua</option>
                                    <option value="Niger">Niger</option>
                                    <option value="Nigeria">Nigeria</option>
                                    <option value="Niue">Niue</option>
                                    <option value="Norfolk Island">
                                        Norfolk Island
                                    </option>
                                    <option value="Northern Mariana Islands">
                                        Northern Mariana Islands
                                    </option>
                                    <option value="Norway">Norway</option>
                                    <option value="Oman">Oman</option>
                                    <option value="Pakistan">Pakistan</option>
                                    <option value="Palau">Palau</option>
                                    <option value="Panama">Panama</option>
                                    <option value="Papua New Guinea">
                                        Papua New Guinea
                                    </option>
                                    <option value="Paraguay">Paraguay</option>
                                    <option value="Peru">Peru</option>
                                    <option value="Philippines">
                                        Philippines
                                    </option>
                                    <option value="Pitcairn">Pitcairn</option>
                                    <option value="Poland">Poland</option>
                                    <option value="Portugal">Portugal</option>
                                    <option value="Puerto Rico">
                                        Puerto Rico
                                    </option>
                                    <option value="Qatar">Qatar</option>
                                    <option value="Reunion">Reunion</option>
                                    <option value="Romania">Romania</option>
                                    <option value="Russia">
                                        Russian Federation
                                    </option>
                                    <option value="Rwanda">Rwanda</option>
                                    <option value="Saint Kitts and Nevis">
                                        Saint Kitts and Nevis
                                    </option>
                                    <option value="Saint LUCIA">
                                        Saint LUCIA
                                    </option>
                                    <option value="Saint Vincent">
                                        Saint Vincent and the Grenadines
                                    </option>
                                    <option value="Samoa">Samoa</option>
                                    <option value="San Marino">
                                        San Marino
                                    </option>
                                    <option value="Sao Tome and Principe">
                                        Sao Tome and Principe
                                    </option>
                                    <option value="Saudi Arabia">
                                        Saudi Arabia
                                    </option>
                                    <option value="Senegal">Senegal</option>
                                    <option value="Seychelles">
                                        Seychelles
                                    </option>
                                    <option value="Sierra">Sierra Leone</option>
                                    <option value="Singapore">Singapore</option>
                                    <option value="Slovakia">
                                        Slovakia (Slovak Republic)
                                    </option>
                                    <option value="Slovenia">Slovenia</option>
                                    <option value="Solomon Islands">
                                        Solomon Islands
                                    </option>
                                    <option value="Somalia">Somalia</option>
                                    <option value="South Africa">
                                        South Africa
                                    </option>
                                    <option value="South Georgia">
                                        South Georgia and the South Sandwich
                                        Islands
                                    </option>
                                    <option value="Span">Spain</option>
                                    <option value="SriLanka">Sri Lanka</option>
                                    <option value="St. Helena">
                                        St. Helena
                                    </option>
                                    <option value="St. Pierre and Miguelon">
                                        St. Pierre and Miquelon
                                    </option>
                                    <option value="Sudan">Sudan</option>
                                    <option value="Suriname">Suriname</option>
                                    <option value="Svalbard">
                                        Svalbard and Jan Mayen Islands
                                    </option>
                                    <option value="Swaziland">Swaziland</option>
                                    <option value="Sweden">Sweden</option>
                                    <option value="Switzerland">
                                        Switzerland
                                    </option>
                                    <option value="Syria">
                                        Syrian Arab Republic
                                    </option>
                                    <option value="Taiwan">
                                        Taiwan, Province of China
                                    </option>
                                    <option value="Tajikistan">
                                        Tajikistan
                                    </option>
                                    <option value="Tanzania">
                                        Tanzania, United Republic of
                                    </option>
                                    <option value="Thailand">Thailand</option>
                                    <option value="Togo">Togo</option>
                                    <option value="Tokelau">Tokelau</option>
                                    <option value="Tonga">Tonga</option>
                                    <option value="Trinidad and Tobago">
                                        Trinidad and Tobago
                                    </option>
                                    <option value="Tunisia">Tunisia</option>
                                    <option value="Turkey">Turkey</option>
                                    <option value="Turkmenistan">
                                        Turkmenistan
                                    </option>
                                    <option value="Turks and Caicos">
                                        Turks and Caicos Islands
                                    </option>
                                    <option value="Tuvalu">Tuvalu</option>
                                    <option value="Uganda">Uganda</option>
                                    <option value="Ukraine">Ukraine</option>
                                    <option value="United Arab Emirates">
                                        United Arab Emirates
                                    </option>
                                    <option value="United Kingdom">
                                        United Kingdom
                                    </option>
                                    <option value="United States Minor Outlying Islands">
                                        United States Minor Outlying Islands
                                    </option>
                                    <option value="Uruguay">Uruguay</option>
                                    <option value="Uzbekistan">
                                        Uzbekistan
                                    </option>
                                    <option value="Vanuatu">Vanuatu</option>
                                    <option value="Venezuela">Venezuela</option>
                                    <option value="Vietnam">Viet Nam</option>
                                    <option value="Virgin Islands (British)">
                                        Virgin Islands (British)
                                    </option>
                                    <option value="Virgin Islands (U.S)">
                                        Virgin Islands (U.S.)
                                    </option>
                                    <option value="Wallis and Futana Islands">
                                        Wallis and Futuna Islands
                                    </option>
                                    <option value="Western Sahara">
                                        Western Sahara
                                    </option>
                                    <option value="Yemen">Yemen</option>
                                    <option value="Serbia">Serbia</option>
                                    <option value="Zambia">Zambia</option>
                                    <option value="Zimbabwe">Zimbabwe</option>
                                </Field>
                                {errors.country && touched.country ? (
                                    <div className={styles.errors}>
                                        {errors.country}
                                    </div>
                                ) : null}
                            </div>

                            <div className={styles.fieldWrapper}>
                                <FieldLabel
                                    name="addressLine1"
                                    emoji="house"
                                    title="Address - Line 1"
                                    description="Street address to deliver giveaways, swag, and prizes"
                                />
                                <Field
                                    className={styles.field}
                                    id="addressLine1"
                                    name="addressLine1"
                                    placeholder="1234 SE 89 St."
                                />
                                {errors.addressLine1 && touched.addressLine1 ? (
                                    <div className={styles.errors}>
                                        {errors.addressLine1}
                                    </div>
                                ) : null}
                            </div>

                            <div className={styles.fieldWrapper}>
                                <FieldLabel
                                    name="addressLine2"
                                    emoji="house"
                                    title="Address - Line 2"
                                    description="Other address designation"
                                    optional={true}
                                />
                                <Field
                                    className={styles.field}
                                    id="addressLine2"
                                    name="addressLine2"
                                    placeholder="Apt number"
                                />
                            </div>

                            <div className={styles.fieldWrapper}>
                                <FieldLabel
                                    name="city"
                                    emoji="automobile"
                                    title="City"
                                    description=""
                                />
                                <Field
                                    className={styles.field}
                                    id="city"
                                    name="city"
                                    placeholder="Miami"
                                />
                                {errors.city && touched.city ? (
                                    <div className={styles.errors}>
                                        {errors.city}
                                    </div>
                                ) : null}
                            </div>

                            <div className={styles.fieldWrapper}>
                                <FieldLabel
                                    name="state"
                                    emoji="round-pushpin"
                                    title="State"
                                    description=""
                                />
                                <Field
                                    className={styles.field}
                                    id="state"
                                    name="state"
                                    placeholder="FL"
                                />
                                {errors.state && touched.state ? (
                                    <div className={styles.errors}>
                                        {errors.state}
                                    </div>
                                ) : null}
                            </div>

                            <div className={styles.fieldWrapper}>
                                <FieldLabel
                                    name="zipcode"
                                    emoji="zipper-mouth-face"
                                    title="ZIP Code"
                                    description=""
                                />
                                <Field
                                    className={styles.field}
                                    id="zipcode"
                                    name="zipcode"
                                    placeholder="12345"
                                />
                                {errors.zipcode && touched.zipcode ? (
                                    <div className={styles.errors}>
                                        {errors.zipcode}
                                    </div>
                                ) : null}
                            </div>

                            <div className={styles.fieldWrapper}>
                                <FieldLabel
                                    name="phoneNumber"
                                    emoji="telephone-receiver"
                                    title="Phone Number"
                                    description="To contact you for any major announcements and prize shipment if necessary"
                                />
                                <Field
                                    className={styles.field}
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    placeholder="3051119999"
                                />
                                {errors.phoneNumber && touched.phoneNumber ? (
                                    <div className={styles.errors}>
                                        {errors.phoneNumber}
                                    </div>
                                ) : null}
                            </div>

                            <div className={styles.fieldWrapper}>
                                <FieldLabel
                                    name="school"
                                    emoji="school"
                                    title="School"
                                    description="Which school do you currently attend?"
                                />
                                <Field
                                    className={`${styles.field} ${styles.select}`}
                                    as="select"
                                    name="school"
                                    id="school"
                                    validate={(value: string) => {
                                        let errorMessage;
                                        if (
                                            value == undefined ||
                                            value.length == 0
                                        ) {
                                            errorMessage = REQUIRED_FIELD_ERROR;
                                        }
                                        return errorMessage;
                                    }}
                                    onChange={(
                                        e: React.FormEvent<HTMLInputElement>
                                    ) => {
                                        handleChange(e);
                                        setShowOtherSchool(
                                            e.currentTarget.value === school
                                        );
                                    }}
                                >
                                    <option disabled value="">
                                        {SELECT_PLACEHOLDER}
                                    </option>
                                    <option value="Florida International University">
                                        Florida International University
                                    </option>
                                    <option value="Miami Dade College">
                                        Miami Dade College
                                    </option>
                                    <option value="Broward College">
                                        Broward College
                                    </option>
                                    <option value="University of Miami">
                                        University of Miami
                                    </option>
                                    <option value="University of Central Florida">
                                        University of Central Florida
                                    </option>
                                    <option value="University of Florida">
                                        University of Florida
                                    </option>
                                    <option value="University of South Florida">
                                        University of South Florida
                                    </option>
                                    <option value="University of Tampa">
                                        University of Tampa
                                    </option>
                                    <option value="Florida State University">
                                        Florida State University
                                    </option>
                                    <option value="Florida Atlantic University">
                                        Florida Atlantic University
                                    </option>
                                    <option value="Florida A&M University">
                                        Florida A&M University
                                    </option>
                                    <option value={school}>Other</option>
                                    <option value="Adams State University">
                                        Adams State University
                                    </option>
                                    <option value="Air University">
                                        Air University{" "}
                                    </option>
                                    <option value="Alabama A&M University">
                                        Alabama A&M University
                                    </option>
                                    <option value="Alabama State University">
                                        Alabama State University
                                    </option>
                                    <option value="Amridge University">
                                        Amridge University
                                    </option>
                                    <option value="Appalachian State University">
                                        Appalachian State University
                                    </option>
                                    <option value="Arizona State University">
                                        Arizona State University
                                    </option>
                                    <option value="Arkansas State University">
                                        Arkansas State University
                                    </option>
                                    <option value="Arkansas Tech University">
                                        Arkansas Tech University
                                    </option>
                                    <option value="Auburn University at Montgomery">
                                        Auburn University at Montgomery
                                    </option>
                                    <option value="Augusta University">
                                        Augusta University
                                    </option>
                                    <option value="Baker College">
                                        Baker College
                                    </option>
                                    <option value="Barry University">
                                        Barry University
                                    </option>
                                    <option value="Baylor University">
                                        Baylor University
                                    </option>
                                    <option value="Bevill State Community College">
                                        Bevill State Community College
                                    </option>
                                    <option value="Boise State University">
                                        Boise State University
                                    </option>
                                    <option value="Boston College">
                                        Boston College
                                    </option>
                                    <option value="Bowling Green State University">
                                        Bowling Green State University
                                    </option>
                                    <option value="Bridgewater State University">
                                        Bridgewater State University
                                    </option>
                                    <option value="Brigham Young University - Idaho">
                                        Brigham Young University - Idaho
                                    </option>
                                    <option value="Brown University">
                                        Brown University
                                    </option>
                                    <option value="Butler University">
                                        Butler University
                                    </option>
                                    <option value="Calhoun Community College">
                                        Calhoun Community College
                                    </option>
                                    <option value="California Institute of Technology">
                                        California Institute of Technology
                                    </option>
                                    <option value="California Polytechnic State University">
                                        California Polytechnic State University
                                    </option>
                                    <option value="California State University, Fullerton">
                                        California State University, Fullerton
                                    </option>
                                    <option value="California State University, Long Beach">
                                        California State University, Long Beach
                                    </option>
                                    <option value="California State University, Northridge">
                                        California State University, Northridge
                                    </option>
                                    <option value="California State University, Sacramento">
                                        California State University, Sacramento
                                    </option>
                                    <option value="Carnegie Mellon University">
                                        Carnegie Mellon University
                                    </option>
                                    <option value="Central Connecticut State University">
                                        Central Connecticut State University
                                    </option>
                                    <option value="Central Maine Community College">
                                        Central Maine Community College
                                    </option>
                                    <option value="Central Michigan University">
                                        Central Michigan University
                                    </option>
                                    <option value="Central New Mexico Community College">
                                        Central New Mexico Community College
                                    </option>
                                    <option value="Century College">
                                        Century College
                                    </option>
                                    <option value="Chicago State University">
                                        Chicago State University
                                    </option>
                                    <option value="Clemson University">
                                        Clemson University
                                    </option>
                                    <option value="Cleveland State University">
                                        Cleveland State University
                                    </option>
                                    <option value="Coastal Alabama Community College">
                                        Coastal Alabama Community College
                                    </option>
                                    <option value="College of Charleston">
                                        College of Charleston
                                    </option>
                                    <option value="College of Southern Nevada">
                                        College of Southern Nevada
                                    </option>
                                    <option value="College of Western Idaho">
                                        College of Western Idaho
                                    </option>
                                    <option value="College Park">
                                        College Park
                                    </option>
                                    <option value="Colorado Community College System">
                                        Colorado Community College System
                                    </option>
                                    <option value="Colorado Mesa University">
                                        Colorado Mesa University
                                    </option>
                                    <option value="Colorado Mountain College">
                                        Colorado Mountain College
                                    </option>
                                    <option value="Colorado State University">
                                        Colorado State University
                                    </option>
                                    <option value="Columbia Southern University">
                                        Columbia Southern University
                                    </option>
                                    <option value="Columbia University">
                                        Columbia University
                                    </option>
                                    <option value="Community College of Rhode Island">
                                        Community College of Rhode Island
                                    </option>
                                    <option value="Cuyahoga Community College">
                                        Cuyahoga Community College
                                    </option>
                                    <option value="Delaware Technical Community College">
                                        Delaware Technical Community College
                                    </option>
                                    <option value="DePaul University">
                                        DePaul University
                                    </option>
                                    <option value="Des Moines Area Community College">
                                        Des Moines Area Community College
                                    </option>
                                    <option value="DeVry University">
                                        DeVry University
                                    </option>
                                    <option value="Drake University">
                                        Drake University
                                    </option>
                                    <option value="Duke University">
                                        Duke University
                                    </option>
                                    <option value="East Carolina University">
                                        East Carolina University
                                    </option>
                                    <option value="Eastern Kentucky University">
                                        Eastern Kentucky University
                                    </option>
                                    <option value="Eastern Michigan University">
                                        Eastern Michigan University
                                    </option>
                                    <option value="Embry-Riddle Aeronautical University">
                                        Embry-Riddle Aeronautical University
                                    </option>
                                    <option value="Faulkner University">
                                        Faulkner University
                                    </option>
                                    <option value="Ferris State University">
                                        Ferris State University
                                    </option>
                                    <option value="Fort Valley State University">
                                        Fort Valley State University
                                    </option>
                                    <option value="Fox Valley Technical College">
                                        Fox Valley Technical College
                                    </option>
                                    <option value="Gadsden State Community College">
                                        Gadsden State Community College
                                    </option>
                                    <option value="Gateway Community College">
                                        Gateway Community College
                                    </option>
                                    <option value="Georgia College & State University">
                                        Georgia College & State University
                                    </option>
                                    <option value="Georgia Institute of Technology">
                                        Georgia Institute of Technology
                                    </option>
                                    <option value="Grand Canyon University">
                                        Grand Canyon University
                                    </option>
                                    <option value="Grand Valley State University">
                                        Grand Valley State University
                                    </option>
                                    <option value="Greenville Technical College">
                                        Greenville Technical College
                                    </option>
                                    <option value="Harding University">
                                        Harding University
                                    </option>
                                    <option value="Harvard University">
                                        Harvard University
                                    </option>
                                    <option value="Henderson State University">
                                        Henderson State University
                                    </option>
                                    <option value="Henry Ford College">
                                        Henry Ford College
                                    </option>
                                    <option value="Idaho State University">
                                        Idaho State University
                                    </option>
                                    <option value="Illinois Colllege">
                                        Illinois Colllege
                                    </option>
                                    <option value="Illinois Institute of Technology">
                                        Illinois Institute of Technology
                                    </option>
                                    <option value="Illinois State University">
                                        Illinois State University
                                    </option>
                                    <option value="Indiana Institute of Technology">
                                        Indiana Institute of Technology
                                    </option>
                                    <option value="Indiana State University">
                                        Indiana State University
                                    </option>
                                    <option value="Iowa State University">
                                        Iowa State University
                                    </option>
                                    <option value="Jacksonville State University">
                                        Jacksonville State University
                                    </option>
                                    <option value="John Hopkins University">
                                        John Hopkins University
                                    </option>
                                    <option value="Johnson & Wales University">
                                        Johnson & Wales University
                                    </option>
                                    <option value="Kapiolani Community College">
                                        Kapiolani Community College
                                    </option>
                                    <option value="Kirkwood Community College">
                                        Kirkwood Community College
                                    </option>
                                    <option value="Lawson State Community College">
                                        Lawson State Community College
                                    </option>
                                    <option value="Leech Lake Tribal College">
                                        Leech Lake Tribal College
                                    </option>
                                    <option value="Leeward Community College">
                                        Leeward Community College
                                    </option>
                                    <option value="Louisiana State University">
                                        Louisiana State University
                                    </option>
                                    <option value="Loyola University">
                                        Loyola University
                                    </option>
                                    <option value="Loyola University - New Orleans">
                                        Loyola University - New Orleans
                                    </option>
                                    <option value="Macomb Community College">
                                        Macomb Community College
                                    </option>
                                    <option value="Madison Area Technical College">
                                        Madison Area Technical College
                                    </option>
                                    <option value="Manchester Community College">
                                        Manchester Community College
                                    </option>
                                    <option value="Marquette University">
                                        Marquette University
                                    </option>
                                    <option value="Marshall University">
                                        Marshall University
                                    </option>
                                    <option value="Massachusetts Institute of Technology">
                                        Massachusetts Institute of Technology
                                    </option>
                                    <option value="Metropolitan Community College">
                                        Metropolitan Community College
                                    </option>
                                    <option value="Metropolitan State University of Denver">
                                        Metropolitan State University of Denver
                                    </option>
                                    <option value="Michigan State University">
                                        Michigan State University
                                    </option>
                                    <option value="Middle Tennessee State University">
                                        Middle Tennessee State University
                                    </option>
                                    <option value="Midlands Technical College">
                                        Midlands Technical College
                                    </option>
                                    <option value="Midwestern University">
                                        Midwestern University
                                    </option>
                                    <option value="Mississippi College">
                                        Mississippi College
                                    </option>
                                    <option value="Mississippi State University">
                                        Mississippi State University
                                    </option>
                                    <option value="Missouri State University">
                                        Missouri State University
                                    </option>
                                    <option value="Montclair State University">
                                        Montclair State University
                                    </option>
                                    <option value="Morehead State University">
                                        Morehead State University
                                    </option>
                                    <option value="Mount Holyoke College">
                                        Mount Holyoke College
                                    </option>
                                    <option value="New Mexico State University">
                                        New Mexico State University
                                    </option>
                                    <option value="New York University">
                                        New York University
                                    </option>
                                    <option value="North Arizona University">
                                        North Arizona University
                                    </option>
                                    <option value="North Carolina Central University">
                                        North Carolina Central University
                                    </option>
                                    <option value="North Dakota State University">
                                        North Dakota State University
                                    </option>
                                    <option value="Northeastern University">
                                        Northeastern University
                                    </option>
                                    <option value="Northwest Arkansas Community College">
                                        Northwest Arkansas Community College
                                    </option>
                                    <option value="Oakland University">
                                        Oakland University
                                    </option>
                                    <option value="Ohio State University">
                                        Ohio State University
                                    </option>
                                    <option value="Oklahoma State University">
                                        Oklahoma State University
                                    </option>
                                    <option value="Oregon State University">
                                        Oregon State University
                                    </option>
                                    <option value="Ottawa University">
                                        Ottawa University
                                    </option>
                                    <option value="Park University">
                                        Park University
                                    </option>
                                    <option value="Pennsylvania State University">
                                        Pennsylvania State University
                                    </option>
                                    <option value="Portland Community College">
                                        Portland Community College
                                    </option>
                                    <option value="Portland State University">
                                        Portland State University
                                    </option>
                                    <option value="Princeton University">
                                        Princeton University
                                    </option>
                                    <option value="Queens College">
                                        Queens College
                                    </option>
                                    <option value="Quinnipiac University">
                                        Quinnipiac University
                                    </option>
                                    <option value="Rockhurst University">
                                        Rockhurst University
                                    </option>
                                    <option value="Rutgers University">
                                        Rutgers University
                                    </option>
                                    <option value="Saint Mary's College">
                                        Saint Mary's College
                                    </option>
                                    <option value="Saint Xavier University">
                                        Saint Xavier University
                                    </option>
                                    <option value="Salem State University">
                                        Salem State University
                                    </option>
                                    <option value="Samford University">
                                        Samford University
                                    </option>
                                    <option value="San Diego State University">
                                        San Diego State University
                                    </option>
                                    <option value="San Francisco State University">
                                        San Francisco State University
                                    </option>
                                    <option value="San Jose State University">
                                        San Jose State University
                                    </option>
                                    <option value="Shelton State Community College">
                                        Shelton State Community College
                                    </option>
                                    <option value="South Dakota State University">
                                        South Dakota State University
                                    </option>
                                    <option value="Southern Connecticut State University">
                                        Southern Connecticut State University
                                    </option>
                                    <option value="Southern Maine Community College">
                                        Southern Maine Community College
                                    </option>
                                    <option value="Southern New Hampshire University">
                                        Southern New Hampshire University
                                    </option>
                                    <option value="Southern University">
                                        Southern University
                                    </option>
                                    <option value="Stanford University">
                                        Stanford University
                                    </option>
                                    <option value="Strayer University">
                                        Strayer University
                                    </option>
                                    <option value="Temple University">
                                        Temple University
                                    </option>
                                    <option value="Texas A&M University">
                                        Texas A&M University
                                    </option>
                                    <option value="Texas State University">
                                        Texas State University
                                    </option>
                                    <option value="Texas Tech University">
                                        Texas Tech University
                                    </option>
                                    <option value="The City College of New York">
                                        The City College of New York
                                    </option>
                                    <option value="Towson University">
                                        Towson University
                                    </option>
                                    <option value="Trident Technical College">
                                        Trident Technical College
                                    </option>
                                    <option value="Troy University">
                                        Troy University
                                    </option>
                                    <option value="University at Buffalo">
                                        University at Buffalo
                                    </option>
                                    <option value="University of Akron">
                                        University of Akron
                                    </option>
                                    <option value="University of Alabama">
                                        University of Alabama
                                    </option>
                                    <option value="University of Alaska Anchorage">
                                        University of Alaska Anchorage
                                    </option>
                                    <option value="University of Alaska Fairbanks">
                                        University of Alaska Fairbanks
                                    </option>
                                    <option value="University of Alaska Southeast">
                                        University of Alaska Southeast
                                    </option>
                                    <option value="University of Arizona">
                                        University of Arizona
                                    </option>
                                    <option value="University of Arkansas">
                                        University of Arkansas
                                    </option>
                                    <option value="University of Arkansas - Pulaski Technical College">
                                        University of Arkansas - Pulaski
                                        Technical College
                                    </option>
                                    <option value="University of Arkansas at Little Rock">
                                        University of Arkansas at Little Rock
                                    </option>
                                    <option value="University of California, Berkeley">
                                        University of California, Berkeley
                                    </option>
                                    <option value="University of California, Davis">
                                        University of California, Davis
                                    </option>
                                    <option value="University of California, Irvine">
                                        University of California, Irvine
                                    </option>
                                    <option value="University of California, Los Angeles">
                                        University of California, Los Angeles
                                    </option>
                                    <option value="University of California, Riverside">
                                        University of California, Riverside
                                    </option>
                                    <option value="University of California, San Diego">
                                        University of California, San Diego
                                    </option>
                                    <option value="University of California, Santa Barbara">
                                        University of California, Santa Barbara
                                    </option>
                                    <option value="University of California, Santa Cruz">
                                        University of California, Santa Cruz
                                    </option>
                                    <option value="University of Central Arkansas">
                                        University of Central Arkansas
                                    </option>
                                    <option value="University of Central Missouri">
                                        University of Central Missouri
                                    </option>
                                    <option value="University of Central Oklahoma">
                                        University of Central Oklahoma
                                    </option>
                                    <option value="University of Chicago">
                                        University of Chicago
                                    </option>
                                    <option value="University of Cincinnati">
                                        University of Cincinnati
                                    </option>
                                    <option value="University of Colorado Boulder">
                                        University of Colorado Boulder
                                    </option>
                                    <option value="University of Colorado Denver">
                                        University of Colorado Denver
                                    </option>
                                    <option value="University of Connecticut">
                                        University of Connecticut
                                    </option>
                                    <option value="University of Delaware">
                                        University of Delaware
                                    </option>
                                    <option value="University of Denver">
                                        University of Denver
                                    </option>
                                    <option value="University of Georgia">
                                        University of Georgia
                                    </option>
                                    <option value="University of Hawaii at Manoa">
                                        University of Hawaii at Manoa
                                    </option>
                                    <option value="University of Houston">
                                        University of Houston
                                    </option>
                                    <option value="University of Idaho">
                                        University of Idaho
                                    </option>
                                    <option value="University of Indianapolis">
                                        University of Indianapolis
                                    </option>
                                    <option value="University of Iowa">
                                        University of Iowa
                                    </option>
                                    <option value="University of Kentucky">
                                        University of Kentucky
                                    </option>
                                    <option value="University of Louisville">
                                        University of Louisville
                                    </option>
                                    <option value="University of Maine">
                                        University of Maine
                                    </option>
                                    <option value="University of Maryland">
                                        University of Maryland
                                    </option>
                                    <option value="University of Maryland Global Campus">
                                        University of Maryland Global Campus
                                    </option>
                                    <option value="University of Massachusetts Boston">
                                        University of Massachusetts Boston
                                    </option>
                                    <option value="University of Massachusetts Lowell">
                                        University of Massachusetts Lowell
                                    </option>
                                    <option value="University of Memphis">
                                        University of Memphis
                                    </option>
                                    <option value="University of Michigan">
                                        University of Michigan
                                    </option>
                                    <option value="University of Minnesota, Twin Cities">
                                        University of Minnesota, Twin Cities
                                    </option>
                                    <option value="University of Mississippi">
                                        University of Mississippi
                                    </option>
                                    <option value="University of Missouri-Kansas City">
                                        University of Missouri-Kansas City
                                    </option>
                                    <option value="University of Montana">
                                        University of Montana
                                    </option>
                                    <option value="University of Nebraska Omaha">
                                        University of Nebraska Omaha
                                    </option>
                                    <option value="University of Nebraska-Lincoln">
                                        University of Nebraska-Lincoln
                                    </option>
                                    <option value="University of Nevada, Las Vegas">
                                        University of Nevada, Las Vegas
                                    </option>
                                    <option value="University of Nevada, Reno">
                                        University of Nevada, Reno
                                    </option>
                                    <option value="University of New England">
                                        University of New England
                                    </option>
                                    <option value="University of New Hampshire">
                                        University of New Hampshire
                                    </option>
                                    <option value="University of New Mexico">
                                        University of New Mexico
                                    </option>
                                    <option value="University of New Orleans">
                                        University of New Orleans
                                    </option>
                                    <option value="University of North Alabama">
                                        University of North Alabama
                                    </option>
                                    <option value="University of North Carolina at Chapel Hill">
                                        University of North Carolina at Chapel
                                        Hill
                                    </option>
                                    <option value="University of North Carolina at Charlotte">
                                        University of North Carolina at
                                        Charlotte
                                    </option>
                                    <option value="University of North Dakota">
                                        University of North Dakota
                                    </option>
                                    <option value="University of North Georgia">
                                        University of North Georgia
                                    </option>
                                    <option value="University of Notre Dame">
                                        University of Notre Dame
                                    </option>
                                    <option value="University of Oklahoma">
                                        University of Oklahoma
                                    </option>
                                    <option value="University of Oregon">
                                        University of Oregon
                                    </option>
                                    <option value="University of Phoenix">
                                        University of Phoenix
                                    </option>
                                    <option value="University of Pittsburgh">
                                        University of Pittsburgh
                                    </option>
                                    <option value="University of Rhode Island">
                                        University of Rhode Island
                                    </option>
                                    <option value="University of South Alabama">
                                        University of South Alabama
                                    </option>
                                    <option value="University of South Carolina Columbia (Main Campus)">
                                        University of South Carolina Columbia
                                        (Main Campus)
                                    </option>
                                    <option value="University of South Dakota">
                                        University of South Dakota
                                    </option>
                                    <option value="University of Tennessee (Flagship university)">
                                        University of Tennessee (Flagship
                                        university)
                                    </option>
                                    <option value="University of Tennessee at Chattanooga">
                                        University of Tennessee at Chattanooga
                                    </option>
                                    <option value="University of Texas at Austin">
                                        University of Texas at Austin
                                    </option>
                                    <option value="University of Utah">
                                        University of Utah
                                    </option>
                                    <option value="University of Vermont">
                                        University of Vermont
                                    </option>
                                    <option value="University of Washington">
                                        University of Washington
                                    </option>
                                    <option value="University of West Alabama">
                                        University of West Alabama
                                    </option>
                                    <option value="University of Wisconsin - Madison">
                                        University of Wisconsin - Madison
                                    </option>
                                    <option value="University of Wyoming">
                                        University of Wyoming
                                    </option>
                                    <option value="Utah State University">
                                        Utah State University
                                    </option>
                                    <option value="Utah Valley University">
                                        Utah Valley University
                                    </option>
                                    <option value="Vanderbilt University">
                                        Vanderbilt University
                                    </option>
                                    <option value="Wake Forest University">
                                        Wake Forest University
                                    </option>
                                    <option value="Wallace State Community College">
                                        Wallace State Community College
                                    </option>
                                    <option value="Washington State University">
                                        Washington State University
                                    </option>
                                    <option value="Wayland Baptist University">
                                        Wayland Baptist University
                                    </option>
                                    <option value="Wayne State University">
                                        Wayne State University
                                    </option>
                                    <option value="West Virginia University">
                                        West Virginia University
                                    </option>
                                    <option value="Western Iowa Tech Community College">
                                        Western Iowa Tech Community College
                                    </option>
                                    <option value="Wilkes University">
                                        Wilkes University
                                    </option>
                                    <option value="Wilmington University">
                                        Wilmington University
                                    </option>
                                    <option value="Wright State University">
                                        Wright State University
                                    </option>
                                    <option value="Xavier University of Louisiana - New Orleans">
                                        Xavier University of Louisiana - New
                                        Orleans
                                    </option>
                                    <option value="Yale University">
                                        Yale University
                                    </option>
                                </Field>
                                {showOtherSchool ? (
                                    <Field
                                        className={`${styles.field} ${styles.other}`}
                                        id="school"
                                        name="school"
                                        onChange={(
                                            e: React.FormEvent<HTMLInputElement>
                                        ) => {
                                            handleChange(e);
                                            setSchool(e.currentTarget.value);
                                        }}
                                    />
                                ) : null}
                                {errors.school && touched.school ? (
                                    <div className={styles.errors}>
                                        {errors.school}
                                    </div>
                                ) : null}
                            </div>

                            <div className={styles.fieldWrapper}>
                                <FieldLabel
                                    name="major"
                                    emoji="books"
                                    title="Major"
                                    description="What are you currently studying?"
                                />
                                <Field
                                    className={`${styles.field} ${styles.select}`}
                                    as="select"
                                    name="major"
                                    id="major"
                                    validate={(value: string) => {
                                        let errorMessage;
                                        if (
                                            value == undefined ||
                                            value.length == 0
                                        ) {
                                            errorMessage = REQUIRED_FIELD_ERROR;
                                        }
                                        return errorMessage;
                                    }}
                                    onChange={(
                                        e: React.FormEvent<HTMLInputElement>
                                    ) => {
                                        handleChange(e);
                                        setShowOtherMajor(
                                            e.currentTarget.value === major
                                        );
                                    }}
                                >
                                    <option disabled value="">
                                        {SELECT_PLACEHOLDER}
                                    </option>
                                    <option value="Computer Science">
                                        Computer Science
                                    </option>
                                    <option value="Computer Engineering">
                                        Computer Engineering
                                    </option>
                                    <option value="Computer and Information Systems">
                                        Computer and Information Systems
                                    </option>
                                    <option value="Cybersecurity">
                                        Cybersecurity
                                    </option>
                                    <option value="Information Technology">
                                        Information Technology
                                    </option>
                                    <option value="Internet of Things">
                                        Internet of Things
                                    </option>
                                    <option value={major}>Other</option>
                                    <option value="Accounting">
                                        Accounting
                                    </option>
                                    <option value="Advertising and Public Relations">
                                        Advertising and Public Relations
                                    </option>
                                    <option value="Aerospace Engineering">
                                        Aerospace Engineering
                                    </option>
                                    <option value="Agricultural Economics">
                                        Agricultural Economics
                                    </option>
                                    <option value="Agriculture Production and Management">
                                        Agriculture Production and Management
                                    </option>
                                    <option value="Animal Services">
                                        Animal Services
                                    </option>
                                    <option value="Applied Mathematics">
                                        Applied Mathematics
                                    </option>
                                    <option value="Architecture">
                                        Architecture
                                    </option>
                                    <option value="Art History">
                                        Art History
                                    </option>
                                    <option value="Astronomy">Astronomy</option>
                                    <option value="Biochemical Sciences">
                                        Biochemical Sciences
                                    </option>
                                    <option value="Biology">Biology</option>
                                    <option value="Biomedical Engineering">
                                        Biomedical Engineering
                                    </option>
                                    <option value="Botany">Botany</option>
                                    <option value="Business Management and Administration">
                                        Business Management and Administration
                                    </option>
                                    <option value="Chemical Engineering">
                                        Chemical Engineering
                                    </option>
                                    <option value="Chemistry">Chemistry</option>
                                    <option value="Civil Engineering">
                                        Civil Engineering
                                    </option>
                                    <option value="Commercial Art and Graphic Design">
                                        Commercial Art and Graphic Design
                                    </option>
                                    <option value="Communication Disorders Sciences and Services">
                                        Communication Disorders Sciences and
                                        Services
                                    </option>
                                    <option value="Communication Technologies">
                                        Communication Technologies
                                    </option>
                                    <option value="Communications">
                                        Communications
                                    </option>
                                    <option value="Construction Services">
                                        Construction Services
                                    </option>
                                    <option value="Court Reporting">
                                        Court Reporting
                                    </option>
                                    <option value="Criminal Justice">
                                        Criminal Justice
                                    </option>
                                    <option value="Criminology">
                                        Criminology
                                    </option>
                                    <option value="Drama and Theater Arts">
                                        Drama and Theater Arts
                                    </option>
                                    <option value="Early Childhood Education">
                                        Early Childhood Education
                                    </option>
                                    <option value="Ecology">Ecology</option>
                                    <option value="Economics">Economics</option>
                                    <option value="Educational Administration and Supervision">
                                        Educational Administration and
                                        Supervision
                                    </option>
                                    <option value="Electrical Engineering">
                                        Electrical Engineering
                                    </option>
                                    <option value="Engineering and Industrial Management">
                                        Engineering and Industrial Management
                                    </option>
                                    <option value="English Language and Rhetoric">
                                        English Language and Rhetoric
                                    </option>
                                    <option value="Environmental Engineering">
                                        Environmental Engineering
                                    </option>
                                    <option value="Environmental Science">
                                        Environmental Science
                                    </option>
                                    <option value="Film Video and Photographic Arts">
                                        Film Video and Photographic Arts
                                    </option>
                                    <option value="Finance">Finance</option>
                                    <option value="Fine Arts">Fine Arts</option>
                                    <option value="Food Science">
                                        Food Science
                                    </option>
                                    <option value="Forestry">Forestry</option>
                                    <option value="General Agriculture">
                                        General Agriculture
                                    </option>
                                    <option value="General Business">
                                        General Business
                                    </option>
                                    <option value="General Education">
                                        General Education
                                    </option>
                                    <option value="Genetics">Genetics</option>
                                    <option value="Geology">Geology</option>
                                    <option value="Health and Medical Administrative Services">
                                        Health and Medical Administrative
                                        Services
                                    </option>
                                    <option value="History">History</option>
                                    <option value="Hospitality Management">
                                        Hospitality Management
                                    </option>
                                    <option value="Human Resources and Personnel Management">
                                        Human Resources and Personnel Management
                                    </option>
                                    <option value="Humanities">
                                        Humanities
                                    </option>
                                    <option value="International Business">
                                        International Business
                                    </option>
                                    <option value="International Relations">
                                        International Relations
                                    </option>
                                    <option value="Journalism">
                                        Journalism
                                    </option>
                                    <option value="Liberal Arts">
                                        Liberal Arts
                                    </option>
                                    <option value="Library Science">
                                        Library Science
                                    </option>
                                    <option value="Marketing and Marketing Research">
                                        Marketing and Marketing Research
                                    </option>
                                    <option value="Mass Media">
                                        Mass Media
                                    </option>
                                    <option value="Mathematics">
                                        Mathematics
                                    </option>
                                    <option value="Mathematics Teacher Education">
                                        Mathematics Teacher Education
                                    </option>
                                    <option value="Mechanical Engineering">
                                        Mechanical Engineering
                                    </option>
                                    <option value="Medical Technologies Technicians">
                                        Medical Technologies Technicians
                                    </option>
                                    <option value="Microbiology">
                                        Microbiology
                                    </option>
                                    <option value="Music">Music</option>
                                    <option value="Natural Resources Management">
                                        Natural Resources Management
                                    </option>
                                    <option value="Neuroscience">
                                        Neuroscience
                                    </option>
                                    <option value="Nursing">Nursing</option>
                                    <option value="Nutrition Sciences">
                                        Nutrition Sciences
                                    </option>
                                    <option value="Oceanography">
                                        Oceanography
                                    </option>
                                    <option value="Operations Logistics and E-Commerce">
                                        Operations Logistics and E-Commerce
                                    </option>
                                    <option value="Pharmacology">
                                        Pharmacology
                                    </option>
                                    <option value="Philosophy and Religious Studies">
                                        Philosophy and Religious Studies
                                    </option>
                                    <option value="Physical and Health Teacher Education">
                                        Physical and Health Teacher Education
                                    </option>
                                    <option value="Physics">Physics</option>
                                    <option value="Physiology">
                                        Physiology
                                    </option>
                                    <option value="Plant Science and Agronomy">
                                        Plant Science and Agronomy
                                    </option>
                                    <option value="Political Science">
                                        Political Science
                                    </option>
                                    <option value="Pre-Law and Legal Studies">
                                        Pre-Law and Legal Studies
                                    </option>
                                    <option value="Psychology">
                                        Psychology
                                    </option>
                                    <option value="School Student Counseling">
                                        School Student Counseling
                                    </option>
                                    <option value="Science or Computer Teacher Education">
                                        Science or Computer Teacher Education
                                    </option>
                                    <option value="Secondary Teacher Education">
                                        Secondary Teacher Education
                                    </option>
                                    <option value="Social Science or History Teacher Education">
                                        Social Science or History Teacher
                                        Education
                                    </option>
                                    <option value="Soil Science">
                                        Soil Science
                                    </option>
                                    <option value="Special Needs Education">
                                        Special Needs Education
                                    </option>
                                    <option value="Statistics">
                                        Statistics
                                    </option>
                                    <option value="Studio Arts">
                                        Studio Arts
                                    </option>
                                    <option value="Theology and Religious Vocations">
                                        Theology and Religious Vocations
                                    </option>
                                    <option value="Visual and Performing Arts">
                                        Visual and Performing Arts
                                    </option>
                                    <option value="Zoology">Zoology</option>
                                </Field>
                                {showOtherMajor ? (
                                    <Field
                                        className={`${styles.field} ${styles.other}`}
                                        id="major"
                                        name="major"
                                        onChange={(
                                            e: React.FormEvent<HTMLInputElement>
                                        ) => {
                                            handleChange(e);
                                            setMajor(e.currentTarget.value);
                                        }}
                                    />
                                ) : null}
                                {errors.major && touched.major ? (
                                    <div className={styles.errors}>
                                        {errors.major}
                                    </div>
                                ) : null}
                            </div>

                            <div className={styles.fieldWrapper}>
                                <FieldLabel
                                    name="classStanding"
                                    emoji="red-apple"
                                    title="Class Standing"
                                    description="Where are you in your college career?"
                                />
                                <Field
                                    className={`${styles.field} ${styles.select}`}
                                    as="select"
                                    name="classStanding"
                                    id="classStanding"
                                    validate={(value: string) => {
                                        let errorMessage;
                                        if (
                                            value == undefined ||
                                            value.length == 0
                                        ) {
                                            errorMessage = REQUIRED_FIELD_ERROR;
                                        }
                                        return errorMessage;
                                    }}
                                >
                                    <option disabled value="">
                                        {SELECT_PLACEHOLDER}
                                    </option>
                                    <option value="Freshman">Freshman</option>
                                    <option value="Sophomore">Sophomore</option>
                                    <option value="Junior">Junior</option>
                                    <option value="Senior">Senior</option>
                                    <option value="Masters">Masters</option>
                                    <option value="PhD">PhD</option>
                                    <option value="New Grad">New Grad</option>
                                    <option value="Bootcamp Student">
                                        Bootcamp Student
                                    </option>
                                </Field>
                                {errors.classStanding &&
                                touched.classStanding ? (
                                    <div className={styles.errors}>
                                        {errors.classStanding}
                                    </div>
                                ) : null}
                            </div>

                            <div className={styles.fieldWrapper}>
                                <FieldLabel
                                    name="graduationYear"
                                    emoji="graduation-cap"
                                    title="Graduation Year"
                                    description="When are you finishing your degree?"
                                />
                                <Field
                                    className={`${styles.field} ${styles.select}`}
                                    as="select"
                                    name="graduationYear"
                                    id="graduationYear"
                                    validate={(value: string) => {
                                        let errorMessage;
                                        if (
                                            value == undefined ||
                                            value.length == 0
                                        ) {
                                            errorMessage = REQUIRED_FIELD_ERROR;
                                        }
                                        return errorMessage;
                                    }}
                                >
                                    <option disabled value="">
                                        {SELECT_PLACEHOLDER}
                                    </option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                </Field>
                                {errors.graduationYear &&
                                touched.graduationYear ? (
                                    <div className={styles.errors}>
                                        {errors.graduationYear}
                                    </div>
                                ) : null}
                            </div>

                            <div className={styles.fieldWrapper}>
                                <FieldLabel
                                    name="gender"
                                    emoji="dolphin"
                                    title="Gender"
                                    description="For demographic purposes only"
                                />
                                <label>
                                    <Field
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        className={styles.radioButton}
                                        onChange={(e: React.ChangeEvent) => {
                                            handleChange(e);
                                            setShowOtherGender(false);
                                        }}
                                    />
                                    Female
                                </label>
                                <label>
                                    <Field
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        className={styles.radioButton}
                                        onChange={(e: React.ChangeEvent) => {
                                            handleChange(e);
                                            setShowOtherGender(false);
                                        }}
                                    />
                                    Male
                                </label>
                                <label>
                                    <Field
                                        type="radio"
                                        name="gender"
                                        value="Non-binary"
                                        className={styles.radioButton}
                                        onChange={(e: React.ChangeEvent) => {
                                            handleChange(e);
                                            setShowOtherGender(false);
                                        }}
                                    />
                                    Non-binary
                                </label>
                                <label>
                                    <Field
                                        type="radio"
                                        className={styles.radioButton}
                                        value="Prefer not to answer"
                                        name="gender"
                                        onChange={(e: React.ChangeEvent) => {
                                            handleChange(e);
                                            setShowOtherGender(false);
                                        }}
                                    />
                                    Prefer not to answer
                                </label>
                                <label>
                                    <Field
                                        type="radio"
                                        className={styles.radioButton}
                                        value={gender}
                                        name="gender"
                                        onChange={(e: React.ChangeEvent) => {
                                            handleChange(e);
                                            setShowOtherGender(
                                                !showOtherGender
                                            );
                                        }}
                                    />
                                    Other
                                </label>
                                {showOtherGender ? (
                                    <Field
                                        className={`${styles.field} ${styles.other}`}
                                        id="gender"
                                        name="gender"
                                        onChange={(
                                            e: React.FormEvent<HTMLInputElement>
                                        ) => {
                                            handleChange(e);
                                            setGender(e.currentTarget.value);
                                        }}
                                    />
                                ) : null}
                                {errors.gender && touched.gender ? (
                                    <div className={styles.errors}>
                                        {errors.gender}
                                    </div>
                                ) : null}
                            </div>

                            <div className={styles.fieldWrapper}>
                                <FieldLabel
                                    name="ethnicity"
                                    emoji="penguin"
                                    title="Ethnicity"
                                    description="For demographic purposes only"
                                />
                                <label>
                                    <Field
                                        type="radio"
                                        name="ethnicity"
                                        value="Hispanic or Latinx"
                                        className={styles.radioButton}
                                    />
                                    Hispanic or Latinx
                                </label>
                                <label>
                                    <Field
                                        type="radio"
                                        name="ethnicity"
                                        value="Not Hispanic or Latinx"
                                        className={styles.radioButton}
                                    />
                                    Not Hispanic or Latinx
                                </label>
                                <label>
                                    <Field
                                        type="radio"
                                        name="ethnicity"
                                        value="Prefer not to answer"
                                        className={styles.radioButton}
                                    />
                                    Prefer not to answer
                                </label>
                                {errors.ethnicity && touched.ethnicity ? (
                                    <div className={styles.errors}>
                                        {errors.ethnicity}
                                    </div>
                                ) : null}
                            </div>

                            <div className={styles.fieldWrapper}>
                                <FieldLabel
                                    name="race"
                                    emoji="umbrella-on-ground"
                                    title="Race"
                                    description="For demographic purposes only"
                                />
                                <div
                                    className="checkboxGroup"
                                    role="group"
                                    aria-labelledby="checkbox-group"
                                >
                                    <label>
                                        <Field
                                            type="radio"
                                            name="race"
                                            value="American Indian or Alaska Native"
                                            className={styles.radioButton}
                                        />
                                        American Indian or Alaska Native
                                    </label>
                                    <label>
                                        <Field
                                            type="radio"
                                            name="race"
                                            value="Asian"
                                            className={styles.radioButton}
                                        />
                                        Asian
                                    </label>
                                    <label>
                                        <Field
                                            type="radio"
                                            name="race"
                                            value="Black or African American"
                                            className={styles.radioButton}
                                        />
                                        Black or African American
                                    </label>
                                    <label>
                                        <Field
                                            type="radio"
                                            name="race"
                                            value="Native Hawaiian Or Other Pacific Islander"
                                            className={styles.radioButton}
                                        />
                                        Native Hawaiian Or Other Pacific
                                        Islander
                                    </label>
                                    <label>
                                        <Field
                                            type="radio"
                                            name="race"
                                            value="White"
                                            className={styles.radioButton}
                                        />
                                        White
                                    </label>
                                    <label>
                                        <Field
                                            type="radio"
                                            name="race"
                                            value="Multiracial"
                                            className={styles.radioButton}
                                        />
                                        Multiracial
                                    </label>
                                    <label>
                                        <Field
                                            type="radio"
                                            name="race"
                                            value="Prefer not to answer"
                                            className={styles.radioButton}
                                        />
                                        Prefer not to answer
                                    </label>
                                </div>
                                {errors.race && touched.race ? (
                                    <div className={styles.errors}>
                                        {errors.race}
                                    </div>
                                ) : null}
                            </div>

                            <div className={styles.fieldWrapper}>
                                <FieldLabel
                                    name="tshirtSize"
                                    emoji="t-shirt"
                                    title="T-Shirt Size"
                                    description=""
                                />
                                <label>
                                    <Field
                                        type="radio"
                                        name="tshirtSize"
                                        value="S"
                                        className={styles.radioButton}
                                    />
                                    S
                                </label>
                                <label>
                                    <Field
                                        type="radio"
                                        name="tshirtSize"
                                        value="M"
                                        className={styles.radioButton}
                                    />
                                    M
                                </label>
                                <label>
                                    <Field
                                        type="radio"
                                        name="tshirtSize"
                                        value="L"
                                        className={styles.radioButton}
                                    />
                                    L
                                </label>
                                <label>
                                    <Field
                                        type="radio"
                                        name="tshirtSize"
                                        value="XL"
                                        className={styles.radioButton}
                                    />
                                    XL
                                </label>
                                <label>
                                    <Field
                                        type="radio"
                                        name="tshirtSize"
                                        value="XXL"
                                        className={styles.radioButton}
                                    />
                                    XXL
                                </label>
                                {errors.tshirtSize && touched.tshirtSize ? (
                                    <div className={styles.errors}>
                                        {errors.tshirtSize}
                                    </div>
                                ) : null}
                            </div>

                            <div className={styles.fieldWrapper}>
                                <FieldLabel
                                    name="whichRoleBestDescribesYou"
                                    emoji="disguised-face"
                                    title="Which role best describes you?"
                                    description=""
                                />
                                <Field
                                    className={`${styles.field} ${styles.select}`}
                                    as="select"
                                    name="whichRoleBestDescribesYou"
                                    id="whichRoleBestDescribesYou"
                                    validate={(value: string) => {
                                        let errorMessage;
                                        if (
                                            value == undefined ||
                                            value.length == 0
                                        ) {
                                            errorMessage = REQUIRED_FIELD_ERROR;
                                        }
                                        return errorMessage;
                                    }}
                                >
                                    <option disabled value="">
                                        {SELECT_PLACEHOLDER}
                                    </option>
                                    <option value="Artist">Artist</option>
                                    <option value="Back-End Developer">
                                        Back-End Developer
                                    </option>
                                    <option value="Computer Engineer">
                                        Computer Engineer
                                    </option>
                                    <option value="Cybersecurity Professional">
                                        Cybersecurity Professional
                                    </option>
                                    <option value="Data Engineer">
                                        Data Engineer
                                    </option>
                                    <option value="Data Scientist">
                                        Data Scientist
                                    </option>
                                    <option value="Devops Engineer">
                                        Devops Engineer
                                    </option>
                                    <option value="Entrepreneur">
                                        Entrepreneur
                                    </option>
                                    <option value="Front-End Developer">
                                        Front-End Developer
                                    </option>
                                    <option value="Full-Stack Developer">
                                        Full-Stack Developer
                                    </option>
                                    <option value="Game Developer">
                                        Game Developer
                                    </option>
                                    <option value="Graphic Designer">
                                        Graphic Designer
                                    </option>
                                    <option value="IT Specialist">
                                        IT Specialist
                                    </option>
                                    <option value="Machine Learning Engineer">
                                        Machine Learning Engineer
                                    </option>
                                    <option value="Mobile Developer">
                                        Mobile Developer
                                    </option>
                                    <option value="Musician">Musician</option>
                                    <option value="Product Manager">
                                        Product Manager
                                    </option>
                                    <option value="Product Designer">
                                        Product Designer
                                    </option>
                                    <option value="Software Engineer">
                                        Software Engineer
                                    </option>
                                    <option value="UI/UX Designer">
                                        UI/UX Designer
                                    </option>
                                    <option value="Web Developer">
                                        Web Developer
                                    </option>
                                </Field>
                                {errors.whichRoleBestDescribesYou &&
                                touched.whichRoleBestDescribesYou ? (
                                    <div className={styles.errors}>
                                        {errors.whichRoleBestDescribesYou}
                                    </div>
                                ) : null}
                            </div>

                            <div className={styles.fieldWrapper}>
                                <FieldLabel
                                    name=""
                                    emoji="sun"
                                    title="Have you attended a hackathon before?"
                                    description="If you haven't, that's totally okay!"
                                    id="radio-group-1"
                                />
                                <Field
                                    className={`${styles.field} ${styles.select}`}
                                    as="select"
                                    name="haveYouAttendedAHackathonBefore"
                                    id="haveYouAttendedAHackathonBefore"
                                    validate={(value: string) => {
                                        let errorMessage;
                                        if (
                                            value == undefined ||
                                            value.length == 0
                                        ) {
                                            errorMessage = REQUIRED_FIELD_ERROR;
                                        }
                                        return errorMessage;
                                    }}
                                >
                                    <option disabled value="">
                                        {SELECT_PLACEHOLDER}
                                    </option>
                                    <option value="None">None</option>
                                    <option value="One">
                                        Yes, 1 hackathon
                                    </option>
                                    <option value="Two to Four">
                                        Yes, 2-4 hackathons
                                    </option>
                                    <option value="Five or More">
                                        Yes, 5+ hackathons
                                    </option>
                                </Field>
                                {errors.haveYouAttendedAHackathonBefore &&
                                touched.haveYouAttendedAHackathonBefore ? (
                                    <div className={styles.errors}>
                                        {errors.haveYouAttendedAHackathonBefore}
                                    </div>
                                ) : null}
                            </div>

                            <div className={styles.fieldWrapper}>
                                <FieldLabel
                                    name=""
                                    emoji="palm-tree"
                                    title="Have you attended ShellHacks before?"
                                    description="How far back do we go?"
                                    id="checkbox-group-1"
                                    optional={true}
                                />
                                <div
                                    className="checkboxGroup"
                                    role="group"
                                    aria-labelledby="checkbox-group"
                                >
                                    <label>
                                        <Field
                                            type="checkbox"
                                            name="haveYouAttendedShellhacksBefore"
                                            value="ShellHacks 2017"
                                        />
                                        ShellHacks 2017
                                    </label>
                                    <label>
                                        <Field
                                            type="checkbox"
                                            name="haveYouAttendedShellhacksBefore"
                                            value="ShellHacks 2018"
                                        />
                                        ShellHacks 2018
                                    </label>
                                    <label>
                                        <Field
                                            type="checkbox"
                                            name="haveYouAttendedShellhacksBefore"
                                            value="ShellHacks 2019"
                                        />
                                        ShellHacks 2019
                                    </label>
                                    <label>
                                        <Field
                                            type="checkbox"
                                            name="haveYouAttendedShellhacksBefore"
                                            value="ShellHacks 2020"
                                        />
                                        ShellHacks 2020
                                    </label>
                                    <label>
                                        <Field
                                            type="checkbox"
                                            name="haveYouAttendedShellhacksBefore"
                                            value="ShellHacks 2021"
                                        />
                                        ShellHacks 2021
                                    </label>
                                    <label>
                                        <Field
                                            type="checkbox"
                                            name="haveYouAttendedShellhacksBefore"
                                            value="This is my first ShellHacks!"
                                        />
                                        This is my first ShellHacks!
                                    </label>
                                </div>
                            </div>

                            <div className={styles.fieldWrapper}>
                                <FieldLabel
                                    name=""
                                    emoji="eyes"
                                    title="How did you hear about ShellHacks?"
                                    description="We'd love to know!"
                                    id="checkbox-group-2"
                                    optional={true}
                                />
                                <div
                                    className="dividedCheckboxGroup"
                                    role="group"
                                    aria-labelledby="checkbox-group"
                                >
                                    <div className="checkboxGroup">
                                        <label>
                                            <Field
                                                type="checkbox"
                                                name="howDidYouHearAboutShellhacks"
                                                value="E-mail"
                                            />
                                            E-mail
                                        </label>
                                        <label>
                                            <Field
                                                type="checkbox"
                                                name="howDidYouHearAboutShellhacks"
                                                value="Discord"
                                            />
                                            Discord
                                        </label>
                                        <label>
                                            <Field
                                                type="checkbox"
                                                name="howDidYouHearAboutShellhacks"
                                                value="Instagram"
                                            />
                                            Instagram
                                        </label>
                                        <label>
                                            <Field
                                                type="checkbox"
                                                name="howDidYouHearAboutShellhacks"
                                                value="MLH"
                                            />
                                            MLH
                                        </label>
                                    </div>
                                    <div className="checkboxGroup">
                                        <label>
                                            <Field
                                                type="checkbox"
                                                name="howDidYouHearAboutShellhacks"
                                                value="Website"
                                            />
                                            Website
                                        </label>
                                        <label>
                                            <Field
                                                type="checkbox"
                                                name="howDidYouHearAboutShellhacks"
                                                value="Facebook"
                                            />
                                            Facebook
                                        </label>
                                        <label>
                                            <Field
                                                type="checkbox"
                                                name="howDidYouHearAboutShellhacks"
                                                value="Twitter"
                                            />
                                            Twitter
                                        </label>
                                        <label>
                                            <Field
                                                type="checkbox"
                                                name="howDidYouHearAboutShellhacks"
                                                value="LinkedIn"
                                            />
                                            LinkedIn
                                        </label>
                                    </div>
                                    <div className="checkboxGroup">
                                        <label>
                                            <Field
                                                type="checkbox"
                                                name="howDidYouHearAboutShellhacks"
                                                value="Reddit"
                                            />
                                            Reddit
                                        </label>
                                        <label>
                                            <Field
                                                type="checkbox"
                                                name="howDidYouHearAboutShellhacks"
                                                value="Whatsapp Group"
                                            />
                                            Whatsapp Group
                                        </label>
                                        <label>
                                            <Field
                                                type="checkbox"
                                                name="howDidYouHearAboutShellhacks"
                                                value="Friends"
                                            />
                                            Friends
                                        </label>
                                        <label>
                                            <Field
                                                type="checkbox"
                                                name="howDidYouHearAboutShellhacks"
                                                value="Professor"
                                            />
                                            Professor
                                        </label>
                                    </div>
                                    <div className="checkboxGroup">
                                        <label>
                                            <Field
                                                type="checkbox"
                                                name="howDidYouHearAboutShellhacks"
                                                value="Employer"
                                            />
                                            Employer
                                        </label>
                                        <label>
                                            <Field
                                                type="checkbox"
                                                name="howDidYouHearAboutShellhacks"
                                                value="Other"
                                            />
                                            Other
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.fieldWrapper}>
                                <FieldLabel
                                    name="whyAreYouInterestedInParticipatingInShellhacks"
                                    emoji="face-with-monocle"
                                    title="Why are you interested in participating in ShellHacks?"
                                    description="This is your chance to tell us more about you and why we should select you!"
                                />
                                <div
                                    className={`${styles.field} ${styles.inputDiv}`}
                                    id="whyAreYouInterestedInParticipatingInShellhacks"
                                    contentEditable="true"
                                    placeholder="I want to participate because..."
                                    onInput={(event) => {
                                        setFieldValue(
                                            "whyAreYouInterestedInParticipatingInShellhacks",
                                            event.currentTarget.innerText
                                        );
                                    }}
                                />
                                {errors.whyAreYouInterestedInParticipatingInShellhacks &&
                                touched.whyAreYouInterestedInParticipatingInShellhacks ? (
                                    <div className={styles.errors}>
                                        {
                                            errors.whyAreYouInterestedInParticipatingInShellhacks
                                        }
                                    </div>
                                ) : null}
                            </div>

                            <div className={styles.fieldWrapper}>
                                <FieldLabel
                                    name="file"
                                    emoji="memo"
                                    title="Resume"
                                    description="Your resume will be shared with our sponsors and partners for internship and job opportunities!"
                                />
                                <input
                                    id="file"
                                    name="file"
                                    type="file"
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        if (event.currentTarget.files) {
                                            setFieldValue(
                                                "file",
                                                event.currentTarget.files[0]
                                            );
                                            setFieldTouched("file", true);
                                        }
                                    }}
                                    accept=".pdf"
                                />
                                {errors.file ? (
                                    <div className={styles.errors}>
                                        {errors.file}
                                    </div>
                                ) : null}
                            </div>

                            <div className={styles.fieldWrapper}>
                                <FieldLabel
                                    name="linkedIn"
                                    emoji="briefcase"
                                    title="LinkedIn"
                                    description="Link to your LinkedIn profile"
                                    optional={true}
                                />
                                <Field
                                    className={styles.field}
                                    id="linkedIn"
                                    name="linkedIn"
                                    placeholder="Link"
                                />
                            </div>

                            <div className={styles.fieldWrapper}>
                                <FieldLabel
                                    name="github"
                                    emoji="laptop"
                                    title="Github"
                                    description="Link to your Github profile"
                                    optional={true}
                                />
                                <Field
                                    className={styles.field}
                                    id="github"
                                    name="github"
                                    placeholder="Link"
                                />
                            </div>

                            <div className={styles.fieldWrapper}>
                                <FieldLabel
                                    name="website"
                                    emoji="spider-web"
                                    title="Website"
                                    description="Link to your Website"
                                    optional={true}
                                />
                                <Field
                                    className={styles.field}
                                    id="website"
                                    name="website"
                                    placeholder="Link"
                                />
                            </div>

                            <div className={styles.fieldWrapper}>
                                <FieldLabel
                                    name=""
                                    emoji="globe-with-meridians"
                                    title="If accepted, will you be participating in-person or remotely this year?"
                                    description="Please let us know!"
                                />
                                <label>
                                    <Field
                                        type="radio"
                                        name="attendance"
                                        value="In-Person"
                                        className={styles.radioButton}
                                    />
                                    In-Person
                                </label>
                                <label>
                                    <Field
                                        type="radio"
                                        name="attendance"
                                        value="Remote"
                                        className={styles.radioButton}
                                    />
                                    Remote
                                </label>
                            </div>

                            <div className={styles.fieldWrapper}>
                                <FieldLabel
                                    name=""
                                    emoji="no-one-under-eighteen"
                                    title="I confirm that I am 18 years of age or older"
                                    description="All applicants must be 18 years of age or older in order to participate"
                                />
                                <Field
                                    type="checkbox"
                                    name="isAdult"
                                    value={isAdult}
                                    onClick={() => setIsAdult(!isAdult)}
                                    checked={isAdult}
                                />
                                {errors.isAdult && touched.isAdult ? (
                                    <div className={styles.errors}>
                                        {errors.isAdult}
                                    </div>
                                ) : null}
                            </div>

                            <div className={styles.fieldWrapper}>
                                <FieldLabel
                                    name=""
                                    emoji="thumbs-up"
                                    title="I agree for my information to be shared with sponsors"
                                    description="Sponsors will receive your contact information to reach out to you about internship and job opportunities"
                                />
                                <Field
                                    type="checkbox"
                                    name="isSharingInfo"
                                    value={isSharingInfo}
                                    onClick={() =>
                                        setIsSharingInfo(!isSharingInfo)
                                    }
                                    checked={isSharingInfo}
                                />
                                {errors.isSharingInfo &&
                                touched.isSharingInfo ? (
                                    <div className={styles.errors}>
                                        {errors.isSharingInfo}
                                    </div>
                                ) : null}
                            </div>

                            <div className={styles.fieldWrapper}>
                                <FieldLabel
                                    name=""
                                    emoji="wrapped-gift"
                                    title="Prize Disclaimer"
                                    description="I am aware that prizes received from participating in ShellHacks that are worth $600 or more will be subject to a gift tax, as per the IRS and Florida International University's gift policies. I am also aware that if I have won a prize from UPE or ShellHacks in the past and win another one this year with the total of both prizes being $600 or more, it will also be subject to a gift tax."
                                />
                                <Field
                                    type="checkbox"
                                    name="agreedPrize"
                                    value={agreedPrize}
                                    onClick={() => setAgreedPrize(!agreedPrize)}
                                    checked={agreedPrize}
                                />
                                {errors.agreedPrize && touched.agreedPrize ? (
                                    <div className={styles.errors}>
                                        {errors.agreedPrize}
                                    </div>
                                ) : null}
                            </div>

                            <div
                                className={`${styles.fieldWrapper} ${styles.column}`}
                            >
                                <FieldLabel
                                    name=""
                                    emoji="handshake"
                                    title="Major League Hacking Agreement"
                                    description="I have read and agreed to the MLH Code of Conduct"
                                />
                                <a
                                    className={styles.link}
                                    href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Code of Conduct
                                </a>
                                <Field
                                    type="checkbox"
                                    name="agreedMLH"
                                    value={agreedMLH}
                                    onClick={() => setAgreedMLH(!agreedMLH)}
                                    checked={agreedMLH}
                                />
                                {errors.agreedMLH && touched.agreedMLH ? (
                                    <div className={styles.errors}>
                                        {errors.agreedMLH}
                                    </div>
                                ) : null}
                            </div>

                            <div
                                className={`${styles.fieldWrapper} ${styles.column}`}
                            >
                                <FieldLabel
                                    name=""
                                    emoji="scroll"
                                    title="Major League Hacking Terms and Conditions"
                                    description="I authorize you to share my application/registration information with Major League Hacking for event administration, ranking, and MLH administration in-line with the MLH privacy policy. I further agree to the terms of both the MLH Contest Terms and Conditions and the MLH Privacy Policy. "
                                />
                                <a
                                    className={styles.link}
                                    href="https://mlh.io/privacy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Privacy Policy
                                </a>
                                <a
                                    className={styles.link}
                                    href="https://mlh.io/terms"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Terms and Conditions
                                </a>
                                <Field
                                    type="checkbox"
                                    name="agreedTerms"
                                    value={agreedTerms}
                                    onClick={() => setAgreedTerms(!agreedTerms)}
                                    checked={agreedTerms}
                                />
                                {errors.agreedTerms && touched.agreedTerms ? (
                                    <div className={styles.errors}>
                                        {errors.agreedTerms}
                                    </div>
                                ) : null}
                            </div>

                            <div className={styles.fieldWrapper}>
                                <FieldLabel
                                    name=""
                                    emoji="envelope"
                                    title="Communications from Major League Hacking"
                                    description="I authorize MLH to send me pre- and post-event informational emails, which contain free credit and opportunities from their partners"
                                />
                                <Field
                                    type="checkbox"
                                    name="agreedCommunications"
                                    value={agreedCommunications}
                                    onClick={() =>
                                        setAgreedCommunications(
                                            !agreedCommunications
                                        )
                                    }
                                    checked={agreedCommunications}
                                />
                                {errors.agreedCommunications &&
                                touched.agreedCommunications ? (
                                    <div className={styles.errors}>
                                        {errors.agreedCommunications}
                                    </div>
                                ) : null}
                            </div>

                            {!isValid && hasTriedSubmitting ? (
                                <div className={styles.errors}>
                                    Unable to submit. Check for missing
                                    information or errors.
                                </div>
                            ) : null}

                            <button
                                id="submitBtn"
                                className={styles.submitButton}
                                type="submit"
                                onClick={() => {
                                    setHasTriedSubmitting(true);
                                }}
                            >
                                <div className={styles.submitButtonBackground}>
                                    <div
                                        className={styles.submitButtonText}
                                        children={"Submit"}
                                    />
                                </div>
                            </button>
                        </EmojiProvider>
                    </Form>
                )}
            </Formik>
            <ProgressModal
                trigger={displayPopup}
                setTrigger={setDisplayPopup}
                state={popupState}
                failedMessage={errorMessage}
                completeMessage="Successfully submitted! Navigating to dashboard."
            />
        </section>
    );
};

export default HackerForm;
