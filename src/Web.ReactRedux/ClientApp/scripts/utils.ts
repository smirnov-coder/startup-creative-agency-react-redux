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
                : "";
        return `@${user.Identity.UserName}${fullName ? ` (${fullName})` : ""}`;
    } else {
        return "--NotSet--";
    }
}

export function getUserFullName(user: DomainUser): string {
    if (!user) {
        return null;
    }
    let profile: UserProfile = user.Profile;
    let fullName: string = profile.FirstName && profile.LastName
        ? `${profile.FirstName} ${profile.LastName}`
        : profile.FirstName
            ? profile.FirstName
            : "--NotSet--";
    return fullName;
}

export const encodeHTML = (source: string): string => $("<div />").text(source).html();

export const decodeHTML = (source: string): string => $("<div />").html(source).text();

export function concretizeRoute(routeTemplate: Routes, routeParam: string | RegExp, routeValue: string | number): string {
    return routeTemplate.replace(routeParam, routeValue.toString()); 
}

export const formatString = (template: string, ...args: any[]): string => $.validator.format(template, args);

export function imageValidationOptions(fileInputId: string, pathInputId: string): JQueryValidation.ValidationOptions {
    const METHOD_NAME = "atLeastOneOfTwo";
    if (!$.validator.methods[METHOD_NAME]) {
        $.validator.addMethod(METHOD_NAME, function (value: string, element: HTMLElement, params: string) {
            let result: boolean = this.optional(element) == true || !!value || !!$(`#${params}`).val();
            return result;
        }, "No value was provided.");
    }
    let result: JQueryValidation.ValidationOptions = {
        rules: {
            [fileInputId]: {
                [METHOD_NAME]: pathInputId,
                extension: "jpe?g|png|gif"
            }
        },
        messages: {
            [fileInputId]: {
                [METHOD_NAME]: "Image must be provided.",
                extension: "Only '.jpeg', '.jpg', '.png', '.gif' files are acceptable."
            }
        },
    }
    return result;
}