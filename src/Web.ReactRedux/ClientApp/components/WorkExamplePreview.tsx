import * as React from "react";
import { IWorkExample } from "../store/entities";
import { Button, ButtonModifiers } from "./Button";
import "./WorkExamplePreview.scss";

interface IWorkExamplePreviewProps {
    workExample: IWorkExample;
    onView: (id: number) => void;
}

export class WorkExamplePreview extends React.Component<IWorkExamplePreviewProps> {
    constructor(props: IWorkExamplePreviewProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(): void {
        if ($) {
            $(this.hoverArea.current).hover(function () {
                $(this).find(".work-example-preview__overlay").slideToggle();
            });
        }
    }

    private hoverArea = React.createRef<HTMLDivElement>();

    render(): JSX.Element {
        let { Category, ImagePath, Name } = this.props.workExample;
        let { Size, Color, Border } = ButtonModifiers;
        return (
            <article className="work-example-preview">
                <div ref={this.hoverArea} className="work-example-preview__inner">
                    <img src={ImagePath} alt={Name} className="work-example-preview__img" />
                    <div className="work-example-preview__overlay">
                        <div className="work-example-preview__overlay-inner">
                            <h4 className="work-example-preview__title">{Name}</h4>
                            <h5 className="work-example-preview__subtitle">{Category}</h5>
                            <Button modifiers={[Size.SMALL, Color.WHITE, Border.THICK]}
                                className="work-example-preview__button" onClick={this.handleClick}>
                                View&nbsp;&nbsp;<i className="fa fa-angle-right work-example-preview__button-icon"></i>
                            </Button>
                        </div>
                    </div>
                </div>
            </article>
        );
    }

    handleClick(event: React.MouseEvent): void {
        event.preventDefault();
        this.props.onView(this.props.workExample.Id);
    }
}