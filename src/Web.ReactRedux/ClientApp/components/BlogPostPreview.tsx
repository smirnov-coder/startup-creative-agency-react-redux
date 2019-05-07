import * as React from "react";
import { IBlogPost, IDomainUser } from "../store/entities";
import { Button, ButtonModifiers } from "./Button";
import "../assets/lib/bootstrap-customized/css/bootstrap.css";
import "./BlogPostPreview.scss";
import smoothScroll from "../scripts/smoothScroll";

interface IBlogPostPreviewProps {
    blogPost: IBlogPost;
    onView: (id: number) => void;
}

export class BlogPostPreview extends React.Component<IBlogPostPreviewProps> {
    constructor(props: IBlogPostPreviewProps) {
        super(props);
        this.handleView = this.handleView.bind(this);
    }

    render(): JSX.Element {
        let { blogPost } = this.props;
        let authorNameClassList: string[] = [
            "blog-post-preview-header__author-name",
            "custom-link",
            "custom-link--color-secondary"
        ];
        let authorGroupClassList: string[] = [
            "blog-post-preview-header__author-group",
            "custom-link",
            "custom-link--color-secondary"
        ];
        return (
            <article className="blog-post-preview">
                <div className="blog-post-preview__img-holder col-md-5">
                    <img src={blogPost.ImagePath} className="blog-post-preview__img" alt={blogPost.Title} />
                </div>
                <div className="blog-post-preview__content col-md-7">
                    <header className="blog-post-preview-header">
                        <div className="blog-post-preview-header__date">
                            <p className="blog-post-preview-header__day">
                                {new Date(blogPost.CreatedOn).getDate()}
                            </p>
                            <p className="blog-post-preview-header__month">
                                {this.getMonthShortName(blogPost.CreatedOn)}
                            </p>
                        </div>
                        <div className="blog-post-preview-header__meta">
                            <h4 className="blog-post-preview-header__title custom-link"
                                onClick={this.handleView}>{blogPost.Title}</h4>
                            <div className="blog-post-preview-header__author">
                                By&nbsp;
                                <span className={authorNameClassList.join(" ")} onClick={this.scrollToTeam}>
                                    {this.getFullName(blogPost.CreatedBy)}
                                </span>
                                &nbsp;in&nbsp;
                                <span className={authorGroupClassList.join(" ")} onClick={this.scrollToGallery}>
                                    {blogPost.Category}
                                </span>
                            </div>
                        </div>
                    </header>
                    <div className="blog-post-preview__text" dangerouslySetInnerHTML={{ __html: blogPost.Content }}></div>
                    <Button modifiers={[ButtonModifiers.Style.LINK, "custom-link--color-secondary"]}
                        className="blog-post-preview__button" onClick={this.handleView}>
                        Read More
                    </Button>
                </div>
            </article>
        );
    }

    scrollToTeam(event: React.MouseEvent): void {
        // 1. Узнать имя автора блог-поста.
        let authorName = $(event.target as HTMLSpanElement).text().trim();

        // 2. Плавно прокрутить страницу к секции 'about'.
        smoothScroll("#about", "html, body");

        // 3. Определить индекс слайда с нужным автором.
        // Ищем в мусоре, который наплодил OwlCarousel, 'настоящие' элементы team-member.
        // Это те элементы, которые не имеют класса 'cloned'.
        let $team = $(".owl-item:not('.cloned') .team-member");
        // Среди 'настоящих' мемберов, ищем нужного человека по имени.
        let selector = `.team-member__name:contains('${authorName}')`;
        let $teamMember = $team.find(selector).parents(".team-member");
        // Определяем индекс элемента с нужным мембером.
        // Если нужного мембера нет, то просто скролим страницу к секции 'About'.
        let index = $team.index($teamMember);

        // 5. Прокрутить карусель к нужной позиции.
        $(".team-carousel").trigger("to.owl.carousel", [index, 800]);
    }

    scrollToGallery(event: React.MouseEvent): void {
        // 1. Получить название группы элементов.
        let group = $(event.target as HTMLSpanElement).text().trim();

        // 2. Плавно прокрутить страницу к секции 'works'.
        smoothScroll("#works", "html, body");

        // 3. Отфильтровать галерею.
        let filter = `[data-filter='${group.toLowerCase()}']`;
        // Добавим небольшую задержку для плавности показа.
        // Плавная прокрутка до нужной секции длится 800мс.
        setTimeout(function () {
            $(".gallery-filter__item").filter(filter).click();
        }, 900);
    }

    handleView(event: React.MouseEvent): void {
        event.preventDefault();
        this.props.onView(this.props.blogPost.Id);
    }

    getMonthShortName(date: Date): string {
        return new Date(date).toLocaleDateString("en-US", { month: "short" }).toLowerCase();
    }

    getFullName(user: IDomainUser): string {
        return `${user.Profile.FirstName} ${user.Profile.LastName}`
    }
}