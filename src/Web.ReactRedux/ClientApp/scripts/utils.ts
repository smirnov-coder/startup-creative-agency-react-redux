import * as $ from "jquery";
import { DomainUser, UserProfile } from "@store/entities";
import { Routes } from "./constants";

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

export const encodeHTML = (source: string): string => $("<div />").text(source).html();

export const decodeHTML = (source: string): string => $("<div />").html(source).text();

export function concretizeRoute(routeTemplate: Routes, routeParam: string | RegExp, routeValue: string | number): string {
    return routeTemplate.replace(routeParam, routeValue.toString()); 
}

export const formatString = (template: string, ...args: any[]): string => $.validator.format(template, args);
