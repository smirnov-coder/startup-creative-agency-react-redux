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

    private itemRefs: React.RefObject<HTMLDivElement>[] = [];

    render(): JSX.Element {
        let categories: string[] = this.props.items.map(workExample => workExample.Category);
        let { isLoading, items } = this.props;
        let { activeFilter, showModal } = this.state;
        let elements: JSX.Element[] = [];
        for (let index = 0; index < items.length; index++) {
            if (!this.itemRefs[index]) {
                this.itemRefs.push(React.createRef());
            }
            elements.push(
                <div key={items[index].Id} ref={this.itemRefs[index]} className="gallery__item col-sm-6 col-md-4"
                    data-group={items[index].Category.toLowerCase()}>
                    <WorkExamplePreview key={items[index].Id} workExample={items[index]}
                        onView={this.viewWorkExample} />
                </div>
            );
        }
        return (
            <section className="gallery">
                <h3 className="sr-only">Work Example Gallery</h3>
                <div className="gallery__filter">
                    {/* /// TODO: Add loader. */isLoading
                        ? <div>Loading... Please wait</div>
                        : <GalleryFilter categories={categories} activeFilter={activeFilter}
                            onChangeFilter={this.changeFilter} />
                    }
                </div>
                <div className="gallery__items row">
                    {/* /// TODO: Add loader. */isLoading
                        ? <div>Loading... Please wait</div>
                        : elements.map(element => element)
                    }
                </div>
                {!showModal ? null :
                    <WorkExampleModal workExample={this.state.workExample} showModal={showModal}
                        onClose={this.closeModal} />
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
        if (!$) {
            throw new Error("jQuery '$' is required.");
        }
        this.setState({
            activeFilter
        });
        this.itemRefs.forEach(ref => {
            let $galleryItem = $(ref.current);
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

export default connect(mapStateToProps, null)(Gallery);