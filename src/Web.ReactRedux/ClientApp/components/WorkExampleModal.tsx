import * as React from "react";
import { IWorkExample } from "../store/entities";
import { ButtonModifiers, Button } from "./Button";
import "../assets/lib/bootstrap-customized/css/bootstrap.css";
import "../assets/lib/bootstrap-customized/js/bootstrap";
import "./WorkExampleModal.scss";

interface IWorkExampleModalProps {
    workExample: IWorkExample;
    showModal: boolean;
    onClose: () => void;
}

export class WorkExampleModal extends React.Component<IWorkExampleModalProps> {
    constructor(props: IWorkExampleModalProps) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }

    componentWillReceiveProps(nextProps: IWorkExampleModalProps): void {
        if (!$) {
            throw new Error("jQuery '$' is required.");
        }
        if (nextProps.showModal) {
            $(this.modal.current).modal("show");
        }
    }

    private modal = React.createRef<HTMLDivElement>();

    render(): JSX.Element {
        let { workExample } = this.props;
        return (
            <div ref={this.modal} className="modal fade" tabIndex={-1} id="work-example-modal">
                <div className="work-example custom-modal">
                    <div className="modal-dialog modal-lg custom-modal__inner">
                        <div className="container">
                            <div className="modal-content custom-modal__content">
                                <div className="modal-header">
                                    <button type="button" className="close" onClick={this.handleClose}>
                                        <span>&times;</span>
                                    </button>
                                    <div className="work-example__title">{workExample.Name}</div>
                                    <div className="work-example__subtitle">{workExample.Category}</div>
                                </div>
                                <div className="modal-body clearfix">
                                    <img src={workExample.ImagePath} alt={workExample.Name}
                                        className="work-example__img img-responsive center-block" />
                                    <div className="work-example__description">{workExample.Description}</div>
                                </div>
                                <div className="modal-footer custom-modal__footer">
                                    <Button modifiers={[ButtonModifiers.Size.SMALL]}
                                        className="custom-modal__close"
                                        children="Close"
                                        onClick={this.handleClose} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleClose(): void {
        $(this.modal.current).modal("hide");
        this.props.onClose();
    }
}

