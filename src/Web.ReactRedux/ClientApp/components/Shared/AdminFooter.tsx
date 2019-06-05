import * as React from "react";

const AdminFooter: React.SFC = () => {
    return (
        <footer className="footer">
            <div className="footer__copyright footer__copyright--single">
                &copy; 2015-{new Date().getFullYear()} Startup. Designed by ShapedTheme. Programmed by Yury Smirnov.
            </div>
        </footer>
    );
}

export default AdminFooter;