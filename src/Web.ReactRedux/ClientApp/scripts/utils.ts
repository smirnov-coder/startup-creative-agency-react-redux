import * as $ from "jquery";
import { DomainUser, UserProfile } from "@store/entities";
import { Routes } from "@scripts/constants";

/**
 * Возвращает дату и время в виде строки формата 'дд.мм.гггг чч:мм:сс'.
 * @param date Объект даты.
 */
export function getDateTimeString(date: Date): string {
    let obj: Date = new Date(date);
    return `${obj.toLocaleDateString()} ${obj.toLocaleTimeString()}`;
}

/**
 * Возвращает краткую информацию о пользователе доменной модели. Если пользователь не задан, возвращается строка '--NotSet--'.
 * Если для пользователя не задана фамилия, возвращается строка '@идентификационное_имя (имя)'. Если не задано имя, возвращается
 * строка '@идентификационное_имя'. Иначе возвращается строка '@идентификационное_имя (имя, фамилия)'.
 * @param user Пользователь доменной модели.
 */
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

/**
 * Возвращает полное имя пользователя доменной модели в виде строки 'имя фамилия'. Если фамилия пользователя не задана, 
 * возвращается только имя. Если не заданы имя и фамилия, возвращается строка '--NotSet--'. Если пользователь не задан, 
 * возвращается null.
 * @param user Пользователь доменной модели.
 */
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

/**
 * Кодирует строку в строку в формате HTML.
 * @param source Строка текста для кодирования.
 */
export const encodeHTML = (source: string): string => $("<div />").text(source).html();

/**
 * Декодирует строку в формате HTML.
 * @param source Строка текста, кодированная в формате HTML.
 */
export const decodeHTML = (source: string): string => $("<div />").html(source).text();

/**
 * Формирует строку маршрута на основании шаблона маршрута.
 * @param routeTemplate Шаблон маршрута вида '/test-route/:param'.
 * @param routeParam Изменяемый параметр маршрута.
 * @param routeValue Значение параметра маршрута.
 */
export function concretizeRoute(routeTemplate: Routes, routeParam: string | RegExp, routeValue: string | number): string {
    return routeTemplate.replace(routeParam, routeValue.toString()); 
}

/**
 * Заменяет маркеры подстановки {n} в строке значениями аргументов.
 * @param template Строка с маркерами подстановки.
 * @param args Значения для замены маркеров подстановки в строке.
 */
export const formatString = (template: string, ...args: any[]): string => $.validator.format(template, args);

/**
 * Возвращает общие параметры валидации 'jquery-validation' для загрузки файла изображения с помощью компонента FileInput.
 * @param fileInputId Атрибут 'id' элемента 'input' компонента FileInput, используемого для загрузки файла.
 * @param pathInputId Атрибут 'id' элемента 'input' компонента FileInput, используемого для отображения имени загружаемого файла.
 */
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