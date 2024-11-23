import { da } from "element-plus/es/locale/index.mjs";
import Api from "./Base/api";

export default class ColumnLayoutApi extends Api {
    getAll(params: any) {
        return this.get('ColumnLayout', params);
    }
    getAllPopulate(id: string, params: any) {
        return this.get(`ColumnLayout/GetAllPopulate/${id}`, params);
    }
    createNewColumnLayout(data: any) {
        return this.postAPI('ColumnLayout', data.formData);
    }

    //{ columnName: newTitle, id: itemsDraggable.value.id }
    updateColumnLayout(data: any) {
        return this.putAPI(`ColumnLayout/${data.id}`, data);
    }

    deleteColumnLayout(data: any) {
        return this.deleteById(`ColumnLayout`, data.id);
    }

};
