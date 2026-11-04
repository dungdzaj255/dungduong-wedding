const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

export async function submitWeddingForm(data) {
    if (!SCRIPT_URL) {
        throw new Error('Missing Google Apps Script URL');
    }

    const body = new URLSearchParams(data);

    await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body
    });
}