import { Session } from "next-auth";
import { postRegenerateToken } from "./generalService";

export default function CheckTokenExpiry(session: Session) {
    const currentDate = new Date;
    const compareDate = new Date(session.user.accessTokenExpiry);

    if (currentDate > compareDate) {
        const refreshedToken = postRegenerateToken(session.user.refreshToken)

        refreshedToken.then((res) => {
            session.user.accessToken = res.accessToken
            session.user.accessTokenExpiry = res.accessTokenExpiry
            session.user.refreshToken = res.refreshToken
            session.user.refreshTokenExpiry = res.refreshTokenExpiry
            return true
        })
    }

    return false
}