(this.__LOADABLE_LOADED_CHUNKS__=this.__LOADABLE_LOADED_CHUNKS__||[]).push([[2],{40:function(e,t,s){"use strict";s.r(t);var o=s(0),a=s.n(o),d=s(3),r=s(4),n=s(6);class p extends a.a.Component{constructor(e){super(e),this.shouldComponentUpdate=(e,t)=>!1,this.componentDidMount=()=>{const e=this.props.path;!(this.props.loadedRoutes.length<=0)&&this.props.loadedRoutes.includes(e)||this.props.hideLoader(e)},this.render=()=>{const e=this.props.path,t=this.props.styling,s=[t.routePage];return this.props.loadedRoutes.length<=0||!this.props.loadedRoutes.includes(e)?s.push(t.routePageLoading):s.push(t.routePageloaded),a.a.createElement("section",{className:Object(r.a)(...s)},a.a.createElement("h2",null,"About Page"))}}}t.default=Object(d.b)(e=>({loadedRoutes:e.generalData.routeLoader.loadedRoutes}),{showLoader:n.f,hideLoader:n.e})(p)}}]);