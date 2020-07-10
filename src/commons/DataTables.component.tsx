import React from "react";
import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.css'
import 'datatables.net-buttons-dt/css/buttons.dataTables.css';
import 'datatables.net-responsive-dt/css/responsive.dataTables.css';
import {Table} from "react-bootstrap";
import {ColumnSettings} from "./DataTables.interfaces";

require('datatables.net'); // eslint-disable-line no-unused-vars
require('datatables.net-buttons'); // eslint-disable-line no-unused-vars
require('datatables.net-responsive'); // eslint-disable-line no-unused-vars
require('datatables.net-buttons/js/buttons.colVis.min.js'); // Column visibility
require('datatables.net-buttons/js/buttons.flash.min.js');  // Flash file export
require('datatables.net-buttons/js/buttons.html5.min.js');  // HTML 5 file export
require('datatables.net-buttons/js/buttons.print.min.js');  // Print view button

class DataTablesComponent<T> extends React.Component<ColumnSettings<T>, {}> {

    private datatable: any;

    componentDidMount() {
        this.datatable = $('#datatable').DataTable({
            language: {
                lengthMenu: "Menampilkan _MENU_ data per halaman",
                info: "Halaman _PAGE_ dari _PAGES_",
                infoEmpty: ""
            },
            scrollX: true,
            order: [1, 'asc'],
            responsive: true,
            paging: true,
            searching: false,
            pagingType: "full_numbers",
            ajax: this.props.ajaxData,
            jQueryUI: false,
            data: this.props.data,
            processing: true,
            serverSide: this.props.isServerSide,
            info: true,
            dom: '<"top"i>rt<"bottom"flp><"clear">',
            columns: this.props.columns,
            rowCallback: this.props.rowCallback
        });
    }

    componentWillUnmount() {
        this.datatable.destroy();
    }

    style = {
        width: "100%",
    }

    render() {
        return (
            <Table id="datatable"
                   bordered
                   striped
                   hover
                   responsive
                   className="display"
                   style={this.style}>
            </Table>
        );
    }
}

export default DataTablesComponent;