import * as React from "react";
import { WorkExample } from "@store/entities";
import { Routes } from "@scripts/constants";
import LinkButton from "@components/Shared/LinkButton";
import { ButtonModifiers } from "@components/Shared/Button";
import WorkExampleItem from "@components/Admin/WorkExampleItem";
import { WorkExampleModal } from "@components/Home/WorkExampleModal";
import "./WorkExampleList.scss";

interface ComponentProps {
    items: WorkExample[];
}

type WorkExampleListProps = ComponentProps;

interface WorkExampleListState {
    showModal: boolean;
    workExample: WorkExample;
}

export class WorkExampleList extends React.Component<WorkExampleListProps, WorkExampleListState> {
    constructor(props: WorkExampleListProps) {
        super(props);
        this.state = {
            showModal: false,
            workExample: {} as WorkExample
        };
        this.viewWorkExample = this.viewWorkExample.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    render(): JSX.Element {
        return (
            <div className="work-example-list">
                <div className="work-example-list__items">
                    {this.props.items.map((item, index) => (
                        <div key={index} className="work-example-list__item">
                            <WorkExampleItem item={item} onView={this.viewWorkExample} />
                        </div>
                    ))}
                </div>
                <LinkButton url={Routes.ADD_WORK_EXAMPLE}
                    className="work-example-list__add"
                    modifiers={[ButtonModifiers.Size.SMALL]}
                    children="Add New Work Example" />
                <WorkExampleModal {...this.state} onClose={this.closeModal} />
            </div>
        );
    }

    viewWorkExample(id: number): void {
        this.setState({
            showModal: true,
            workExample: this.props.items.find(item => item.Id === id)
        });
    }

    closeModal(): void {
        this.setState({
            showModal: false
        });
    }
}