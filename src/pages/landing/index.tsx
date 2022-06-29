import "./index.module.css";
import React from "react";
import PageHero from "../../sections/PageHero";
import Footer from "../../sections/Footer";
import NavBar, { AccountActionState } from "../../components/NavBar";
import { useAuthUser, withAuthUser } from "next-firebase-auth";
import SEO from "../../components/SEO";

const LandingPage: React.FC = () => {
    const user = useAuthUser();

    return (
        <div>
            <SEO />
            <NavBar
                accountAction={
                    user.email != null
                        ? AccountActionState.DASHBOARD
                        : AccountActionState.LOGIN
                }
                isInLandingPage={true}
            />
            <PageHero />
        </div>
    );
};

export default withAuthUser()(LandingPage);
