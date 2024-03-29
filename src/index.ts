import Data from './data';
import InitUI from './initui';

window.addEventListener('load', () => {
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
        document.body.innerText = '不能在 IE 或旧版本浏览器下工作，请更换/更新浏览器。';
    }
    const initUI = new InitUI();
    initUI.meta();
    const data = new Data();
    data.load();
    initUI.searchEvent();
});
