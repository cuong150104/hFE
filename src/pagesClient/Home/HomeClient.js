
import Navbar from "../../components/Client/Navbar/Navbar";
import Header from "../../components/Client/HeaderClient/HeaderClient";
import "./HomeClient.scss";

import Featured from "../../components/Client/Featured/Featured";
import FeaturedProperties from "../../components/Client/FeaturedProperties/FeaturedProperties";
import PropertyList from "../../components/Client/PropertyList/PropertyList";
import Footer from "../../components/Client/Footer/Footer";
import MailList from "../../components/Client/MailList/MailList";




const HomeClient = () => {
    return (

        <div>
            <Navbar />
            <Header />
            <div className="homeContainer">
                <Featured />
                <h1 className="homeTitle">Browse by property type</h1>
                <PropertyList />
                <h1 className="homeTitle">Homes guests love</h1>
                <FeaturedProperties />
                <MailList />
                <Footer />
            </div>
        </div>
    );
};

export default HomeClient;