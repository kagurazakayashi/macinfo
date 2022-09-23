import NyaDom from './nyalib/nyadom';
import NyaDebug from './nyalib/nyadebug';
import NyaEvent from './nyalib/nyaevent';
import NyaAs from './nyalib/nyaas';
import { DataItem } from './data';

export default class InitUI {
    search: HTMLInputElement = NyaAs.input(NyaDom.byId('search'));
    cID: HTMLInputElement = NyaAs.input(NyaDom.byId('cID'));
    cRegistry: HTMLInputElement = NyaAs.input(NyaDom.byId('cRegistry'));
    cAssignment: HTMLInputElement = NyaAs.input(NyaDom.byId('cAssignment'));
    cName: HTMLInputElement = NyaAs.input(NyaDom.byId('cName'));
    cAddress: HTMLInputElement = NyaAs.input(NyaDom.byId('cAddress'));
    cProtocol: HTMLInputElement = NyaAs.input(NyaDom.byId('cProtocol'));
    list: HTMLElement = NyaDom.byId('list');
    subTitle: HTMLAnchorElement = NyaAs.a(NyaDom.byClassFirst('mdui-typo-title'));
    btnReload: HTMLSpanElement = NyaAs.span(NyaDom.byId('btnReload'));

    constructor() {
        NyaEvent.addEventListener(this.btnReload, (event: Event) => {
            location.reload();
        });
    }

    searchEvent() {
        const chFunc = () => {
            console.log('ch');
            const val: string = this.search.value;
            if (val.length >= 2) {
                this.searchDB(val);
            } else {
                this.list.innerHTML = '<p>输入更长的搜索词以获得结果</p>';
                this.subTitle.innerText = '';
            }
        };
        this.search.addEventListener('input', chFunc);
        this.search.addEventListener('change', chFunc);
    }

    searchDB(keyword: string) {
        const db: DataItem[] = window.db;
        const ok: DataItem[] = [];
        for (const item of db) {
            if (this.cID.checked && item.id.toString().indexOf(keyword) != -1) {
                ok.push(item);
                continue;
            }
            if (this.cRegistry.checked && item.registry.toString().indexOf(keyword) != -1) {
                ok.push(item);
                continue;
            }
            if (this.cAssignment.checked && item.assignment.toString().indexOf(keyword) != -1) {
                ok.push(item);
                continue;
            }
            if (this.cName.checked && item.oName.toString().indexOf(keyword) != -1) {
                ok.push(item);
                continue;
            }
            if (this.cAddress.checked && item.oAddress.toString().indexOf(keyword) != -1) {
                ok.push(item);
                continue;
            }
            if (this.cProtocol.checked && item.protocol.toString().indexOf(keyword) != -1) {
                ok.push(item);
                continue;
            }
        }
        this.list.innerHTML = ok.length > 0 ? '' : '<p>没有找到匹配的结果</p>';
        this.subTitle.innerText = '搜索到结果 ' + ok.length.toString() + ' / ' + db.length.toString();
        for (const item of ok) {
            const tr: HTMLTableRowElement = NyaAs.tr();
            const tdId: HTMLTableCellElement = NyaAs.td();
            tdId.innerText = item.id.toString();
            tr.appendChild(tdId);
            const tdRegistry: HTMLTableCellElement = NyaAs.td();
            tdRegistry.innerText = item.registry.toString();
            tr.appendChild(tdRegistry);
            const tdAssignment: HTMLTableCellElement = NyaAs.td();
            tdAssignment.innerText = item.assignment.toString();
            tr.appendChild(tdAssignment);
            const tdName: HTMLTableCellElement = NyaAs.td();
            tdName.innerText = item.oName.toString();
            tr.appendChild(tdName);
            const tdAddress: HTMLTableCellElement = NyaAs.td();
            tdAddress.innerText = item.oAddress.toString();
            tr.appendChild(tdAddress);
            const tdProtocol: HTMLTableCellElement = NyaAs.td();
            tdProtocol.innerText = item.protocol.toString();
            tr.appendChild(tdProtocol);
            this.list.appendChild(tr);
        }
    }

    /**
     * 在网页中插入客户端信息以方便调试
     */
    meta() {
        NyaDebug.infoToMeta();
        NyaDom.byId('title').innerHTML = document.title;
    }
}
