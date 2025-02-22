

export class ErrorHandler {
    /**
     * Handles API errors and throws a custom error with a user-friendly message.
     * @param error The caught error (usually from an API request).
     * @param customTitle A custom title to be shown in the error toast.
     */
    static handleAPIError(error: any, customTitle: string = 'Error Occurred'): never {
        // Extract the error message from the server response or use a generic fallback
        const errorMessage = error.response?.data?.message || error.message || 'Unknown error';

        // Throw a new error with a custom message
        throw new Error(JSON.stringify({ title: customTitle, description: errorMessage }));
    }
}