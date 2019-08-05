import react, { PureComponent } from "react";
import { Spin } from "antd";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/markPoint";
import "echarts/lib/component/markLine";

class echartBar extends PureComponent {

  constructor(props) {
    super(props);
    this.echartsInstance = echarts;// echarts object
    this.echartsElement = null;
  }

  componentDidMount() {
    this.rerender();
  }

  componentDidUpdate(prevProps) {
    this.renderEchartDom();
  }

  // debounce
  debounce(func, wait = 500) {
    let timeout;  // 定时器变量
    return function(event) {
      clearTimeout(timeout);  // 每次触发时先清除上一次的定时器,然后重新计时
      event.persist && event.persist();   //保留对事件的引用
      //const event = e && {...e}   //深拷贝事件对象
      timeout = setTimeout(() => {
        func(event);
      }, wait);  // 指定 xx ms 后触发真正想进行的操作 handler
    };
  }

  // rerender echart
  rerender = () => {
    const echartObj = this.renderEchartDom();
    const _this = this;
    window.addEventListener("resize", _this.debounce(function() {
      echartObj.resize();
    }));
  };

  // componentWillUnmount() {
  //   this.dispose();
  // }

  // return the echart object
  getEchartsInstance = () => this.echartsInstance.getInstanceByDom(this.echartsElement) || this.echartsInstance.init(this.echartsElement);

  dispose = () => {
    if (this.echartsElement) {
      // try {
      //   clear(this.echartsElement);
      // } catch (e) {
      //   console.warn(e);
      // }
      // dispose echarts instance
      this.echartsInstance.dispose(this.echartsElement);
    }
  };

  // render dom
  renderEchartDom = () => {
    let _this = this;
    const echartObj = this.getEchartsInstance();
    echartObj.setOption({
      color: ["#F8D800", "#0396FF", "#EA5455", "#7367F0", "#8C1BAB", "#DE4313", "#D939CD", "#49C628", "#06beb6"],
      title: {
        text: this.props.title
      },
      tooltip: {
        trigger: "axis",
        formatter: function(params) {
          if (!_this.props.hasToolFormatter) {
            let paramStr = "",
              axisValue = params[0] ? params[0].name : "";
            params.forEach((item, index) => {
              if (item.value !== "0.00") {
                let newValue;
                if (_this.props.formatterValue) {
                  newValue = item.value > 1000 ? item.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : item.value;
                } else {
                  newValue = item.value;
                }
                paramStr += item.marker + item.seriesName + ":" + newValue + "<br/>";
              }
            });
            return `${axisValue}<br/>${paramStr}`;
          } else {
            return  _this.props.toolFormatter(params);
          }
        },
        axisPointer: {
          lineStyle: {
            opacity: 0
          }
        },
        backgroundColor: "rgba(255,255,255,255)",
        padding: [7, 10],
        extraCssText: "box-shadow:rgba(0, 0, 0, 0.18) 0px 0px 20px 0px;",
        borderColor: "#333",
        textStyle: {
          color: "#333"
        }
      },
      legend: this.props.legend,
      grid: {
        left: "1%",
        right: "3%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: [{
        splitLine: { show: false },
        type: "category",
        data: this.props.data.xData,
        boundaryGap: this.props.boundaryGap === false ? false : true
      }],
      yAxis: [{
        type: "value",
        splitLine: { show: false }
      }],
      series: this.props.data.series,
      calculableColor: "rgba(255,165,0,0.6)",
      calculableHolderColor: "rgba(240,157.5,0.2)"
    }, true);
    return echartObj;
  };

  render() {
    return (
      <Spin spinning={this.props.loading}>
        <div
          ref={(e) => {
            this.echartsElement = e;
          }}
          style={{ width: "100%", height: 200 }}
        />
      </Spin>
    );
  }
}


export default echartBar;