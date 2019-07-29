import React, { Component } from 'react';
import { Switch, Route, Redirect} from "react-router-dom";
import Home from "@/pages/home";
import VPN from "@/pages/vpn";
import GetIp from '@/pages/getIp';
import BuyMeal from '@/pages/buyMeal';
import AboutMe from '@/pages/aboutWe';
import Register from "@/pages/register";
import Login from "@/pages/login";
import Personal from "@/pages/personal";
import Help from "@/pages/help";
import NotFoundPage from "@/components/notFoundPage";
import Recharge from "@/pages/recharge";
import cookie from "react-cookies";
class IpRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentWillMount(){}
    componentDidMount() {}
    // componentWillReceiveProps (newValue){}
    render() {
        return(
            <div>
                <Switch>
                    <Route path='/' exact render={()=> (
                        <Redirect to="/home"/>
                    )}/>
                    <Route exact path="/home" component={Home} />
                    <Route path="/VPN" component={VPN} />
                    <Route path="/getIp" component={GetIp} />
                    <Route path="/buyMeal" component={BuyMeal} />
                    <Route path="/aboutWe" component={AboutMe} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/help" component={Help} />
                    <Route path="/recharge" component={Recharge} />
                    <Route path="/personal" render={ (props)=>cookie.load("httpipId")?<Personal {...props} />:<Redirect push to="/" />} />
                    {/* <Route path="*" component={NotFoundPage} /> */}
                </Switch>
            </div>
        )
    }
}
export default IpRouter;