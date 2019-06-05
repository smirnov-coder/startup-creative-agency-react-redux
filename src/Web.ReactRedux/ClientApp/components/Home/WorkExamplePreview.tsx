import * as React from "react";
import { WorkExample } from "@store/entities";
import "./WorkExamplePreview.scss";
import Button, { ButtonModifiers } from "@components/Shared/Button";
import * as $ from "jquery";

interface WorkExamplePreviewProps {
    workExample: WorkExample;
    onView: (id: number) => void;
}

export class WorkExamplePreview extends React.Component<WorkExamplePreviewProps> {
    constructor(props: WorkExamplePreviewProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    private hoverArea = React.createRef<HTMLDivElement>();
    private overlay = React.createRef<HTMLDivElement>();

    componentDidMount(): void {
        $(this.hoverArea.current).hover(() => {
            $(this.overlay.current).slideToggle();
        });
    }

    render(): JSX.Element {
        let { Category, ImagePath, Name } = this.props.workExample;
        let buttonModifiers: string[] = [
            ButtonModifiers.Size.SMALL,
            ButtonModifiers.Color.WHITE,
            ButtonModifiers.Border.THICK
        ];
        return (
            <article className="work-example-preview">
                <div ref={this.hoverArea} className="work-example-preview__inner">
                    <img src={ImagePath} alt={Name} className="work-example-preview__img" />
                    <div ref={this.overlay} className="work-example-preview__overlay">
                        <div className="work-example-preview__overlay-inner">
                            <h4 className="work-example-preview__title">{Name}</h4>
                            <h5 className="work-example-preview__subtitle">{Category}</h5>
                            <Button modifiers={buttonModifiers} className="work-example-preview__button"
                                onClick={this.handleClick}>
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