import * as $ from "jquery";

export default function (to: string, container: string) {
    // Убедиться, что ссылка имеет хэш (значение атрибута href).
    if (to !== "") {
        // Плавно прокрутить страницу до нужного места в течение 800мс.
        $(container).animate({
            scrollTop: $(to).offset().top
        }, 800, () => {
            // Добавить хэш в адресную строку (поведение ссылки по умолчанию).
            window.location.hash = to;
        });
    };
};