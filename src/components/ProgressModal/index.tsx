import styles from "./index.module.css";
import React from "react";
import X_Symbol from "../../../public/static/X_Symbol.svg";
import Error_Symbol from "../../../public/static/Error_Symbol.svg";
import Success_Symbol from "../../../public/static/Success_Symbol.svg";

export enum ProgressState {
    PROCESSING,
    COMPLETE,
    FAILED,
}

type ProgressIconProps = {
    state: ProgressState;
};

type ProgressModalProps = {
    trigger: boolean;
    setTrigger: Function;
    state: ProgressState;
    processingMessage?: string;
    completeMessage?: string;
    failedMessage?: string;
};

const ProgressIcon: React.FC<ProgressIconProps> = (
    props: ProgressIconProps
) => {
    switch (props.state) {
        case ProgressState.COMPLETE:
            return <Success_Symbol className={styles.progressModalIcon} />;
        case ProgressState.FAILED:
            return <Error_Symbol className={styles.progressModalIcon} />;
        default:
            return (
                <svg className={styles.progressModalLoader} viewBox="0 0 50 50">
                    <circle
                        className="circle"
                        cx="25"
                        cy="25"
                        r="20"
                        fill="none"
                        strokeWidth="5"
                    ></circle>
                </svg>
            );
    }
};

const ProgressModal: React.FC<ProgressModalProps> = (
    props: ProgressModalProps
) => {
    let message;
    switch (props.state) {
        case ProgressState.PROCESSING:
            if (props.processingMessage) message = props.processingMessage;
            else message = "Processing...";
            break;
        case ProgressState.COMPLETE:
            if (props.completeMessage) message = props.completeMessage;
            else message = "Completed!";
            break;
        case ProgressState.FAILED:
            if (props.failedMessage) message = props.failedMessage;
            else message = "Failed to complete. Try again.";
            break;
    }

    return props.trigger ? (
        <div className={styles.progressModalShadow}>
            <div className={styles.progressModalBackground}>
                <ProgressIcon state={props.state} />
                <p className={styles.progressModalState}>{message}</p>
                {props.state == ProgressState.COMPLETE ||
                props.state == ProgressState.FAILED ? (
                    <button
                        className={styles.progressModalButton}
                        onClick={() => {
                            props.setTrigger(false);
                        }}
                    >
                        <X_Symbol />
                    </button>
                ) : null}
            </div>
        </div>
    ) : null;
};

export default ProgressModal;
