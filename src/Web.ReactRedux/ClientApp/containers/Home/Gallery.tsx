import * as React from "react";
import { WorkExample } from "@store/entities";
import { GalleryFilter } from "@components/Home/GalleryFilter";
import { WorkExamplePreview } from "@components/Home/WorkExamplePreview";
import { WorkExampleModal } from "@components/Home/WorkExampleModal";
import "@bootstrap/css";
import "./Gallery.scss";
import Loader from "@components/Shared/Loader";
import * as $ from "jquery";
import { compose } from "redux";
import { withLoader } from "@containers/Admin/withLoader";
import { withDataFeed } from "@containers/Admin/withDataFeed";

interface GalleryProps {
    items: WorkExample[];
}

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
            workExample: {} as WorkExample
        };
        this.changeFilter = this.changeFilter.bind(this);
        this.viewWorkExample = this.viewWorkExample.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    private itemRefs: React.RefObject<HTMLDivElement>[] = [];

    render(): JSX.Element {
        let categories: string[] = this.props.items.map(workExample => workExample.Category);
        let { items } = this.props;
        let { activeFilter, ...restState } = this.state;
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
                    <GalleryFilter categories={categories} activeFilter={activeFilter} onChangeFilter={this.changeFilter} />
                </div>
                <div className="gallery__items row">
                    {elements.map(element => element)}
                </div>
                <WorkExampleModal onClose={this.closeModal} {...restState} />
            </section>
        );
    }

    closeModal(): void {
        this.setState({
            showModal: false
        });
    }

    viewWorkExample(id: number): void {
        let workExample = this.props.items.find(item => item.Id === id);
        this.setState({
            showModal: true,
            workExample
        });
    }

    changeFilter(activeFilter: string): void {
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

const composed = compose(
    withLoader(Loader, state => state.works.isLoading),
    withDataFeed(state => state.works.items, "items")
);

export default composed(Gallery);