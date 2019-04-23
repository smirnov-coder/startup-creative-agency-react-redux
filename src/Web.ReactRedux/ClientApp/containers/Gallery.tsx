import * as React from "react";
import { IWorkExample } from "../store/entities";
import { connect } from "react-redux";
import { AppState } from "../store/reducers/rootReducer";
import { GalleryFilter } from "../components/GalleryFilter";
import { WorkExamplePreview } from "../components/WorkExamplePreview";
import { WorkExampleModal } from "../components/WorkExampleModal";
import "../assets/lib/bootstrap-customized/css/bootstrap.css";
import "./Gallery.scss";

interface IGalleryProps {
    isLoading: boolean;
    items: IWorkExample[];
}

interface IGalleryState {
    activeFilter: string;
    showModal: boolean;
    workExample: IWorkExample;
}

class Gallery extends React.Component<IGalleryProps, IGalleryState> {
    constructor(props: IGalleryProps) {
        super(props);
        this.state = {
            activeFilter: "*",
            showModal: false,
            workExample: null
        };
        this.changeFilter = this.changeFilter.bind(this);
        this.viewWorkExample = this.viewWorkExample.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    render(): JSX.Element {
        let categories: string[] = this.props.items.map(workExample => workExample.Category);
        let { isLoading, items } = this.props;
        let { activeFilter, showModal } = this.state;
        return (
            <section className="gallery">
                <h3 className="sr-only">Work Example Gallery</h3>
                <div className="gallery__filter">
                    <GalleryFilter categories={categories} activeFilter={activeFilter}
                        onChangeFilter={this.changeFilter} />
                </div>
                <div className="gallery__items row">
                    {isLoading ? <div>Loading... Please wait</div> : items.map(workExample => (
                        <div key={workExample.Id} className="gallery__item col-sm-6 col-md-4" data-group={workExample.Category.toLowerCase()}>
                            <WorkExamplePreview key={workExample.Id} workExample={workExample}
                                onView={this.viewWorkExample} />
                        </div>
                    ))}
                </div>
                {!showModal ? null :
                    <WorkExampleModal workExample={this.state.workExample} showModal={showModal} onClose={this.closeModal}
                        title={this.state.workExample.Name} subtitle={this.state.workExample.Category} />
                }
            </section>
        );
    }

    closeModal(): void {
        this.setState({
            showModal: false
        })
    }

    viewWorkExample(id: number): void {
        let workExample = this.props.items.find(x => x.Id === id);
        this.setState({
            showModal: true,
            workExample
        });
    }

    changeFilter(activeFilter: string): void {
        this.setState({
            activeFilter
        });
        $(".gallery__item").each(function () {
            let $galleryItem = $(this);
            let itemGroup = $galleryItem.data("group");
            if (activeFilter === "*" || activeFilter.toUpperCase() === itemGroup.toUpperCase()) {
                $galleryItem.show("slow");
            } else {
                $galleryItem.hide("slow");
            }
        });
    }
}

interface IStateProps {
    isLoading: boolean;
    items: IWorkExample[];
}

const mapStateToProps = (state: AppState): IStateProps => {
    return {
        isLoading: state.worksReducer.works.isLoading, 
        items: state.worksReducer.works.items
    };
}

//interface IDispatchProps {
//    getPageModel: () => void
//}

//const mapDispatchToProps = (dispatch: Dispatch<ServicesActions>): IDispatchProps => {
//    return {
//        getPageModel: bindActionCreators(getPageModel, dispatch)
//    };
//}

export default connect(mapStateToProps, null)(Gallery);