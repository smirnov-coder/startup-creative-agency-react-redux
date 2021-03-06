﻿interface Globals {
    api: {
        initialState: string,
        homeModel: string,
        services: string,
        service: string,
        blog: string,
        blogPost: string,
        blogPartial: string,
        works: string,
        workExample: string,
        brands: string,
        brand: string,
        testimonials: string,
        testimonial: string,
        messages: string,
        message: string,
        contacts: string,
        users: string,
        user: string,
        self: string,
        registerUser: string,
        updateUserProfile: string,
        updateUserStatus: string,
        deleteUser: string,
        accessToken: string,
    };
}

/**
 * Глобальные константы.
 */
export const GLOBALS: Globals = {
    api: (window as any).customGlobals.uriTemplates,
}

/**
 * Маршруты SPA-страниц.
 */
export enum Routes {
    HOME = "/",
    AUTH_AREA = "/auth",
    NOT_FOUND = "/not-found",
    ACCESS_DENIED = "/auth/access-denied",
    LOGIN = "/auth/login",
    ADMIN_AREA = "/admin",
    MY_PROFILE = "/admin/my-profile",
    SERVICES = "/admin/services",
    ADD_SERVICE = "/admin/services/add",
    EDIT_SERVICE = "/admin/services/edit/:id",
    BLOG = "/admin/blog",
    ADD_BLOG_POST = "/admin/blog/add",
    EDIT_BLOG_POST = "/admin/blog/edit/:id",
    BRANDS = "/admin/brands",
    ADD_BRAND = "/admin/brands/add",
    EDIT_BRAND = "/admin/brands/edit/:id",
    WORKS = "/admin/works",
    ADD_WORK_EXAMPLE = "/admin/works/add",
    EDIT_WORK_EXAMPLE = "/admin/works/edit/:id",
    TESTIMONIALS = "/admin/testimonials",
    ADD_TESTIMONIAL = "/admin/testimonials/add",
    EDIT_TESTIMONIAL = "/admin/testimonials/edit/:id",
    CONTACTS = "/admin/contacts",
    MESSAGES = "/admin/messages",
    MESSAGE = "/admin/messages/:id",
    USERS = "/admin/users",
    MANAGE_USER = "/admin/users/manage/:userName",
    REGISTER_USER = "/admin/users/register"
}

/**
 * Значения ключа для хранения маркера доступа (access token) в хранилище браузера.
 */
export const TOKEN_STORAGE_KEY = "access_token";

/**
 * Общие настройки валидации 'jquery-validation'.
 */
export const VALIDATION_OPTIONS: JQueryValidation.ValidationOptions = {
    errorElement: "span",
    errorClass: "field-validation-error",
    highlight: (element, errorClass, validClass) => {
        $(element).addClass("input-validation-error");
    },
    unhighlight: (element, errorClass, validClass) => {
        $(element).removeClass("input-validation-error");
    },
    invalidHandler: (event, validator) => {
        console.warn("Invalid form data. Submission canceled.");
    }
};

/**
 * HTTP-методы.
 */
export enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}