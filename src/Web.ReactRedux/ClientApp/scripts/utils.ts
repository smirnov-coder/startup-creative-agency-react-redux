import * as $ from "jquery";
import { DomainUser, UserProfile } from "@store/entities";

export function getDateTimeString(date: Date): string {
    let obj: Date = new Date(date);
    return `${obj.toLocaleDateString()} ${obj.toLocaleTimeString()}`;
}

export function getUserInfoString(user: DomainUser): string {
    if (user) {
        let profile: UserProfile = user.Profile;
        let fullName: string = profile.FirstName && profile.LastName
            ? `${profile.FirstName} ${profile.LastName}`
            : profile.FirstName
                ? profile.FirstName
                : null;
        return `@${user.Identity.UserName}${fullName ? ` (${fullName})` : ""}`;
    } else {
        return "--NotSet--";
    }
}

export function encodeHTML(source: string): string {
    if (!$) {
        throw new Error("jQuery '$' is required.");
    }
    return $("<div />").text(source).html();
}