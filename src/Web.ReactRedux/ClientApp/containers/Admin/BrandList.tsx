import * as React from "react";
import { Brand } from "@store/entities";
import { AppState } from "@store/state";
import { Dispatch, bindActionCreators } from "redux";
import { deleteBrand } from "@store/actions/brandsActions";
import { connect } from "react-redux";
import { LinkButton } from "@components/Shared/LinkButton";
import { Routes } from "@scripts/constants";
import { ButtonModifiers } from "@components/Shared/Button";
import "./BrandList.scss";
import { BrandItem } from "@components/Admin/BrandItem";

type BrandListProps = StateProps & DispatchProps;

class BrandList extends React.Component<BrandListProps> {
    render(): JSX.Element {
        let { items, deleteBrand } = this.props;
        return (
            <div className="brand-list">
                <div className="brand-list__items">
                    {items.map(item => (
                        <div key={item.Id} className="brand-list__item">
                            <BrandItem {...item} onDelete={deleteBrand} />
                        </div>
                    ))}
                </div>
                <LinkButton url={Routes.ADD_BRAND}
                    className="brand-list__add"
                    modifiers={[ButtonModifiers.Size.SMALL]}
                    children="Add New Brand" />
            </div>
        );
    }
}

interface StateProps {
    items: Brand[];
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        items: state.brands.items
    };
}

interface DispatchProps {
    deleteBrand: (brandId: number) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        deleteBrand: bindActionCreators(deleteBrand, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandList);