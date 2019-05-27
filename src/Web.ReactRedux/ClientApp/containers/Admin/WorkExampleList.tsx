import * as React from "react";
import { WorkExample } from "@store/entities";
import { AppState } from "@store/state";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { LinkButton } from "@components/Shared/LinkButton";
import { Routes } from "@scripts/constants";
import { ButtonModifiers } from "@components/Shared/Button";
import { WorkExampleItem } from "@components/Admin/WorkExampleItem";
import { WorkExampleModal } from "@components/Home/WorkExampleModal";
import { deleteWorkExample } from "@store/actions/worksActions";
import "./WorkExampleList.scss";

type WorkExampleListProps = StateProps & DispatchProps;

interface WorkExampleListState {
    showModal: boolean;
    workExample: WorkExample;
}

class WorkExampleList extends React.Component<WorkExampleListProps, WorkExampleListState> {
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
        let { items, deleteWorkExample } = this.props;
        return (
            <div className="work-example-list">
                <div className="work-example-list__items">
                    {items.map(item => (
                        <div key={item.Id} className="work-example-list__item">
                            <WorkExampleItem {...item} onDelete={deleteWorkExample} onView={this.viewWorkExample} />
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

interface StateProps {
    items: WorkExample[];
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        items: state.works.items
    };
}

interface DispatchProps {
    deleteWorkExample: (workExampleId: number) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        deleteWorkExample: bindActionCreators(deleteWorkExample, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkExampleList);