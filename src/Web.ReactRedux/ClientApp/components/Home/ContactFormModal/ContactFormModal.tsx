﻿import * as React from "react";
import * as $ from "jquery";
import "./ContactFormModal.scss";

interface ContactFormModalProps {
    text: string;
    isError: boolean;
    showModal: boolean;
    onClose: () => void;
}

export class ContactFormModal extends React.Component<ContactFormModalProps> {
    constructor(props: ContactFormModalProps) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }

    componentWillReceiveProps(nextProps: ContactFormModalProps): void {
        nextProps.showModal
            ? $(this.modal.current).modal("show")
            : $(this.modal.current).modal("hide");
    }

    private modal = React.createRef<HTMLDivElement>();

    render(): JSX.Element {
        let { isError, text } = this.props;
        let icon = isError
            ? "contact-form-modal__status-icon--color-red fa fa-frown-o"
            : "contact-form-modal__status-icon--color-green fa fa-smile-o";
        let status = isError ? "Error" : "Success";
        return (
            <div ref={this.modal} className="modal fade" tabIndex={-1} id="contact-form-modal">
                <div className="contact-form-modal custom-modal">
                    <div className="modal-dialog custom-modal__inner">
                        <div className="modal-content custom-modal__content">
                            <div className="modal-header">
                                <button type="button" className="close" onClick={this.handleClose}>
                                    <span>&times;</span>
                                </button>
                                <i className={`contact-form-modal__status-icon ${icon}`}></i>
                                <span className="contact-form-modal__status-text">{status}</span>
                            </div>
                            <div className="modal-body">
                                <p className="contact-form-modal__message">{text}</p>
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