import NyaDom from './nyalib/nyadom';
import NyaDebug from './nyalib/nyadebug';
import NyaNetwork from './nyalib/nyanetwork';
import NyaCSV from './nyalib/nyacsv';
import NyaStrings from './nyalib/nyastrings';
import NyaAs from './nyalib/nyaas';
import mdui from 'mdui';

export interface DataItem {
    id: number;
    file: string;
    registry: string;
    assignment: string;
    oName: string;
    oAddress: string;
    protocol: string;
}

export default class Data {
    baseURL: string = 'dlcsv2/';
    csvFileList: string[] = ['time.txt', 'Company ID.csv', 'Ethertype.csv', 'IAB.csv', 'IEEE 802.16 Operator ID.csv', 'MAC Address Block Large (MA-L).csv', 'MAC Address Block Medium (MA-M).csv', 'MAC Address Block Small (MA-S).csv', 'ManufacturerID.csv'];
    defaultItem: DataItem = {
        id: 0,
        file: '',
        registry: '',
        assignment: '',
        oName: '',
        oAddress: '',
        protocol: '',
    };
    dlAll = 0;
    dlOK = 0;
    dataAll = 0;
    db: DataItem[] = [];
    subTitle: HTMLAnchorElement = NyaAs.a(NyaDom.byClassFirst('mdui-typo-title'));
    update: HTMLSpanElement = NyaAs.span(NyaDom.byId('update'));
    progress: HTMLDivElement = NyaAs.div(NyaDom.byClassFirst('mdui-progress-determinate'));

    constructor() {
        this.dlAll = this.csvFileList.length;
    }

    load(dlNow = 0) {
        const url = this.baseURL + this.csvFileList[dlNow];
        NyaNetwork.get(
            url,
            null,
            (data: XMLHttpRequest | null, status: number) => {
                this.subTitle.innerText = '正在加载数据库 ' + dlNow.toString() + ' / ' + this.dlAll.toString();
                if (status == 200 && status) {
                    if (dlNow == 0) {
                        this.update.innerText = data!.responseText;
                    } else {
                        this.parseCSV(dlNow, this.csvFileList[dlNow], data!.responseText);
                    }
                    this.dlOK++;
                } else {
                    mdui.alert('错误 ' + status.toString() + ' 。请稍后刷新页面再试。', '数据加载失败', function () {
                        location.reload();
                    });
                    return;
                }
                dlNow++;
                this.subTitle.innerText = '已成功加载数据库 ' + this.dlOK.toString() + ' / ' + this.dlAll.toString() + ' ( ' + this.dataAll.toString() + ' ) ';
                this.progress.style.width = ((this.dlOK / this.dlAll) * 100).toString() + '%';
                if (this.dlOK == this.dlAll) {
                    this.progress.style.display = 'none';
                }
                if (dlNow > this.dlAll - 1) {
                    window.db = this.db;
                    this.db = [];
                    return;
                }
                this.load(dlNow);
            },
            true
        );
    }

    parseCSV(dlNow: number, fileName: string, responseText: string) {
        const dataArr: string[][] = NyaCSV.parse(NyaStrings.replaceAll(responseText, '\r', ' '));
        for (let i = 0; i < dataArr.length; i++) {
            this.dataAll++;
            const data: string[] = dataArr[i];
            const item: DataItem = {
                id: dlNow + i / 10,
                file: fileName,
                registry: data[0] ?? '',
                assignment: data[1] ?? '',
                oName: data[2] ?? '',
                oAddress: data[3] ?? '',
                protocol: data[4] ?? '',
            };
            this.db.push(item);
        }
    }
}
