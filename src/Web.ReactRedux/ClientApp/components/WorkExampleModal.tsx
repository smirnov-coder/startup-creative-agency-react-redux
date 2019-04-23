import * as React from "react";
import { IWorkExample } from "../store/entities";
import { ModalCloseButton } from "./ModalCloseButton";
import { ButtonModifiers } from "./Button";
import "../assets/lib/bootstrap-customized/css/bootstrap.css";
import "../assets/lib/bootstrap-customized/js/bootstrap";
import "./WorkExampleModal.scss";

interface IWorkExampleModalProps {
    workExample: IWorkExample;
    title: string;
    subtitle: string;
    showModal: boolean;
    onClose: () => void;
}

export class WorkExampleModal extends React.Component<IWorkExampleModalProps> {
    constructor(props: IWorkExampleModalProps) {
        super(props);
    }

    componentDidMount(): void {
        if ($) {
            if (this.props.showModal) {
                let $modal = $(this.modal.current);
                $modal.modal("show");
                $(this.modal.current).on("hidden.bs.modal", this.props.onClose());
            }
        }
    }

    private modal = React.createRef<HTMLDivElement>();

    render(): JSX.Element {
        let { title, subtitle, workExample } = this.props;
        return (
            <div ref={this.modal} className="modal fade" tabIndex={-1} id="work-example-modal">
                <div className="work-example custom-modal">
                    <div className="modal-dialog modal-lg custom-modal__inner">
                        <div className="container">
                            <div className="modal-content custom-modal__content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">
                                        <span>&times;</span>
                                    </button>
                                    <div className="work-example__title">{title}</div>
                                    <div className="work-example__subtitle">{subtitle}</div>
                                </div>
                                <div className="modal-body clearfix">
                                    <img src={workExample.ImagePath} alt={workExample.Name}
                                        className="work-example__img img-responsive center-block" />
                                    <div className="work-example__description">{workExample.Description}</div>
                                </div>
                                <div className="modal-footer custom-modal__footer">
                                    <ModalCloseButton modifiers={[ButtonModifiers.Size.SMALL]}
                                        className="custom-modal__close">
                                        Close
                                    </ModalCloseButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

