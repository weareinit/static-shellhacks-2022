import { Emoji } from "react-apple-emojis";
import styles from "./index.module.css";

type LabelProps = {
    name: string;
    emoji: string;
    title: string;
    description?: string;
    id?: string;
};

// MUST USE WITHIN EMOJIPROVIDER FOR EMOJI TO APPEAR
const FieldLabel: React.FC<LabelProps> = (props: LabelProps) => {
    return (
        <div className={styles.fieldLabel}>
            <label
                className={styles.fieldLabelTitle}
                htmlFor={props.name}
                id={props.id}
            >
                <Emoji className={styles.fieldLabelEmoji} name={props.emoji} />
                {props.title}
            </label>
            <p className={styles.fieldLabelDesc}>{props.description}</p>
        </div>
    );
};

export default FieldLabel;
