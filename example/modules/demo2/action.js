import fetch from 'fetch/fetch';
import ModalTip from 'modalTip';
import { Store, action, actionProps } from 'reduxm';
const demo2Type = Store.getActionType('demo2Store');
const demo2InputType = Store.getActionType('demo2Input');

let getColumnList = userCode => {
	let params = {};
	params.userCode = userCode;

	return fetch
		.get('/newsCenrer/queryColumnList4Site', params)
		.then(res => {
			return res.dataList;
		})
		.catch(e => {
			ModalTip.warningTip(e.message);
		});
};

let getNewsList = (userCode, columnId) => {
	let params = {};
	params.pageSize = 20;
	params.pageNum = 0;
	params.userCode = userCode;
	params.columnId = columnId;

	return fetch
		.get('/newsCenrer/queryNewsList4Site', params)
		.then(res => {
			return res.dataList;
		})
		.catch(e => {
			ModalTip.warningTip(e.message);
		});
};

@action('demo2Action')
class demo2Action {
	@actionProps('changeDUserCode')
	static changeDUserCode = dUserCode => async (dispatch, _this) => {
		dispatch({ type: demo2InputType.change_dUserCode, dUserCode: dUserCode });
	};

	@actionProps('changeColumn')
	static changeColumn = (userCode, popDispatch) => async (dispatch, _this) => {
		let columnList = await getColumnList(userCode);
		let newsList = await getNewsList(userCode, columnList[0].flowId);

		popDispatch({
			type: demo2Type.change_demo2Store,
			demo2Store: {
				newsTitle: newsList[0].newsTitle,
				columnName: columnList[0].columnName
			}
		});

		_this.changeDUserCode('')(dispatch, _this);
	};

	@actionProps('changeState')
	static changeState = (type, name, value) => async (dispatch, _this) => {
		let store = { type: type };
		store[name] = value;
		dispatch(store);
	};
}
