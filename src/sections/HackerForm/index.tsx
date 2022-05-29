import { Formik, Form, Field, FormikHelpers } from "formik";
import { Emoji, EmojiProvider } from "react-apple-emojis";
import emojiData from "react-apple-emojis/lib/data.json";
import * as Yup from "yup";
import LinkButton from "../../components/LinkButton";
import "./index.css";
import addHacker from "../../server/functions/addHacker";
import { HackerValues } from "../../../util/types";
import React from "react";
import { auth } from "../../server/firebaseApp";
import { onAuthStateChanged } from "firebase/auth";
import ProgressModal from "../../components/ProgressModal";
import { ProgressState } from "../../components/ProgressModal";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { formatError } from "../../util/errors";

const SELECT_PLACEHOLDER = "-- SELECT AN OPTION --";
const REQUIRED_FIELD_ERROR = "This field is required.";

type LabelProps = {
    name: string;
    emoji: string;
    title: string;
    description?: string;
    id?: string;
};

const FieldLabel: React.FC<LabelProps> = (props: LabelProps) => {
    return (
        <div className="fieldLabel">
            <label
                className="fieldLabelTitle"
                htmlFor={props.name}
                id={props.id}
            >
                <Emoji className="applicationEmoji" name={props.emoji} />
                {props.title}
            </label>
            <p className="fieldLabelDesc">{props.description}</p>
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
            .matches(/^[0-9]+$/, "Must be only digits")
            .min(5, "Must be exactly 5 digits")
            .max(5, "Must be exactly 5 digits"),
        phoneNumber: Yup.string()
            .required(REQUIRED_FIELD_ERROR)
            .matches(/^[0-9]+$/, "Must be only digits")
            .min(10, "Must be exactly 10 digits")
            .max(10, "Must be exactly 10 digits"),
        school: Yup.string().required(REQUIRED_FIELD_ERROR),
        major: Yup.string().required(REQUIRED_FIELD_ERROR),
        gender: Yup.string().required(REQUIRED_FIELD_ERROR),
        ethnicity: Yup.string().required(REQUIRED_FIELD_ERROR),
        race: Yup.array().required(REQUIRED_FIELD_ERROR),
        whyAreYouInterestedInParticipatingInShellhacks:
            Yup.string().required(REQUIRED_FIELD_ERROR),
        file: Yup.mixed().required(REQUIRED_FIELD_ERROR),
        isAdult: Yup.boolean().oneOf([true], REQUIRED_FIELD_ERROR),
        isSharingInfo: Yup.boolean().oneOf([true], REQUIRED_FIELD_ERROR),
        agreedMLH: Yup.boolean().oneOf([true], REQUIRED_FIELD_ERROR),
        agreedTerms: Yup.boolean().oneOf([true], REQUIRED_FIELD_ERROR),
        agreedCommunications: Yup.boolean().oneOf([true], REQUIRED_FIELD_ERROR),
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
        isRemote: isRemote,
        isAdult: isAdult,
        isSharingInfo: isSharingInfo,
        agreedMLH: agreedMLH,
        agreedTerms: agreedTerms,
        agreedCommunications: agreedCommunications,
    };

    const [user, setUser] = React.useState<any>({});
    onAuthStateChanged(auth, (currentUser: any) => {
        setUser(currentUser);
    });
    const [displayPopup, setDisplayPopup] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [popupState, setPopupState] = React.useState(
        ProgressState.PROCESSING
    );
    const navigate = useNavigate();

    return (
        <section className="contentBackground">
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
                                navigate("/dashboard");
                            }, 5000);
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
                }) => (
                    <Form id="form">
                        <EmojiProvider data={emojiData}>
                            <div className="fieldWrapper">
                                <FieldLabel
                                    name="firstName"
                                    emoji="smiling-face-with-sunglasses"
                                    title="First Name"
                                    description="Let's get to know you a bit!"
                                />
                                <Field
                                    className="field"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="John"
                                />
                                {errors.firstName && touched.firstName ? (
                                    <div className="errors">
                                        {errors.firstName}
                                    </div>
                                ) : null}
                            </div>

                            <div className="fieldWrapper">
                                <FieldLabel
                                    name="lastName"
                                    emoji="thinking-face"
                                    title="Last Name"
                                    description="Tell us a bit more"
                                />
                                <Field
                                    className="field"
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Doe"
                                />
                                {errors.lastName && touched.lastName ? (
                                    <div className="errors">
                                        {errors.lastName}
                                    </div>
                                ) : null}
                            </div>

                            {/* <div className="fieldWrapper">
                                <FieldLabel
                                    name="email"
                                    emoji="love-letter"
                                    title="E-mail"
                                    description="We won't spam, promise!"
                                />
                                <Field
                                    className="field"
                                    id="email"
                                    name="email"
                                    placeholder="Shell@hacks.com"
                                    type="email"
                                />
                                {errors.email && touched.email ? (
                                    <div className="errors">{errors.email}</div>
                                ) : null}
                            </div> */}

                            <div className="fieldWrapper">
                                <FieldLabel
                                    name="country"
                                    emoji="globe-showing-americas"
                                    title="Country"
                                    description="Where in the world are you located?"
                                />
                                <Field
                                    className="field select"
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
                                    <div className="errors">
                                        {errors.country}
                                    </div>
                                ) : null}
                            </div>

                            <div className="fieldWrapper">
                                <FieldLabel
                                    name="addressLine1"
                                    emoji="house"
                                    title="Address - Line 1"
                                    description="Street address for swag"
                                />
                                <Field
                                    className="field"
                                    id="addressLine1"
                                    name="addressLine1"
                                    placeholder="123 lane street"
                                />
                                {errors.addressLine1 && touched.addressLine1 ? (
                                    <div className="errors">
                                        {errors.addressLine1}
                                    </div>
                                ) : null}
                            </div>

                            <div className="fieldWrapper">
                                <FieldLabel
                                    name="addressLine2"
                                    emoji="house"
                                    title="Address - Line 2"
                                    description="Other address designation"
                                />
                                <Field
                                    className="field"
                                    id="addressLine2"
                                    name="addressLine2"
                                    placeholder="Apt number"
                                />
                            </div>

                            <div className="fieldWrapper">
                                <FieldLabel
                                    name="city"
                                    emoji="automobile"
                                    title="City"
                                    description=""
                                />
                                <Field
                                    className="field"
                                    id="city"
                                    name="city"
                                    placeholder="Miami"
                                />
                                {errors.city && touched.city ? (
                                    <div className="errors">{errors.city}</div>
                                ) : null}
                            </div>

                            <div className="fieldWrapper">
                                <FieldLabel
                                    name="state"
                                    emoji="round-pushpin"
                                    title="State"
                                    description=""
                                />
                                <Field
                                    className="field"
                                    id="state"
                                    name="state"
                                    placeholder="FL"
                                />
                                {errors.state && touched.state ? (
                                    <div className="errors">{errors.state}</div>
                                ) : null}
                            </div>

                            <div className="fieldWrapper">
                                <FieldLabel
                                    name="zipcode"
                                    emoji="zipper-mouth-face"
                                    title="ZIP Code"
                                    description=""
                                />
                                <Field
                                    className="field"
                                    id="zipcode"
                                    name="zipcode"
                                    placeholder="12345"
                                />
                                {errors.zipcode && touched.zipcode ? (
                                    <div className="errors">
                                        {errors.zipcode}
                                    </div>
                                ) : null}
                            </div>

                            <div className="fieldWrapper">
                                <FieldLabel
                                    name="phoneNumber"
                                    emoji="telephone-receiver"
                                    title="Phone Number"
                                    description="We are unlikely to contact you via call. This will be used for shipping if necessary."
                                />
                                <Field
                                    className="field"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    placeholder="3051119999"
                                />
                                {errors.phoneNumber && touched.phoneNumber ? (
                                    <div className="errors">
                                        {errors.phoneNumber}
                                    </div>
                                ) : null}
                            </div>

                            <div className="fieldWrapper">
                                <FieldLabel
                                    name="school"
                                    emoji="school"
                                    title="School"
                                    description="Which school do you currently attend?"
                                />
                                <Field
                                    className="field"
                                    id="school"
                                    name="school"
                                    placeholder="University name"
                                />
                                {errors.school && touched.school ? (
                                    <div className="errors">
                                        {errors.school}
                                    </div>
                                ) : null}
                            </div>

                            <div className="fieldWrapper">
                                <FieldLabel
                                    name="major"
                                    emoji="books"
                                    title="Major"
                                    description="What are you currently studying?"
                                />
                                <Field
                                    className="field"
                                    id="major"
                                    name="major"
                                    placeholder="Computer Science"
                                />
                                {errors.major && touched.major ? (
                                    <div className="errors">{errors.major}</div>
                                ) : null}
                            </div>

                            <div className="fieldWrapper">
                                <FieldLabel
                                    name="classStanding"
                                    emoji="red-apple"
                                    title="Class Standing"
                                    description="Where are you in your college career?"
                                />
                                <Field
                                    className="field select"
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
                                </Field>
                                {errors.classStanding &&
                                touched.classStanding ? (
                                    <div className="errors">
                                        {errors.classStanding}
                                    </div>
                                ) : null}
                            </div>

                            <div className="fieldWrapper">
                                <FieldLabel
                                    name="graduationYear"
                                    emoji="graduation-cap"
                                    title="Graduation Year"
                                    description="When are you finishing your degree?"
                                />
                                <Field
                                    className="field select"
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
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                </Field>
                                {errors.graduationYear &&
                                touched.graduationYear ? (
                                    <div className="errors">
                                        {errors.graduationYear}
                                    </div>
                                ) : null}
                            </div>

                            <div className="fieldWrapper">
                                <FieldLabel
                                    name="gender"
                                    emoji="dolphin"
                                    title="Gender"
                                    description="For demographic purposes only"
                                />
                                <Field
                                    className="field"
                                    id="gender"
                                    name="gender"
                                    placeholder="Gender"
                                />
                                {errors.gender && touched.gender ? (
                                    <div className="errors">
                                        {errors.gender}
                                    </div>
                                ) : null}
                            </div>

                            <div className="fieldWrapper">
                                <FieldLabel
                                    name="ethnicity"
                                    emoji="penguin"
                                    title="Ethnicity"
                                    description="For demographic purposes only"
                                />
                                <Field
                                    className="field select"
                                    as="select"
                                    name="ethnicity"
                                    id="ethnicity"
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
                                    <option value="Hispanic or Latinx">
                                        Hispanic or Latinx
                                    </option>
                                    <option value="Not Hispanic or Latinx">
                                        Not Hispanic or Latinx
                                    </option>
                                    <option value="Prefer not to answer">
                                        Prefer not to answer
                                    </option>
                                </Field>
                                {errors.ethnicity && touched.ethnicity ? (
                                    <div className="errors">
                                        {errors.ethnicity}
                                    </div>
                                ) : null}
                            </div>

                            <div className="fieldWrapper">
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
                                            type="checkbox"
                                            name="race"
                                            value="American Indian or Alaska Native"
                                        />
                                        American Indian or Alaska Native
                                    </label>
                                    <label>
                                        <Field
                                            type="checkbox"
                                            name="race"
                                            value="Asian"
                                        />
                                        Asian
                                    </label>
                                    <label>
                                        <Field
                                            type="checkbox"
                                            name="race"
                                            value="Black or African American"
                                        />
                                        Black or African American
                                    </label>
                                    <label>
                                        <Field
                                            type="checkbox"
                                            name="race"
                                            value="Native Hawaiian Or Other Pacific Islander"
                                        />
                                        Native Hawaiian Or Other Pacific
                                        Islander
                                    </label>
                                    <label>
                                        <Field
                                            type="checkbox"
                                            name="race"
                                            value="White"
                                        />
                                        White
                                    </label>
                                    <label>
                                        <Field
                                            type="checkbox"
                                            name="race"
                                            value="Prefer not to answer"
                                        />
                                        Prefer not to answer
                                    </label>
                                </div>
                                {errors.race ? (
                                    <div className="errors">{errors.race}</div>
                                ) : null}
                            </div>

                            <div className="fieldWrapper">
                                <FieldLabel
                                    name="tshirtSize"
                                    emoji="t-shirt"
                                    title="T-Shirt Size"
                                    description=""
                                />
                                <Field
                                    className="field select"
                                    as="select"
                                    name="tshirtSize"
                                    id="tshirtSize"
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
                                    <option value="XS">Extra-Small</option>
                                    <option value="S">Small</option>
                                    <option value="M">Medium</option>
                                    <option value="L">Large</option>
                                    <option value="XL">Extra-Large</option>
                                </Field>
                                {errors.tshirtSize && touched.tshirtSize ? (
                                    <div className="errors">
                                        {errors.tshirtSize}
                                    </div>
                                ) : null}
                            </div>

                            <div className="fieldWrapper">
                                <FieldLabel
                                    name="whichRoleBestDescribesYou"
                                    emoji="disguised-face"
                                    title="Which role best describes you?"
                                    description=""
                                />
                                <Field
                                    className="field select"
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
                                    <option value="Entrepeneur">
                                        Entrepeneur
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
                                    <div className="errors">
                                        {errors.whichRoleBestDescribesYou}
                                    </div>
                                ) : null}
                            </div>

                            <div className="fieldWrapper">
                                <FieldLabel
                                    name=""
                                    emoji="sun"
                                    title="Have you attended a hackathon before?"
                                    description="If you haven't, that's totally okay!"
                                    id="radio-group-1"
                                />
                                <Field
                                    className="field select"
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
                                    <option value="No">No</option>
                                    <option value="Yes, 1-4 hackathons">
                                        Yes, 1-4 hackathons
                                    </option>
                                    <option value="Yes, 5+ hackathons">
                                        Yes, 5+ hackathons
                                    </option>
                                </Field>
                                {errors.haveYouAttendedAHackathonBefore &&
                                touched.haveYouAttendedAHackathonBefore ? (
                                    <div className="errors">
                                        {errors.haveYouAttendedAHackathonBefore}
                                    </div>
                                ) : null}
                            </div>

                            <div className="fieldWrapper">
                                <FieldLabel
                                    name=""
                                    emoji="palm-tree"
                                    title="Have you attended Shellhacks before?"
                                    description="How far back do we go?"
                                    id="checkbox-group-1"
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
                                            value="Shellhacks 2017"
                                        />
                                        Shellhacks 2017
                                    </label>
                                    <label>
                                        <Field
                                            type="checkbox"
                                            name="haveYouAttendedShellhacksBefore"
                                            value="Shellhacks 2018"
                                        />
                                        Shellhacks 2018
                                    </label>
                                    <label>
                                        <Field
                                            type="checkbox"
                                            name="haveYouAttendedShellhacksBefore"
                                            value="Shellhacks 2019"
                                        />
                                        Shellhacks 2019
                                    </label>
                                    <label>
                                        <Field
                                            type="checkbox"
                                            name="haveYouAttendedShellhacksBefore"
                                            value="Shellhacks 2020"
                                        />
                                        Shellhacks 2020
                                    </label>
                                    <label>
                                        <Field
                                            type="checkbox"
                                            name="haveYouAttendedShellhacksBefore"
                                            value="Shellhacks 2021"
                                        />
                                        Shellhacks 2021
                                    </label>
                                    <label>
                                        <Field
                                            type="checkbox"
                                            name="haveYouAttendedShellhacksBefore"
                                            value="This is my first Shellhacks!"
                                        />
                                        This is my first Shellhacks!
                                    </label>
                                </div>
                            </div>

                            <div className="fieldWrapper">
                                <FieldLabel
                                    name=""
                                    emoji="eyes"
                                    title="How did you hear about Shellhacks?"
                                    description="We'd love to know!"
                                    id="checkbox-group-2"
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

                            <div className="fieldWrapper">
                                <FieldLabel
                                    name="whyAreYouInterestedInParticipatingInShellhacks"
                                    emoji="face-with-monocle"
                                    title="Why are you interested in participating in Shellhacks?"
                                    description="This is your chance to tell us more about you and why we should select you!"
                                />
                                <div
                                    className="field inputDiv"
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
                                    <div className="errors">
                                        {
                                            errors.whyAreYouInterestedInParticipatingInShellhacks
                                        }
                                    </div>
                                ) : null}
                            </div>

                            <div className="fieldWrapper">
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
                                    <div className="errors">{errors.file}</div>
                                ) : null}
                            </div>

                            <div className="fieldWrapper">
                                <FieldLabel
                                    name="linkedIn"
                                    emoji="briefcase"
                                    title="LinkedIn (Optional)"
                                    description="Link to your LinkedIn profile"
                                />
                                <Field
                                    className="field"
                                    id="linkedIn"
                                    name="linkedIn"
                                    placeholder="link"
                                />
                            </div>

                            <div className="fieldWrapper">
                                <FieldLabel
                                    name="github"
                                    emoji="laptop"
                                    title="Github (Optional)"
                                    description="Link to your Github profile"
                                />
                                <Field
                                    className="field"
                                    id="github"
                                    name="github"
                                    placeholder="link"
                                />
                            </div>

                            <div className="fieldWrapper">
                                <FieldLabel
                                    name="website"
                                    emoji="spider-web"
                                    title="Website (Optional)"
                                    description="Link to your Website"
                                />
                                <Field
                                    className="field"
                                    id="website"
                                    name="website"
                                    placeholder="link"
                                />
                            </div>

                            <div className="fieldWrapper">
                                <FieldLabel
                                    name=""
                                    emoji="globe-with-meridians"
                                    title="Will you be participating remotely?"
                                    description="Please let us know!"
                                />
                                <Field
                                    type="checkbox"
                                    name="isRemote"
                                    value={isRemote}
                                    onClick={() => setIsRemote(!isRemote)}
                                    checked={isRemote}
                                />
                            </div>

                            <div className="fieldWrapper">
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
                                    <div className="errors">
                                        {errors.isAdult}
                                    </div>
                                ) : null}
                            </div>

                            <div className="fieldWrapper">
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
                                    <div className="errors">
                                        {errors.isSharingInfo}
                                    </div>
                                ) : null}
                            </div>

                            <div className="fieldWrapper">
                                <FieldLabel
                                    name=""
                                    emoji="handshake"
                                    title="MLH Agreement"
                                    description="I have read and agreed to the MLH Code of Conduct"
                                />
                                <Field
                                    type="checkbox"
                                    name="agreedMLH"
                                    value={agreedMLH}
                                    onClick={() => setAgreedMLH(!agreedMLH)}
                                    checked={agreedMLH}
                                />
                                {errors.agreedMLH && touched.agreedMLH ? (
                                    <div className="errors">
                                        {errors.agreedMLH}
                                    </div>
                                ) : null}
                            </div>

                            <div className="fieldWrapper">
                                <FieldLabel
                                    name=""
                                    emoji="scroll"
                                    title="MLH Terms and Conditions"
                                    description="I have read and agreed to the MLH Code of Conduct. I authorize you to share my application/registration information with Major League Hacking for event administration, ranking, and MLH administration in-line with the MLH privacy policy. I further agree to the terms of both the MLH Contest Terms and Conditions and the MLH Privacy Policy. "
                                />
                                <Field
                                    type="checkbox"
                                    name="agreedTerms"
                                    value={agreedTerms}
                                    onClick={() => setAgreedTerms(!agreedTerms)}
                                    checked={agreedTerms}
                                />
                                {errors.agreedTerms && touched.agreedTerms ? (
                                    <div className="errors">
                                        {errors.agreedTerms}
                                    </div>
                                ) : null}
                            </div>

                            <div className="fieldWrapper">
                                <FieldLabel
                                    name=""
                                    emoji="envelope"
                                    title="Communications from MLH"
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
                                    <div className="errors">
                                        {errors.agreedCommunications}
                                    </div>
                                ) : null}
                            </div>

                            <button id="submitBtn" type="submit">
                                <LinkButton
                                    text="Submit"
                                    url="/application"
                                    filled={true}
                                />
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
                completeMessage="Successfully submitted! Attempting to navigate to dashboard."
            />
        </section>
    );
};

export default HackerForm;
