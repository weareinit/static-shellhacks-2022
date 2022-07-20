import { FirebaseError } from "firebase/app";
import { AuthErrorCodes } from "firebase/auth";

export function formatError(error: FirebaseError) {
    switch (error.code) {
        case AuthErrorCodes.INVALID_PASSWORD:
            return "Invalid password. Try again.";
        case AuthErrorCodes.USER_DELETED:
            return "User not found. Try again.";
        case AuthErrorCodes.NETWORK_REQUEST_FAILED:
            return "Request failed due to timeout or interrupted connection. Try again.";
        case AuthErrorCodes.INVALID_EMAIL:
            return "Invalid email. Try again.";
        case AuthErrorCodes.EMAIL_EXISTS:
            return "Email already in use. Try again.";
        case AuthErrorCodes.WEAK_PASSWORD:
            return "Password should be at least 6 characters. Try again.";
        case AuthErrorCodes.INVALID_OOB_CODE:
            return "The action code is invalid. Try using the link from your email or submitting another forgot password request.";
        default:
            return error.message;
    }
}
