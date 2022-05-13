import { Emoji } from "react-apple-emojis";

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
        <div className="fieldLabel">
            <label
                className="fieldLabelTitle"
                htmlFor={props.name}
                id={props.id}
            >
                <Emoji className="fieldLabelEmoji" name={props.emoji} />
                {props.title}
            </label>
            <p className="fieldLabelDesc">{props.description}</p>
        </div>
    );
};

export default FieldLabel;
