/**
 * 数据注入层
 * 提供createStore、getDevTools、getActionType、getAllInitData四个方法
 *
 * createStore方法,绑定数据到整个react路由层
 * @params router(react路由), debug(是否开启调试工具)
 * @return reactRouter
 *
 * getDevTools方法,获取调试工具视图
 * @return DevTools(调试工具视图)
 *
 * getActionType方法,获取storeName下所有actionType
 * @param storeName(数据层名称)
 * @return {}(storeName下所有actionType)
 *
 * getAllInitData方法,获取storeName下所有初始数据
 * @param storeName(数据层名称)
 * @return {}(storeName下所有初始数据)
 */
import Store from './store/store';
/**
 * store修饰器,处理整个共享性store层存入数据工厂
 * @params storeName(数据层名称), allActionType(改变整个数据层的actionType), allStoreLogs(改变整个数据层的打印日志级别)
 * @return true
 */
const store = Store.store;
/**
 * localStore修饰器,处理整个组件级store层存入数据工厂(注意:改变共享性数据请通过this.props.popDispatch函数,入参同dispatch)
 * @params storeName(数据层名称), allActionType(改变整个数据层的actionType), allStoreLogs(改变整个数据层的打印日志级别)
 * @return true
 */
const localStore = Store.localStore;
/**
 * storeActionType修饰器,按名称录入actionType
 * @params actionType(数据改变响应type), level(日志级别)
 * @return target
 */
const storeActionType = Store.storeActionType;
/**
 * storeUnDestroy修饰器,按名称录入是否不需要销毁
 * @return target
 */
const storeUnDestroy = Store.storeUnDestroy;
/**
 * storeComputed修饰器,按名称录入计算者(由某个值计算得来)
 * @params dependency(依赖的属性被计算者), level(日志级别)
 * @return target
 */
const storeComputed = Store.storeComputed;

/**
 * connectStore修饰器,连接数据,事件和reactDom,离开页面触发数据销毁
 * @params reducerList[](页面所需全局共享性数据层名称),storeName(组件级无需共享数据层名称),destroyStoreList[](离开页面销毁数据层名称)
 * @return reactDom
 */
import connectStore from './connect/connectstore';

/**
 * 事件注入层
 */
import Action from './action/action';
/**
 * action修饰器,处理整个action层存入事件工厂
 * @param actionName(事件层名称)
 * @return target
 */
const action = Action.action;
/**
 * actionProps修饰器,按名称录入action
 * @params actionFunName(事件名称), level(日志级别)
 * @return target
 */
const actionProps = Action.actionProps;
/**
 * actionInjection修饰器,按名称反向注入事件到reactDom
 * @param actionName(事件名称)
 * @return target
 */
const actionInjection = Action.actionInjection;

export {
	Store,
	store,
	localStore,
	storeActionType,
	storeUnDestroy,
	storeComputed,
	connectStore,
	action,
	actionProps,
	actionInjection
};
