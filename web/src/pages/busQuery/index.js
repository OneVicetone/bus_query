import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Button } from '@tarojs/components'
import './index.scss'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction, AtMessage, AtIcon } from "taro-ui"

export default class BusQuery extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputRoute: "",
            isOpened: false,
            queryRoute: "",
            status: "",
            fuzzyFindList:[]
        }
    }

    componentWillMount() { }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    routeHandle(e) {
        let self = this
        this.setState({
            inputRoute: e.target.value,
        },()=>{
            if(this.state.inputRoute !== ''){
                Taro.request({
                    url:"http://6tawxx.natappfree.cc/api/web/fuzzyFindRoutes",
                    method:"POST",
                    dataType:'json',
                    data:{ 
                        routes:this.state.inputRoute
                    },
                    success(res){
                        if(res.data.code === 200){
                            self.setState({
                                fuzzyFindList:res.data.data
                            })
                        }
                    }
                })
            }else if(this.state.inputRoute === ''){
                this.setState({fuzzyFindList:[]})
            }
            
        })
    }

    closeDialog() {
        this.setState({
            isOpened: false
        })
    }

    selectAddress(){
        Taro.atMessage({
            message: '目前仅支持深圳市公交停运信息查询',
            type: 'warning',
        })
    }

    selectFuzzyRoute(routes){
        this.setState({
            inputRoute:routes,
            fuzzyFindList:[]
        })
    }

    searchRoute() {
        let self = this
        if (this.state.inputRoute.trim() === '') return
        Taro.request({
            url: 'http://6tawxx.natappfree.cc/api/web/findBusStatusByRoute',
            method: "POST",
            dataType: 'json',
            data: {
                routes: this.state.inputRoute
            },
            success(res) {
                if (res.data.code === 200) {
                    self.setState({
                        queryRoute: res.data.data.routes,
                        status: res.data.data.status
                    }, () => {
                        if (self.state.status !== '') self.setState({ isOpened: true })
                    })
                } else {
                    Taro.atMessage({
                        message: res.data.msg,
                        type: 'warning',
                    })
                    self.setState({inputRoute:""})
                }
            }
        })
    }


    render() {
        return (
            <View className='bus-query-page'>
                <View className='select-address'>
                    <AtIcon value='map-pin' size='20' color='#55b4ff' />
                    <Text className='address' onClick={this.selectAddress}>深圳市</Text>
                </View>
                <View className='search-input'>
                    <Input placeholder='请输入需要查询的公交编号' onInput={this.routeHandle} value={this.state.inputRoute}></Input>
                    <Button className='search-btn' onClick={this.searchRoute}>搜索</Button>
                </View>
                <View className='fuzzy-list'>
                        {
                            this.state.fuzzyFindList.map(item=>{
                                return(
                                    <View className='fuzzy-list-item' key={item.routes+item.status} onClick={this.selectFuzzyRoute.bind(this,item.routes)}>{item.routes}</View>
                                )
                            })
                        }
                </View>

                <View className='tips'>
                    <Text className='tips-text important-tips'>*高峰期营运，指：工作日7:00-9:00 时、 17：30-19:30 时恢复运营，其他时段原则上暂停运营。</Text>
                    <Text className='tips-text'>从深圳市交通运输局获悉,为做好当前阶段公交行业新型冠状病毒防疫工作,保障市民和乘客的健康安全,结合目前疫情防控需要行业实际以及客流情况</Text>
                    <Text className='tips-text'>即日起,深圳将适当调整常规公交线路服务规模</Text>
                    <Text className='tips-text'>请市民提前规划出行时间，或拨打公交企业服务热线进行出行咨询。</Text>
                    <Text className='tips-text'>三大公交公司服务热线分别为：集团电话：<Text>0755-83161116</Text>；东部公交：<Text>0755-89983563</Text>；西部公汽：<Text>0755-36357333</Text></Text>
                    <Text className='tips-text'>*数据来源于深圳市交通运输局</Text>
                </View>

                <AtModal isOpened={this.state.isOpened}>
                    <AtModalHeader>您查询的[{this.state.queryRoute}]线路</AtModalHeader>
                    <AtModalContent className='dialog-content'>
                        {this.state.status === "0" ? '您查询的线路已停运' : this.state.status === "3" ? "您查询的线路为高峰期营运" : "您查询的线路暂无停运信息"}
                    </AtModalContent>
                    <AtModalAction>
                        <Button onClick={this.closeDialog}>确定</Button>
                    </AtModalAction>
                </AtModal>
                <AtMessage />
            </View>
        )
    }
}