import googleOauth, { GoogleAccountInfo } from "../api/google-oauth";

export default async function getGoogleAccountInfo(
    token: string
): Promise<GoogleAccountInfo> {
    const res = await googleOauth.get("/userinfo", {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (res.data.error) {
        throw new Error(res.data.error);
    }

    return res.data;
}
