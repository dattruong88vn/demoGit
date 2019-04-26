function NguoiDungService() {

    this.DSND = [];

    this.layDanhSachNguoiDung = function() {
        return $.ajax({
                url: "http://svcy.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung",
                type: "GET",
            })
    }

    this.themNguoiDung = function(tk) {
        $.ajax({
            url: 'http://svcy.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung',
            type: 'POST',
            data: tk,
            // contentType: "application/JSON",
        })
        .done(function(result) {
            if (result === 'tai khoan da ton tai') {
                alert('Tài khoản đã tồn tại.');
            }
            console.log(result);
        })
        .fail(function(error) {
            console.log(error);
        })
    }

    this.capNhatNguoiDung = function(tk){
        $.ajax({
            url: "http://svcy.myclass.vn/api/QuanLyTrungTam/CapNhatThongTinNguoiDung/",
            type: "PUT",
            data: tk,
            contentType: "application/JSON",
        })
        .done(function(result){
            console.log(result);
        })
        .fail(function(error){
            console.log(error);
        })
    }

    this.xoaNguoiDung = function(tk) {
        $.ajax({
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${tk}`,
            type: "DELETE",
        })
        .done(function (result) {
            console.log(result);
        })
        .fail(function (error) {
            console.log(error);
        })
    }

    this.timKiemNguoiDung = function(text){
        var mangTimKiem = [];
        var dsnd = JSON.parse(localStorage.getItem('danhSachNguoiDung'));

        dsnd.map(item => {
            if (item.TaiKhoan.toLowerCase().indexOf(text.toLowerCase()) > -1) {
                mangTimKiem.push(item);
            }
        })
        return mangTimKiem;
    }

    this.getIndexNguoiDung = function(tk) {
        return this.DSND.findIndexOf(item => item.TaiKhoan === tk.toString());
    } 
}

