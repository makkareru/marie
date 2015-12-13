var React = require("react");
var ReactDOM = require("react-dom");
var ReactRouter = require("react-router");
var Router = ReactRouter.Router;
var Link = ReactRouter.Link;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var data = [
  {id: "1", budget: "100"},
  {id: "2", budget: "200"}
];

var offer_data = [
  {id: "1", detail: "hoge"},
  {id: "2", detail: "foo"}
];

var Top = React.createClass ({
  render: function() {
    return(
      <div className="container">
        <div className="">
          <h1 className="catch-phrase">
            みんなでつくるから、もっとうれしい
          </h1>
          <h2 className="sub-catch-phrase">
            ー わたしたちらしいウェディングを ー
          </h2>
          <div class="on-muvie-links">
            <button>
              希望のサービス / アイテム
            </button>
            <button>
              予算
            </button>
            <button>
              Search
            </button>
          </div>
        </div>
        <table>
          <tr>
            <td>
              <div className="left-column">
                <h3 className="subTitle">marieeとは</h3>
                <div className="description">
                  <p>これから結婚式を挙げるカップルとアトリエショップやカメラマンなどのさまざまな専門店とをつなげるマッチングサービスです。</p>
                 <p>《サービスの流れ》</p>
                 <p>１．カップルが専門店への依頼を登録</p>
                 <p>２．専門店が登録のあった依頼案件に対して提案</p>
                 <p>３．マッチングしたら双方間で直接打ち合わせ</p>
                </div>
                <div className="right-column">
                  <img src="images/mariee.jpg" alt="mariee" />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="left-column">
                <h3 className="subTitle">ベンダーに仕事を依頼する</h3>
                <div className="description">
                  <p>希望するアイテム、希望条件、理想のイメージを登録して、専門店から提案が来るのを待ちましょう！</p>
                  <p>専門家の力を集結させて、「わたしたちらしいウェディングを」実現させましょう！</p>
                  <br/>
                  <p>個人の仕事を受注する</p>
                  <p>専門店登録をして理想のウェディングを挙げたい2人を応援しませんか？私たちの理念に共感していただける専門店を絶賛募集しています。</p>
                </div>
                <Link to="/demands">
                  <button className="top-link">
                    依頼する / 理想のイメージを伝える
                  </button>
                </Link>
              </div>
              <div className="right-column">
                <img src="images/demand.jpg" alt="demand" />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="left-column">
                <h3 className="subTitle">個人の仕事を受注する</h3>
                <div className="description">
                  <p>専門店登録をして理想のウェディングを挙げたい2人を応援しませんか？私たちの理念に共感していただける専門店を絶賛募集しています。</p>
                </div>
                <Link to="/offers">
                  <button className="top-link">
                    案件を送る / カップルを応援する
                  </button>
                </Link>
              </div>
              <div className="right-column">
                <img src="images/offer.jpg" alt="offer" />
              </div>
            </td>
          </tr>
        </table>
        <Link to="/">トップに戻る</Link>
        <footer>
        </footer>
      </div>
    );
  }
})

var Offers = React.createClass ({
  render: function() {
    return(
      <OfferList data={offer_data}/>
    );
  }
})

var OfferList = React.createClass ({
  getInitialState: function() {
    return {data: []};
  },
  render: function() {
    var offerNodes = this.props.data.map(function (offer) {
      return(
        <table>
          <tr>
            <th>
              ID
            </th>
            <th>
             Detail
            </th>
            <th>
            </th>
          </tr>
          <Offer id={offer.id} detail={offer.detail} />
        </table>
      );
    });
    return(
      <div ClassName="offerList">
        {offerNodes}
      </div>
    );
  }
})

var Offer = React.createClass ({
  render: function() {
    return(
      <tr>
        <td>
          {this.props.id}
        </td>
        <td>
          {this.props.detail}
        </td>
        <td>
          <Link to={"offers/show/" + this.props.id}>show</Link>
        </td>
      </tr>
    );
  }
})

var OfferDetail = React.createClass ({
  render: function() {
    return(
      <table>
        <tr>
         <th>
           ID
         </th>
         <td>
           {this.props.id}
         </td>
        </tr>
        <tr>
         <th>
           Detail
         </th>
         <td>
           {this.props.detail}
         </td>
        </tr>
      </table>
    );
  }
})

var OfferNew = React.createClass ({
  render: function() {
    return(
      <h3>OfferNew</h3>
    );
  }
})

var Demands = React.createClass ({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    $.ajax({
      url: "https://4eekisya5f.execute-api.us-east-1.amazonaws.com/production/demands",
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <DemandList data={this.state.data}/>
    );
  }
})

var DemandList = React.createClass ({
  render: function() {
    var demandNodes = this.props.data.map(function (demand) {
      return (
        <table>
          <tr>
            <th>
              ID
            </th>
            <th>
              budget
            </th>
            <th>
            </th>
          </tr>
          <Demand id={demand.id} budget={demand.budget} />
        </table>
      );
    });
    return (
      <div ClassName="demandList">
        {demandNodes}
      </div>
    );
  }
})

var Demand = React.createClass ({
  render: function() {
    return(
      <tr>
        <td>
          {this.props.id}
        </td>
        <td>
          {this.props.budget}
        </td>
        <td>
          <Link to={"demands/show/" + this.props.id}>show</Link>
        </td>
      </tr>
    );
  }
})

var DemandNew = React.createClass ({
  render: function() {
    return(
      <form className="demandForm">
        <input id="budget" type="text" placeholder="Please Write Your Budget"/>
        <input type="submit"/>
      </form>
    );
  }
})

var DemandDetail = React.createClass ({
  render: function() {
    return(
      <table>
        <tr>
         <th>
           ID
         </th>
         <td>
           {this.props.id}
         </td>
        </tr>
        <tr>
         <th>
           Budget
         </th>
         <td>
           {this.props.budget}
         </td>
        </tr>
      </table>
    );
  }
})

var App = React.createClass({
  render: function() {
    return(
      <div>
        <div>
          <div className="header">
            <div className="logo">
              <Link to="/">
                mariee
              </Link>
            </div>
            <div className="navigation">
              marieeとは
            </div>
            <div className="navigation">
              <Link to="demands">
                専門店に依頼する
              </Link>
            </div>
            <div className="navigation">
              <Link to="offers">
                依頼案件を探す
              </Link>
            </div>
            <div className="button"><a className="btn" href="">Hazime</a></div>
            <div className="button"><a className="btn" href="">Login</a></div>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
})

// Router や Route も React コンポーネント
ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Top}/>
      <Route path="demands"          component={Demands}/>
      <Route path="demands/new"      component={DemandNew}/>
      <Route path="demands/show/:id" component={DemandDetail}/>
      <Route path="offers"           component={Offers}/>
      <Route path="offers/new"       component={OfferNew}/>
      <Route path="offers/show/:id"  component={OfferDetail}/>
    </Route>
  </Router>
  ),
  document.getElementById("container")
);
