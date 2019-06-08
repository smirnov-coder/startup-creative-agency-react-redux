import * as React from "react";
import "@bootstrap/css";
import "./FileInput.scss";

interface FileInputProps {
    text?: string;
    buttonPosition: "left" | "right";
    className?: string;
    fileInputId: string;
    fileInputName: string;
    textInputId: string;
    textInputName: string;
}

interface FileInputState {
    fileName: string;
}

export class FileInput extends React.Component<FileInputProps, FileInputState> {
    constructor(props: FileInputProps) {
        super(props);
        this.state = {
            fileName: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    render(): JSX.Element {
        let {
            text = "Browse",
            buttonPosition,
            className = "",
            fileInputId = "",
            fileInputName = "",
            textInputId = "",
            textInputName = ""
        } = this.props;
        let textModifier = buttonPosition === "left" ? "custom-file-input__text--right" : "";
        let elements: JSX.Element[] = [
            <input key={0} type="text" className={`form-control custom-file-input__text ${textModifier}`} readOnly
                name={textInputName} id={textInputId} value={this.state.fileName} />,
            <span key={1} className="input-group-btn" style={{ verticalAlign: "top" }}>
                <label className="btn btn-default">
                    {text}
                    <input className={`custom-file-input__upload ${className}`} id={fileInputId} name={fileInputName} type="file"
                        onChange={this.handleChange} />
                </label>
            </span>
        ];
        elements = buttonPosition === "left" ? elements.reverse() : elements;
        return (
            <div className="custom-file-input input-group">
                {elements.map(element => element)}
            </div>
        );
    }

    handleChange(event: React.ChangeEvent): void {
        let file: File = (event.target as HTMLInputElement).files[0];
        this.setState({
            fileName: file ? file.name : ""
        });
    }
}