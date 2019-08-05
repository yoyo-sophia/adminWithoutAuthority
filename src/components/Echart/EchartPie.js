import react, { PureComponent } from "react";
import { Spin } from "antd";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/markPoint";
import "echarts/lib/component/markLine";

class echartPie extends PureComponent {

  constructor(props) {
    super(props);
    this.echartsInstance = echarts;// echarts object
    this.echartsElement = null;
  }

  componentDidMount() {
    this.rerender();
  }

  componentDidUpdate(prevProps) {
    this.rerender();
  }

  // componentWillUnmount() {
  //   this.dispose();
  // }

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
    const echartObj = this.getEchartsInstance();
    echartObj.setOption({
      color: ["#F8D800", "#0396FF", "#EA5455", "#7367F0", "#8C1BAB", "#DE4313", "#D939CD", "#49C628", "#06beb6"],
      tooltip: {
        trigger: "item",
        formatter: "{b0}: {c0}%",
        backgroundColor: "rgba(255,255,255,255)",
        padding: [7, 10],
        extraCssText: "box-shadow:rgba(0, 0, 0, 0.18) 0px 0px 20px 0px;",
        borderColor: "#333",
        textStyle: {
          color: "#333"
        }
      },
      // title: {
      //   text: "测试",
      //   left: "center",
      //   top: "45%",
      //   textStyle: {
      //     color: "#333",
      //     fontSize: 14,
      //     align: "center"
      //   }
      // },
      legend: this.props.legend,
      series: [{
        type: "pie",
        radius: ["50%", "70%"],
        hoverAnimation: false,
        color: this.props.seriesColor,
        // itemStyle:{
        //   normal: {
        //     borderWidth: 5,
        //     borderColor: '#fff',
        //   }
        // },
        label: {
          normal: {
            show: false,
            position: "center"
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },

        data: this.props.seriesData
      }],
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


export default echartPie;