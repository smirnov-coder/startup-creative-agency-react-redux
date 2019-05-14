import * as React from "react";
import { WorkExample } from "../../store/entities";
import { connect } from "react-redux";
import { GalleryFilter } from "../../components/Home/GalleryFilter";
import { WorkExamplePreview } from "../../components/Home/WorkExamplePreview";
import { WorkExampleModal } from "../../components/Home/WorkExampleModal";
import "../../assets/lib/bootstrap-customized/css/bootstrap.css";
import "./Gallery.scss";
import { Loader } from "../../components/Home/Loader";
import { AppState } from "../../store/state";

type GalleryProps = StateProps;

interface GalleryState {
    activeFilter: string;
    showModal: boolean;
    workExample: WorkExample;
}

class Gallery extends React.Component<GalleryProps, GalleryState> {
    constructor(props: GalleryProps) {
        super(props);
        this.state = {
            activeFilter: "*",
            showModal: false,
            workExample: {
                Id: 0,
                Name: "",
                Category: "",
                Description: "",
                ImagePath: "",
                CreatedBy: null,
                CreatedOn: null,
                LastUpdatedBy: null,
                LastUpdatedOn: null
            }
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
                    <WorkExamplePreview key={items[index].Id} workExample={items[index]} onView={this.viewWorkExample} />
                </div>
            );
        }
        return (
            <section className="gallery">
                <h3 className="sr-only">Work Example Gallery</h3>
                <div className="gallery__filter">
                    {isLoading
                        ? <Loader />
                        : <GalleryFilter categories={categories} activeFilter={activeFilter}
                                onChangeFilter={this.changeFilter} />
                    }
                </div>
                <div className="gallery__items row">
                    { isLoading ? <Loader /> : elements.map(element => element) }
                </div>
                <WorkExampleModal workExample={this.state.workExample} showModal={showModal}
                    onClose={this.closeModal} />
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

interface StateProps {
    isLoading: boolean;
    items: WorkExample[];
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        isLoading: state.works.isLoading, 
        items: state.works.items
    };
}

export default connect(mapStateToProps, null)(Gallery);