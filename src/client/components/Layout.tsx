import React from 'react';

const Layout = ({ children }) => {
    return (
        <main className="container">
            <section className="row justify-content-center mt-5">
                <div className="col-md-6">
                    {children}
                </div>
            </section>
        </main>
    );
} 

export default Layout;