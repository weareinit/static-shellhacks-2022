import "./index.css";
import React from "react";
import X_Symbol from "../../svg/X_Symbol.svg";
import Error_Symbol from "../../svg/Error_Symbol.svg";
import Success_Symbol from "../../svg/Success_Symbol.svg";

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
            return (
                <img
                    className="progressModalIcon"
                    src={Success_Symbol}
                    alt="Success Symbol"
                />
            );
        case ProgressState.FAILED:
            return (
                <img
                    className="progressModalIcon"
                    src={Error_Symbol}
                    alt="Error Symbol"
                />
            );
        default:
            return (
                <svg
                    className="progressModalIcon progressModalLoader"
                    viewBox="0 0 50 50"
                >
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
        <div className="progressModalShadow">
            <div className="progressModalBackground">
                <ProgressIcon state={props.state} />
                <p className="progressModalState">{message}</p>
                {props.state == ProgressState.COMPLETE ||
                props.state == ProgressState.FAILED ? (
                    <button
                        className="progressModalButton"
                        onClick={() => {
                            props.setTrigger(false);
                        }}
                    >
                        <img src={X_Symbol} alt="X Symbol" />
                    </button>
                ) : null}
            </div>
        </div>
    ) : null;
};

export default ProgressModal;
