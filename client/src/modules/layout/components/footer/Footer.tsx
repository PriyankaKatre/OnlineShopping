import React from 'react';

interface IProps{}

let Footer:React.FC<IProps> = () => {
    return (
        <footer className="mt-auto bg-gradient-to-r from-gray-950 to-cyan-700 text-white text-center p-3 ">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <p className="text-xl font-bold">Online Shopping React &copy; {new Date().getFullYear()}</p>
                        <h6>All Rights Reserved</h6>
                        <h6>Developed & Maintained by Priyanka Katre
                        </h6>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
