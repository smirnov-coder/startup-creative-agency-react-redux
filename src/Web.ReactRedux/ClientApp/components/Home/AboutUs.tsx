import * as React from "react";
import "../../assets/lib/bootstrap-customized/css/bootstrap.css";
import "./AboutUs.scss";

export class AboutUs extends React.Component {
    render(): JSX.Element {
        return (
            <section className="about-us-info">
                <h3 className="sr-only">Company Description</h3>
                <p className="about-us-info__item col-sm-6">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sediam nonumy eirmod tempor invidunt
                    ut labore et dolore aliquyam
                    erat, sed diam voluptua. At vero eos et accusam et justo dolores et ea rebum. Stet clita kasd
                    gubergren,
                    no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor et dolore aliquyam
                    erat.
                    Lorem ipsum dolor sit amet. Lorem ipsum eat.
                </p>
                <p className="about-us-info__item col-sm-6">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sediam nonumy eirtempor invidunt ut
                    labore et dolore aliquyam erat,
                    sed diam voluptua. At vero eos eaccusam et justo dolores et ea rebum. Stet clita kasd
                    gubergren,
                    no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor et dolore aliquyam
                    erat.
                    Loreipsum dolor sit amet. Lorem ipsum dolor et.
                </p>
            </section>
        );
    }
}